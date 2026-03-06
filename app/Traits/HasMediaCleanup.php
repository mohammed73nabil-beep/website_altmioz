<?php

namespace App\Traits;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

/**
 * HasMediaCleanup — Centralized Image Lifecycle Management Trait
 *
 * Attach this trait to any Eloquent model that owns images stored in
 * storage/app/public (served via /storage/...).
 *
 * ─── Usage ───────────────────────────────────────────────────────────────────
 *
 * 1. Add the trait to your model:
 *
 *    class Project extends Model
 *    {
 *        use HasMediaCleanup;
 *
 *        // Declare every column that holds a storage-relative file path.
 *        protected array $mediaColumns = ['image_path', 'image_url', 'thumbnail'];
 *    }
 *
 * 2. That's it. The trait hooks into Eloquent model events automatically.
 *
 * ─── What it does ────────────────────────────────────────────────────────────
 *
 * • On UPDATE  → detects which image columns changed and deletes the OLD file.
 * • On DELETE  → deletes ALL image files declared in $mediaColumns.
 *
 * ─── Safety guarantees ───────────────────────────────────────────────────────
 *
 * • Skips null / empty / unchanged values.
 * • Only deletes files that actually exist on disk.
 * • Silently logs errors instead of crashing the request.
 * • Never touches files outside the 'public' disk.
 * • Resolves duplicate paths (same file referenced by two columns) so a file
 *   is deleted only once.
 */
trait HasMediaCleanup
{
    /**
     * Boot the trait and register Eloquent model event listeners.
     *
     * Called automatically by Eloquent for every model that uses this trait
     * because of the naming convention `boot{TraitName}`.
     */
    protected static function bootHasMediaCleanup(): void
    {
        /**
         * UPDATING event — fires BEFORE the UPDATE SQL runs.
         *
         * We collect dirty (changed) image columns at this point because after
         * the save the original values are overwritten.
         */
        static::updating(function (self $model): void {
            $model->cleanupReplacedMedia();
        });

        /**
         * DELETED event — fires AFTER the DELETE SQL runs.
         *
         * Safe to remove all associated files now that the record is gone.
         */
        static::deleted(function (self $model): void {
            $model->cleanupAllMedia();
        });
    }

    // ──────────────────────────────────────────────────────────────────────────
    //  Public helpers (can be called manually if needed)
    // ──────────────────────────────────────────────────────────────────────────

    /**
     * Delete old files for every image column whose value has changed.
     *
     * Called automatically on the `updating` event.
     */
    public function cleanupReplacedMedia(): void
    {
        $columns = $this->resolveMediaColumns();

        // Collect OLD paths for columns that are actually dirty (changed).
        $pathsToDelete = collect($columns)
            ->filter(fn (string $col) => $this->isDirty($col))   // value changed?
            ->map(fn (string $col) => $this->getOriginal($col))   // grab OLD value
            ->filter(fn (?string $path) => filled($path))         // skip nulls/empty
            ->unique()                                             // avoid double-delete
            ->values();

        $this->deleteFromStorage($pathsToDelete->all());
    }

    /**
     * Delete ALL image files associated with this model instance.
     *
     * Called automatically on the `deleted` event.
     */
    public function cleanupAllMedia(): void
    {
        $columns = $this->resolveMediaColumns();

        $pathsToDelete = collect($columns)
            ->map(fn (string $col) => $this->getAttribute($col))  // current value
            ->filter(fn (?string $path) => filled($path))
            ->unique()
            ->values();

        $this->deleteFromStorage($pathsToDelete->all());
    }

    // ──────────────────────────────────────────────────────────────────────────
    //  Internal helpers
    // ──────────────────────────────────────────────────────────────────────────

    /**
     * Resolve the list of image columns declared on the model.
     *
     * Models SHOULD declare:
     *   protected array $mediaColumns = ['image_path', 'thumbnail'];
     *
     * Falls back to a sensible default list if the property is absent.
     *
     * @return string[]
     */
    protected function resolveMediaColumns(): array
    {
        // Honour per-model declaration.
        if (property_exists($this, 'mediaColumns') && ! empty($this->mediaColumns)) {
            return (array) $this->mediaColumns;
        }

        // Fallback: scan the model's fillable / attributes for common names.
        $commonNames = ['image_path', 'image_url', 'image', 'thumbnail', 'avatar', 'photo'];

        $candidates = array_merge(
            $this->getFillable(),
            array_keys($this->getAttributes())
        );

        $resolved = array_intersect($commonNames, array_unique($candidates));

        return array_values($resolved);
    }

    /**
     * Delete an array of storage-relative paths from the 'public' disk.
     *
     * - Validates each entry before attempting deletion.
     * - Checks for file existence to avoid unnecessary IO.
     * - Logs warnings for files that cannot be deleted.
     *
     * @param  string[]  $paths  Storage-relative paths (e.g. "projects/abc.jpg")
     */
    protected function deleteFromStorage(array $paths): void
    {
        $disk = Storage::disk('public');
        $modelClass = class_basename(static::class);

        foreach ($paths as $path) {
            // Guard: must be a non-empty string
            if (! is_string($path) || trim($path) === '') {
                continue;
            }

            // Normalise: strip leading slash that sometimes sneaks in
            $path = ltrim($path, '/');

            // Guard: do not delete if the file doesn't exist (stale reference)
            if (! $disk->exists($path)) {
                Log::debug("[MediaCleanup] {$modelClass}: file not found, skipping → {$path}");
                continue;
            }

            // Attempt deletion with error capture
            try {
                $deleted = $disk->delete($path);

                if ($deleted) {
                    Log::info("[MediaCleanup] {$modelClass}: deleted → {$path}");
                } else {
                    Log::warning("[MediaCleanup] {$modelClass}: Storage::delete returned false → {$path}");
                }
            } catch (\Throwable $e) {
                // Never crash the request over a cleanup failure
                Log::error("[MediaCleanup] {$modelClass}: exception deleting {$path} — {$e->getMessage()}");
            }
        }
    }
}
