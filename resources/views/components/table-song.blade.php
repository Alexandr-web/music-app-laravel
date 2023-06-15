<table class="table">
    <thead class="table__head">
        <tr class="table__head-inner">
            <th class="table__head-item">#</th>
            <th class="table__head-item">Аудио</th>
            <th class="table__head-item">Время</th>
        </tr>
    </thead>
    <tbody class="table__body">
        @foreach ($songs as $index => $song)
            <tr class="table__body-inner">
                <td class="table__body-item">{{ $index + 1 }}</td>
                <td class="table__body-item audio" data-audio-id="{{ $song['id'] }}" data-playlist-id="{{ $playlistId }}">
                    <div class="audio__block">
                        <button class="btn audio__btn audio__play-btn">
                            <x-play-icon :show="true" />
                            <x-pause-icon />
                        </button>
                    </div>
                    <div class="audio__block audio__block--flex">
                        <div class="audio__poster">
                            <img class="audio__poster-image" src="{{ asset('storage/posters').'/'.$song['poster'] }}" alt='Постер песни "{{ $song['name'] }}"'>
                        </div>
                        <div class="audio__song-info">
                            <h4 class="audio__name">{{ $song['name'] }}</h4>
                            <h5 class="audio__singer">{{ $song['singer'] }}</h5>
                        </div>
                    </div>
                    <div class="audio__block">
                        <button class="btn audio__btn audio__add-btn">
                            <x-plus-icon :show="true" />
                            <x-cross-icon />
                        </button>
                    </div>
                </td>
                <td class="table__body-item">{{ $song['time'] }}</td>
            </tr>
        @endforeach
    </tbody>
</table>