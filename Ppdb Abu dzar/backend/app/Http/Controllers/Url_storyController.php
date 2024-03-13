<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoryRequest;
use App\Http\Requests\Url_storyRequest;
use App\Models\Url_story;
use GrahamCampbell\ResultType\Success;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;

class Url_storyController extends Controller
{

    public function index()
    {
        $items = Url_story::with([
            'story_library'
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
    public function store(Url_storyRequest $request)
    {
        $data = $request->all();
        $data['video'] = $request->file('video') != null ? $request->file('video')->store('assets/video', 'public') : null;
        $data['gambar'] = $request->file('gambar') != null ? $request->file('gambar')->store('assets/gallery', 'public') : null;

        try {
            $item = Url_story::create($data);
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
        $item = Url_story::with([
            'story_library'
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
    public function update(Url_storyRequest $request, $id)
    {
        $data = $request->all();


        $item = Url_story::findOrFail($id);

        try {
            if ($request->file('video') != null) {
                $data['video'] = $request->file('video')->store('assets/video', 'public');

                //delete video
                if (File::exists(('storage/' . $item->video))) {
                    File::delete('storage/' . $item->video);
                }
            }

            if ($request->file('gambar') != null) {
                $data['gambar'] = $request->file('gambar')->store('assets/gallery', 'public');

                //delete video
                if (File::exists(('storage/' . $item->gambar))) {
                    File::delete('storage/' . $item->gambar);
                }
            }

            $item->update($data);

            return response()->json([
                'data'          => $item,
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
        $item = Url_story::findOrFail($id);

        try {
            //delete gambar
            if (File::exists(('storage/' . $item->gambar))) {
                File::delete('storage/' . $item->gambar);
            }
            //delete video
            if (File::exists(('storage/' . $item->video))) {
                File::delete('storage/' . $item->video);
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
