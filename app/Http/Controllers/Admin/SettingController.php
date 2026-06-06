<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Setting;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;
class SettingController extends Controller
{
    /**
     * Display the settings grouped by their respective categories.
     */
    public function index()
    {
        $settings = Setting::all()->groupBy('group')->mapWithKeys(function ($items, $group) {
            return [$group => $items->mapWithKeys(function ($item) {
                return [$item->key => $item];
            })];
        });

        // Structure defaults if table is empty
        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings
        ]);
    }
    /**
     * Update the given settings.
     */
    public function update(Request $request)
    {
        try {
            $data = $request->validate([
                'settings' => 'required|array',
                'settings.*.key' => 'required|string',
                'settings.*.value' => 'nullable',
                'settings.*.type' => 'required|string',
                'settings.*.group' => 'required|string',
                'settings.*.file' => 'nullable|file|image|max:2048',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Illuminate\Support\Facades\Log::error('Settings validation failed:', $e->errors());
            throw $e;
        }

        foreach ($data['settings'] as $index => $settingData) {
            $setting = Setting::firstOrNew(['key' => $settingData['key']]);
            $setting->type = $settingData['type'];
            $setting->group = $settingData['group'];

            if ($settingData['type'] === 'image') {
                if ($request->hasFile("settings.{$index}.file")) {
                    $path = \App\Helpers\ImageOptimizer::storeAsWebP(
                        $request->file("settings.{$index}.file"),
                        'settings',
                        1280, // maxWidth
                        1280, // maxHeight
                        90,   // quality (as requested)
                        $setting->value
                    );
                    $setting->value = $path;
                } elseif (empty($settingData['value'])) {
                    // If image was cleared/deleted
                    if ($setting->value) {
                        Storage::disk('public')->delete($setting->value);
                    }
                    $setting->value = null;
                }
            } else {
                $setting->value = $settingData['value'] ?? null;
            }

            $setting->save();
        }

        Cache::forget('global_settings');
        return redirect()->back()->with('message', 'Settings updated successfully.');
    }
}
