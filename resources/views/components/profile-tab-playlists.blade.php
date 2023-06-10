<div class="profile__tab">
    <div class="profile__tab-inner">
        <h1 class="title">Плейлисты</h1>
        @if (count($playlists))
            <ul class="playlists">
                @foreach ($playlists as $playlist)
                    <li class="playlists__item">
                        <x-custom-playlist :playlist="$playlist" />
                    </li>
                @endforeach
            </ul>
        @else
            <x-nothing-find text="Ничего нет"  />
        @endif
    </div>
</div>