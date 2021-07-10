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
    if (playNextGif.counter <= gifArray.length) {
        if (playNextGif.counter < gifArray.length) {
            let currentGif = gifArray[playNextGif.counter];
            currentGif.play(); // start the next gif
        }
        if (playNextGif.counter > 0) {
            // reload the last gif and let it run on
            reloadAndSetLoop(playNextGif.counter - 1);
        }
        playNextGif.counter += 1;
    }
}

function delayAndPlayNextGif() {
    setTimeout(function(){
        playNextGif();
    }, 1000);
};

function reloadAndSetLoop(index) {
    let currentGif = gifArray[index];
    currentGif.setAttribute("loop", "");
    currentGif.currentTime = 0;
    currentGif.play();
}