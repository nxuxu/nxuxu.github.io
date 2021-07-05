var gifArray;

document.addEventListener('DOMContentLoaded', function() {
    let gifCollection = document.getElementsByClassName("gif");
    gifArray = [].slice.call(gifCollection);
    gifArray.sort(function(a, b) { 
        return a.id.localeCompare(b.id);
    });
    gifArray.forEach((gifElement, index) => 
        { gifElement.onended = delayAndPlayNextGif; }
    );
    playNextGif();
});

function playNextGif() {
    playNextGif.counter = playNextGif.counter || 0; // black magic
    gifArray[playNextGif.counter].play();
    playNextGif.counter += 1;
    if(playNextGif.counter >= gifArray.length) {
        playNextGif.counter = 0;
    }
}

function delayAndPlayNextGif() {
    setTimeout(function(){
        playNextGif();
    }, 1000);
};