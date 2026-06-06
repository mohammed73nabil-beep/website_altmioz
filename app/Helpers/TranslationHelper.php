<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class TranslationHelper
{
    /**
     * Translate Arabic text to English using the free MyMemory Translation API.
     * Includes a timeout to prevent requests from hanging if the API is down.
     *
     * @param  string|null  $text
     * @return string|null
     */
    public static function translateArabicToEnglish(?string $text): ?string
    {
        if (empty($text)) {
            return null;
        }

        $text = trim($text);

        // If it's already English (mostly letters, numbers, spaces, hyphens)
        if (preg_match('/^[a-zA-Z0-9\s\-\_\.\,\!\?]+$/', $text)) {
            return $text;
        }

        try {
            // Use Laravel's Http client with a short timeout
            $response = Http::timeout(3)
                ->get('https://api.mymemory.translated.net/get', [
                    'q' => $text,
                    'langpair' => 'ar|en',
                ]);

            if ($response->successful()) {
                $data = $response->json();
                if (isset($data['responseData']['translatedText'])) {
                    $translated = trim($data['responseData']['translatedText']);
                    
                    // Filter out MyMemory warning or error messages
                    if (!empty($translated) && !str_contains(strtoupper($translated), 'MYMEMORY WARNING')) {
                        return $translated;
                    }
                }
            }
        } catch (\Exception $e) {
            // Fail silently, fallback to null/transliteration
        }

        // Fallback: convert Arabic chars to basic Roman/Latin representation or return null
        return null;
    }
}
