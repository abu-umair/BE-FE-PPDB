<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoryRequest;
use App\Models\Story_library;
use App\Models\Librarystory_user;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;

class Story_libraryController extends Controller
{

    public function index()
    {
        $items = Story_library::with([
            'evaluasi_story', 'url_story'
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
    public function store(StoryRequest $request)
    {
        $data = $request->all();
        $data['banner'] = $request->file('banner') != null ? $request->file('banner')->store('assets/audio', 'public') : null;

        try {
            $item = Story_library::create($data);
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
        $item = Story_library::with([
            'evaluasi_story', 'url_story'
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
    public function update(StoryRequest $request, $id)
    {
        $data = $request->all();

        $item = Story_library::findOrFail($id);

        try {
            if ($request->file('banner') != null) {
                $data['banner'] = $request->file('banner')->store('assets/audio', 'public');

                //delete audio
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
        $item = Story_library::findOrFail($id);

        try {
            //delete audio
            if (File::exists(('storage/' . $item->banner))) {
                File::delete('storage/' . $item->banner);
            }
            
            // delete Librarystory_user
            if ($librarystory_user = Librarystory_user::where('story_libraries_id', $id)) {
                $librarystory_user->delete();
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
        $search = Story_library::with([
            'evaluasi_story', 'url_story'
        ])
        ->where('title', 'LIKE', '%'.$title.'%')->get();
        return response()->json([
            'data'          => $search
        ]);
    }
}
