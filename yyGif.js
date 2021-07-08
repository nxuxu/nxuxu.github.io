var gifArray;

// start the Gif when the user reaches the first gif

//document.addEventListener('DOMContentLoaded',
function initGifControl() {
    let gifCollection = document.getElementsByClassName("gif");
    gifArray = [].slice.call(gifCollection);
    gifArray.sort(function(a, b) { 
        return a.id.localeCompare(b.id);
    });
    gifArray.forEach((gifElement, index) => 
        { gifElement.onended = delayAndPlayNextGif; }
    );
    playNextGif();
}//);

document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener("scroll", gifDectect);
    let gifCollection = document.getElementsByClassName("gif");
    let gifArray = [].slice.call(gifCollection);
    gifArray.sort(function(a, b) { 
        return a.getBoundingClientRect().top > b.getBoundingClientRect().top;
    });
    let firstGif = gifArray[0]
    function gifDectect() {
        gifDectect.detected = gifDectect.detected || false;
        if (!gifDectect.detected) {
            // detect if the first Gif is visible
            let gifTop = firstGif.getBoundingClientRect().top;
            let gifHeight = firstGif.getBoundingClientRect().height;
            let viewportHeight = document.documentElement.clientHeight || window.innerHeight;
            if (gifTop - window.pageYOffset < viewportHeight - gifHeight * 0.75) {
                // yes, we start the autoplay
                initGifControl();
                // console.log("gif starting");
                gifDectect.detected = true;
            }
        }
    }
});

function playNextGif() {
    playNextGif.counter = playNextGif.counter || 0; // black magic
    gifArray[playNextGif.counter].currentTime = 0;
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