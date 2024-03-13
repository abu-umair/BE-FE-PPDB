<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TransactionRequest extends FormRequest
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
            // 'category'          => 'max:255|nullable',
            // 'unique_id'         =>  'required|max:50|unique:koinpack_products,unique_id',
            'category_id'       =>  'nullable|max:255',
            // 'flavours'          =>  'required|integer|in:0,1',
            'name'              =>  'nullable|max:255',
            'image'             =>  'nullable|image',
            // 'info'              =>  'nullable|max:255',
            'price'             =>  'nullable',
            // 'return_refund'     =>  'nullable|max:255',
            // 'shipping_info'     =>  'nullable|max:255',
            'brand'             =>  'nullable|max:255',
            'discount'          =>  'nullable',
            'old_price'         =>  'nullable',
            'description1'      =>  'nullable',
            'description2'      =>  'nullable',
            'delivery_Info'     =>  'nullable',
            'stock_availability'=>  'nullable|integer',
            'product_weight'    =>  'nullable',
            'unit'              =>  'nullable',
            'supplier_name'     =>  'nullable',
            'supplier_price'    =>  'nullable',
            'visibility'        =>  'nullable|integer|in:0,1',
            
        ];
    }
}
