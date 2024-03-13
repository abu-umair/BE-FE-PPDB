<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class Url_storyRequest extends FormRequest
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
            'story_libraries_id'    => 'required',
            'video'                 => 'nullable',
            'gambar'                => 'nullable',
        ];
    }
}
