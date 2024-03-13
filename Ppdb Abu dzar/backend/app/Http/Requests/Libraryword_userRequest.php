<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class Libraryword_userRequest extends FormRequest
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
            'word_libraries_id'            => 'required|integer',
            'users_id'                      => 'required|integer',
            'score'                        => 'nullable|integer',
            'catatan'                        => 'nullable',
        ];
    }
}
