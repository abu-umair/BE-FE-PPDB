<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
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
     * @return array
     */
    public function rules()
    {
        return [
            // 'url' => 'max:500000',
            // 'url' => 'nullable|mimes:pdf,zip,doc,docx|max:10000',
            // 'foto'              => 'image|nullable',
            // 'uni que_id'         =>  'required|max:50|unique:koinpack_products,unique_id',
            // 'category_id'       =>  'nullable|max:255',
            // 'flavours'          =>  'required|integer|in:0,1',
            // 'return_refund'     =>  'nullable|max:255',
            // 'shipping_info'     =>  'nullable|max:255',
            // 'info'              =>  'nullable|max:255',
            'category'          => 'max:255|nullable',
            'name'              =>  'nullable|max:255',
            'image'             =>  'nullable|image',
            'price'             =>  'nullable',
            'period'            =>  'nullable|integer',
            'description'       =>  'nullable',
            'visibility'        =>  'nullable',
            // 'brand'             =>  'nullable|max:255',
            // 'old_price'         =>  'nullable',
            // 'description1'      =>  'nullable',
            // 'description2'      =>  'nullable',
            // 'delivery_Info'     =>  'nullable',
            // 'product_weight'    =>  'nullable',
            // 'unit'              =>  'nullable',
            // 'supplier_name'     =>  'nullable',
            // 'supplier_price'    =>  'nullable',
            
        ];
    }
}
