<div class="playlist" data-id="{{ $playlist['id'] }}">
    <div class="playlist__inner">
        <div class="playlist__poster">
            <img class="playlist__poster-image" src="{{ asset('storage/posters').'/'.$playlist['poster'] }}" alt="Постер плейлиста">
        </div>
        <h4 class="playlist__name">{{ $playlist['name'] }}</h4>
        <h6 class="playlist__owner-nickname">{{ $ownerNickname }}</h6>
    </div>
</div>