<?php

namespace App\Http\Controllers;

use App\Http\Requests\WordRequest;
use App\Models\Word_library;
use App\Models\Libraryword_user;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;

class Word_libraryController extends Controller
{

    public function index()
    {
        // nested Relations
        $items = Word_library::with([
            // 'evaluasi_audio_word', 'evaluasi_word.option_evaluasi_word' => fn ($q) => $q->latest()
            'evaluasi_audio_word',
            'evaluasi_word'
            // 'evaluasi_word' => [
            //     'option_evaluasi_word',
            //     //atau// 'option_evaluasi_word' => fn ($q) => $q->latest(),
            //     ] 

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
    public function store(WordRequest $request)
    {
        $data = $request->all();
        $data['banner'] = $request->file('banner') != null ? $request->file('banner')->store('assets/gallery', 'public') : null;

        try {
            $item = Word_library::create($data);
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
        // nested Relations
        $item = Word_library::with([
            'evaluasi_audio_word', 'evaluasi_word' 
            //'evaluasi_word.option_evaluasi_word'
            // 'evaluasi_audio_word', 'evaluasi_word.option_evaluasi_word' => fn ($q) => $q->latest()

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
    public function update(WordRequest $request, $id)
    {
        $data = $request->all();

        $item = Word_library::findOrFail($id);

        try {
            if ($request->file('banner') != null) {
                $data['banner'] = $request->file('banner')->store('assets/gallery', 'public');

                //delete image
                if (File::exists(('storage/' . $item->banner))) {
                    File::delete('storage/' . $item->banner);
                }
            }

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
        $item = Word_library::findOrFail($id);

        try {
            //delete image
            if (File::exists(('storage/' . $item->banner))) {
                File::delete('storage/' . $item->banner);
            }
            
            // delete Libraryword_user
            if ($libraryword_user = Libraryword_user::where('word_libraries_id', $id)) {
                $libraryword_user->delete();
            }

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

    public function search(Request $request)
    {
        $title = $request->input('title');
        $search = Word_library::with([
            'evaluasi_audio_word', 'evaluasi_word'
            // 'evaluasi_word.option_evaluasi_word'
            // 'evaluasi_audio_word', 'evaluasi_word.option_evaluasi_word' => fn ($q) => $q->latest()
        ])
        ->where('title', 'LIKE', '%'.$title.'%')->get();
        return response()->json([
            'data'          => $search
        ]);
    }
}
