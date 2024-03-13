<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Subscription;
use App\Models\Libraryword_user;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;

class SubscriptionController extends Controller
{

    public function index()
    {
        $items = Subscription::all();
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
        $request->file('foto') != null ? $data['foto'] = $request->file('foto')->store('assets/gallery', 'public') : $data['image'] = null;
        // return response()->json([
        //     'data'          => $data
        // ]);
        try {
            $item = Subscription::create($data);
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
        $item = Subscription::find($id);

        
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

        $item = Subscription::findOrFail($id);

        try {
            // if ($request->file('banner') != null) {
            //     $data['banner'] = $request->file('banner')->store('assets/gallery', 'public');

            //     //delete image
            //     if (File::exists(('storage/' . $item->banner))) {
            //         File::delete('storage/' . $item->banner);
            //     }
            // }

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
        $item = Subscription::findOrFail($id);

        try {
            //delete image
            // if (File::exists(('storage/' . $item->banner))) {
            //     File::delete('storage/' . $item->banner);
            // }
            
            // delete Libraryword_user
            // if ($libraryword_user = Libraryword_user::where('word_libraries_id', $id)) {
            //     $libraryword_user->delete();
            // }

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
        $title = $request->input('title');
        $search = Subscription::with([
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
