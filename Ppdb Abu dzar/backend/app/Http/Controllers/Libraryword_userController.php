<?php

namespace App\Http\Controllers;

use App\Http\Requests\Libraryword_userRequest;
use App\Models\Libraryword_user;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;

class Libraryword_userController extends Controller
{

    public function index()
    {
        $items = Libraryword_user::with([
            'word_library','evaluasi_word','evaluasi_audio_word', 'user'
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
    public function store(Libraryword_userRequest $request)
    {
        $data = $request->all();

        try {
            $item = Libraryword_user::create($data);
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
        $item = Libraryword_user::with([
            'word_library','evaluasi_word','evaluasi_audio_word', 'user'
        ])
        ->whereRelation('user', 'id', $id)
        ->get();

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
    public function update(Libraryword_userRequest $request, $id)
    {

        $data = $request->all();
        $item = Libraryword_user::findOrFail($id);

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
        $item = Libraryword_user::findOrFail($id);

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
