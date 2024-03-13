<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class TeacherRequest extends FormRequest
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
            'image'             => 'nullable',
            'name'              => 'required|max:255',
            'password'          => 'required|string|min:6|confirmed',
            'gender'            => 'required',
            'dob'               => 'required',
            'address'           => 'required',


        ];
    }
}
