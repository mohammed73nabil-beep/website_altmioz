<?php

use App\Models\Setting;
use Illuminate\Support\Facades\Cache;

if (!function_exists('getSetting')) {
    /**
     * Retrieve a setting by its key from cache or database.
     *
     * @param string $key
     * @param mixed $default
     * @return mixed
     */
    function getSetting($key, $default = null)
    {
        return Cache::rememberForever('setting_' . $key, function () use ($key, $default) {
            $setting = Setting::where('key', $key)->first();
            return $setting ? $setting->value : $default;
        });
    }
}
