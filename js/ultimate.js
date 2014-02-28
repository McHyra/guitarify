var tabs = null;
var tab_count = 0;

$(window).load(function() {
});

function output(message) {
    document.getElementById('tab').innerHTML = message;
}

function requestTab(query) {

    $.ajax({
        url: 'http://app.ultimate-guitar.com/search.php?search_type=title&page=1&iphone=1&value=' + query,
        dataType: 'xml',
        success: function(data) {
            processXML(data);
        },
        fail: function() {
            document.getElementById('tab').innerHTML = "Error!";
        }
    });

}

function processXML(data) {
    var results = $(data).find('results').attr('count');
    if (results > 0) {

        tabs = new Array();
        tab_count = 0;

        $(data).find('result').each(function() {
            if ($(this).attr('type_2') != 'album') {
                tabs[tab_count] = [
                    $(this).attr('name'),
                    $(this).attr('url')
                ];
                tab_count++;
            }
        });

        getTab(0);

    } else {
        output("No chords available.");
    }

}

function getTab(id) {

    $.ajax({
        url: tabs[id][1],
        dataType: 'html',
        success: function(data) {
            renderTab(data);
        }
    });

}

function renderTab(data) {
    var format = data;

    // Chords
    format = format.replace(/\[ch\]/g, '<span class="chord">');
    format = format.replace(/\[\/ch\]/g, "</span>");
    // Parts
    format = format.replace('Intro', '<span class="part">Intro</span>');
    format = format.replace('Chorus', '<span class="part">Chorus</span>');
    format = format.replace('Verse', '<span class="part">Verse</span>');
    format = format.replace('Verse', '<span class="part">Bridge</span>');
    format = format.replace('Verse', '<span class="part">Interlude</span>');

    output(format);
}



