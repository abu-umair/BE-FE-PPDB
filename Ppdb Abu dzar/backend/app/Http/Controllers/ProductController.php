<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Product;
use App\Models\Libraryword_user;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;

class ProductController extends Controller
{

    public function index()
    {
        $items = Product::with([
            'transaction','purchase_card'
            ])->get();
        return response()->json([
            'data'          => $items,
            'message'       => "true"

        ], 200);
    }

    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $request->file('image') != null ? $data['image'] = $request->file('image')->store('assets/gallery', 'public') : $data['image'] = null;
        // return response()->json([
        //     'data'          => $data
        // ]);
        try {
            $item = Product::create($data);
            return response()->json([
                'data'          => $item,
                'message'       => "true"

            ], 200);
        } catch (QueryException $e) {
            return response()->json([
                'data'          => $e,
                'message'       => "false"

            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $item = Product::with([
            'transaction','purchase_card'
            ])->find($id);

        
        return response()->json([
            'data'          => $item,
            'message'       => "true"

        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ProductRequest $request, $id)
    {
        $data = $request->all();

        $item = Product::findOrFail($id);

        try {
            if ($request->file('image') != null) {
                $data['image'] = $request->file('image')->store('assets/gallery', 'public');

                //delete image
                if (File::exists(('storage/' . $item->image))) {
                    File::delete('storage/' . $item->image);
                }
            }

            $item->update($data);
            return response()->json([
                'data'          => $item,
                'message'       => "true"

            ], 200);
        } catch (QueryException $e) {
            return response()->json([
                'data'          => $e,
                'message'       => "false"

            ], 401);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $item = Product::findOrFail($id);

        try {
            //delete image
            if (File::exists(('storage/' . $item->image))) {
                File::delete('storage/' . $item->image);
            }

            $item->delete();

            return response()->json([
                'data'          => $item,
                'message'       => "true"

            ], 200);
        } catch (QueryException $e) {
            return response()->json([
                'data'          => $e,
                'message'       => "false"

            ]);
        }
    }

    public function search(Request $request)
    {
        $type = $request->input('type');
        $search = Product::with([
            'transaction','purchase_card'
            // 'evaluasi_audio_word', 'evaluasi_word'
            // 'evaluasi_word.option_evaluasi_word'
            // 'evaluasi_audio_word', 'evaluasi_word.option_evaluasi_word' => fn ($q) => $q->latest()
        ])
        ->where('type', 'LIKE', '%'.$type.'%')->get();
        return response()->json([
            'data'          => $search
        ]);
    }
}
