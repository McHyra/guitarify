require(['$api/models'], function(models) {

    /**
     * HTML-Containers
     */
    var htmlSongTitle = document.getElementById('title');
    var htmlSongArtist = document.getElementById('artist');

    function updateStatus(track) {
        if (null != track) {
            htmlSongTitle.innerHTML = track.name;
            htmlSongArtist.innerHTML = track.artists[0].name;
            requestTab(createSearchString(track.name, track.artists[0].name));
        }
    }

    models.player.load('track').done(function(event) {
        updateStatus(event.track);
    });

    models.player.addEventListener('change', function(event) {
        updateStatus(event.data.track);
    });

});

function createSearchString(name, artist) {
    var from = "åÅäÄöÖéÉ";
    var to   = "aAaAoOeE";
    var pattern = new RegExp("["+from+"]", "g");
    var str = artist + " " + name;
    str = str.replace(pattern, function(ch) { return to[from.indexOf(ch)]; } );
    return str.replace(/ /g, '+').replace(/&/g, 'and');
}

$(function() {

    $('#btnHideChords').click(function() {

        if ($('span.chord').css('display') == 'none') {
            $('span.chord').css('display', 'inline');
            $(this).html('Hide Chords');
        } else {
            $('span.chord').css('display', 'none');
            $(this).html('Show Chords');
        }

    });

});