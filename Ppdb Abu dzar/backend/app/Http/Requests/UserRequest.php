<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'image'             => 'nullable|image',
            'name'              => 'required|max:255',
            'email'             => 'required|max:255|unique:users',
            'password_now'      => 'nullable|string|min:6',
            'password'          => 'nullable|string|min:6',
            'roles'             => 'nullable|max:30|in:USER,ADMIN,STAFF',
            // 'spesialisasi'      => 'nullable',

        ];
    }
}
