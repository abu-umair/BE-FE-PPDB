<?php

namespace App\Http\Controllers;

use App\Http\Requests\Option_valuasiRequest;
use App\Models\Option_evaluasi_word;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;

class Option_evaluasi_wordController extends Controller
{

    public function index()
    {
        $items = Option_evaluasi_word::with([
            'option_evaluasi_word'
        ])
            ->get();
        return response()->json([
            'data'          => $items
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
    public function store(Option_valuasiRequest $request)
    {
        $data = $request->all();

        try {
            $item = Option_evaluasi_word::create($data);
            return response()->json([
                'data'          => $item
            ], 200);
        } catch (QueryException $e) {
            return response()->json([
                'data'          => $e
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
        $item = Option_evaluasi_word::with([
            'option_evaluasi_word'
        ])
            ->find($id);

        return response()->json([
            'data'          => $item
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
    public function update(Option_valuasiRequest $request, $id)
    {

        $data = $request->all();
        $item = Option_evaluasi_word::findOrFail($id);

        try {

            $item->update($data);
            return response()->json([
                'data'          => $item
            ], 200);
        } catch (QueryException $e) {
            return response()->json([
                'data'          => $e
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
        $item = Option_evaluasi_word::findOrFail($id);

        try {

            $item->delete();

            return response()->json([
                'data'          => $item
            ], 200);
        } catch (QueryException $e) {
            return response()->json([
                'data'          => $e
            ]);
        }
    }
}
