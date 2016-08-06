
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
            currentlyPlayingSongNumber = parseInt($that.attr('data-song-number'));
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
        if ($songItemNumber != currentlyPlayingSongNumber) {
          $songItem.html($playButtonTemplate); 
        }
    }; 
     
    
    var offHover = function(event) {
       var $songItem = $(this).find('.song-item-number');
       var $songItemNumber = $songItem.attr('data-song-number');
       if ($songItemNumber != currentlyPlayingSongNumber) {
          $songItem.html($songItemNumber); 
        }
        console.log("songNumber type is " + typeof $songItemNumber +"\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
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

var trackIndex = function(album,song) {
    return album.songs.indexOf(song);
};


var nextSong = function() {
   
   if (currentSongFromAlbum === null) {
       currentSongFromAlbum = currentAlbum.songs[currentAlbum.songs.length];
       currentlyPlayingSongNumber = trackIndex(currentAlbum, currentSongFromAlbum) +1;
   }
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    var newPreviousSongElement = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber +'"]');
    newPreviousSongElement.text(currentlyPlayingSongNumber);
    
    //Get Index of current song and then increment by 1
    var newCurrentSongIndex = (trackIndex(currentAlbum, currentSongFromAlbum)+1) % currentAlbum.songs.length;
     
    //set the new current song
    currentSongFromAlbum = currentAlbum.songs[newCurrentSongIndex];
    updatePlayerBarSong();
    
    //Increment currentlyPlayingSongNumber
    currentlyPlayingSongNumber = newCurrentSongIndex + 1;
    
    //update album-view-song-item--new current song 
    var newCurrentSongElement = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    newCurrentSongElement.html($pauseButtonTemplate);
        
};

var previousSong = function() {
   
   if (currentSongFromAlbum === null) {
       currentSongFromAlbum = currentAlbum.songs[1];
       currentlyPlayingSongNumber = trackIndex(ablum, curentSongFromAlbum) +1;
   }
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    var newPreviousSongElement = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber +'"]');
    newPreviousSongElement.text(currentlyPlayingSongNumber);
    
    //Get Index of current song and then decrement by 1
    var newCurrentSongIndex = (trackIndex(currentAlbum, currentSongFromAlbum)+ currentAlbum.songs.length -1) % currentAlbum.songs.length;
     
    //set the new current song
    currentSongFromAlbum = currentAlbum.songs[newCurrentSongIndex];
    updatePlayerBarSong();
    
    //Increment currentlyPlayingSongNumber
    currentlyPlayingSongNumber = newCurrentSongIndex + 1;
    
    //update album-view-song-item--new current song 
    var newCurrentSongElement = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    newCurrentSongElement.html($pauseButtonTemplate);
        
};

var updatePlayerBarSong = function() {   
    if (currentSongFromAlbum == null) {
    } else {
        $('.currently-playing .song-name').text(currentSongFromAlbum.title);
        $('.currently-playing .artist-name').text(currentAlbum.artist);
        console.log(currentAlbum.artist);
        $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
        $('.main-controls .play-pause').html(playerBarPauseButton);
    }    
};


var $playButtonTemplate = $('<a class="album-song-button"><span class="ion-play"></span></a>');
var $pauseButtonTemplate = $('<a class="album-song-button"><span class="ion-pause"></span></a>');

var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');



$(window).ready(function() {
    setCurrentAlbum(albumTarun);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
    
});


 


