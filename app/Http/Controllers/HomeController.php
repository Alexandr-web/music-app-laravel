<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Playlist;
use App\Models\Audio;

class HomeController extends Controller
{
    public function renderPage(Request $request) {
        $playlistsCollection = Playlist::all()->map(function ($playlist) {
            $find_owner = User::find($playlist->ownerId);

            return ['playlist' => $playlist, 'owner_nickname' => $find_owner->nickname];
        });

        $audioCollection = Audio::all();
        
        return view('index', ['current_user' => $request->user, 'playlists' => $playlistsCollection, 'audio' => $audioCollection]);
    }
}
