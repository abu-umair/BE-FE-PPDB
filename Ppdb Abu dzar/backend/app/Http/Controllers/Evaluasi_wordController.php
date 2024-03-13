<?php

namespace App\Http\Controllers;

use App\Http\Requests\Evaluasi_wordRequest;
use App\Models\Evaluasi_word;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;

class Evaluasi_wordController extends Controller
{

    public function index()
    {
        $items = Evaluasi_word::with([
             'word_library'
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
    public function store(Evaluasi_wordRequest $request)
    {
        $data = $request->all();
        
        $string = array($request->options);
        $data['options'] = json_encode(array_shift($string)); 
        
        $data['banner'] = $request->file('banner') != null ? $request->file('banner')->store('assets/gallery', 'public') : null;
        $data['question_audio'] = $request->file('question_audio') != null ? $request->file('question_audio')->store('assets/audio', 'public') : null;

        try {
            $item = Evaluasi_word::create($data);
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
        $item = Evaluasi_word::with([
             'word_library'
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
    public function update(Evaluasi_wordRequest $request, $id)
    {
        $data = $request->all();

        $item = Evaluasi_word::findOrFail($id);

        try {
            
            if ($request->options) {
                $string = array($request->options);
                $data['options'] = json_encode(array_shift($string)); 
            }
            
            if ($request->file('banner') != null) {
                $data['banner'] = $request->file('banner')->store('assets/gallery', 'public');

                //delete image
                if (File::exists(('storage/' . $item->banner))) {
                    File::delete('storage/' . $item->banner);
                }
            }

            if ($request->file('question_audio') != null) {
                $data['question_audio'] = $request->file('question_audio') != null ? $request->file('question_audio')->store('assets/audio', 'public') : null;

                //delete audio
                if (File::exists(('storage/' . $item->question_audio))) {
                    File::delete('storage/' . $item->question_audio);
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
        $item = Evaluasi_word::findOrFail($id);

        try {
            //delete image
            if (File::exists(('storage/' . $item->banner))) {
                File::delete('storage/' . $item->banner);
            }

            //delete image
            if (File::exists(('storage/' . $item->question_audio))) {
                File::delete('storage/' . $item->question_audio);
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
}
