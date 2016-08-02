
var createSongRow = function(songNumber, songName, songLength) {
    var template = 
        '<tr class="album-view-song-item">'
       +'  <td class="song-item-number" data-song-number="'+songNumber+'">' + songNumber + '</td>'
       +'  <td class="song-item-title">' + songName + '</td>'
       +'  <td class="song-item-duration">' + songLength + '</td>'
       +'</tr>'
       ;
    var $row = $(template);
    
    var clickHandler = function(){
      //var $songItem = $(getSongItem(this));
        $that = $(this);
      
        
        if (currentlyPlayingSongNumber === null) {
            $that.html($pauseButtonTemplate);
            currentlyPlayingSongNumber = $that.attr('data-song-number');
            currentSongFromAlbum = currentAlbum.songs[currentlyPlayingSongNumber-1];
            updatePlayerBarSong();
        } else if (currentlyPlayingSongNumber === $that.attr('data-song-number')) {
            $that.html($playButtonTemplate);
            
            $('.main-controls .play-pause').html(playerBarPlayButton); 
            currentlyPlayingSongNumber = null;
            currentSongFromAlbum = null;
        } else if (currentlyPlayingSongNumber !== $that.attr('data-song-number')) {
            var $currentlyPlayingSongNumberElement = $('tr').find('[data-song-number="' + currentlyPlayingSongNumber +'"]');
            $currentlyPlayingSongNumberElement.html($currentlyPlayingSongNumberElement.attr('data-song-number'));
            $that.html($pauseButtonTemplate);
            currentlyPlayingSongNumber = $that.attr('data-song-number');
            currentSongFromAlbum = currentAlbum.songs[currentlyPlayingSongNumber-1];
            updatePlayerBarSong();
         } 
        
    };
    
    var onHover = function(event){
        var $songItem = $(this).find('.song-item-number');
        var $songItemNumber = $songItem.attr('data-song-number');
        if ($songItemNumber !== currentlyPlayingSongNumber) {
          $songItem.html($playButtonTemplate); 
        }
    }; 
     
    
    var offHover = function(event) {
       var $songItem = $(this).find('.song-item-number');
       var $songItemNumber = $songItem.attr('data-song-number');
       if ($songItemNumber !== currentlyPlayingSongNumber) {
          $songItem.html($songItemNumber); 
        } 
    };
    
    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
};


var setCurrentAlbum = function(album) {  
    currentAlbum = album;
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
    
    $albumTitle.text(album.title);
    
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' +album.label);
    $albumImage.attr('src', album.albumArtUrl);
    
    
    $albumSongList.empty();
    
    for (var i=0; i<album.songs.length; i++) {
        var $newRow = createSongRow(i+1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
    }   
};


var updatePlayerBarSong = function() {
    var $songName = $('.song-name');
    
    if (currentSongFromAlbum == null) {
    } else {      
        $songName.text(currentSongFromAlbum.title);       
    }
    $('.main-controls .play-pause').html(playerBarPauseButton);  
    
};


var $playButtonTemplate = $('<a class="album-song-button"><span class="ion-play"></span></a>');
var $pauseButtonTemplate = $('<a class="album-song-button"><span class="ion-pause"></span></a>');

var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;



$(window).ready(function() {
    setCurrentAlbum(albumTarun);
    
});


 


