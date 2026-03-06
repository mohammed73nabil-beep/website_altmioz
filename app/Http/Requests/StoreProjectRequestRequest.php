<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequestRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'client_name' => 'required|string|max:255',
            'client_email' => 'required|email|max:255',
            'company_name' => 'nullable|string|max:255',
            'project_type' => 'required|string|max:255',
            'budget_range' => 'nullable|string|max:255',
            'project_details' => 'required|string',
            'attachments' => 'nullable|array',
            'attachments.*' => 'file|max:10240', // 10MB max per file
        ];
    }
}
