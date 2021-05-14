import {listVideo} from "./directories.js";


console.clear();
const UDIOcREte = document.createElement('audio');
const audioContainer = document.querySelector('.container-audio');
const play_button = document.getElementById("play");
const randomCoverVideo = document.createElement('video');
const containerCoverVideo = document.querySelector("#containerCoverVideo");
let NVideoCover = 0;
const containerCarouselVideo = document.getElementById("carousel");
const fragmentHtmlCarousel = document.createDocumentFragment();

function insert () {
    UDIOcREte.src = "assets/audio/musica-relajante-corta-naturaleza-musica-relajante-corta-duracion.mp3";
    UDIOcREte.setAttribute("preload", "auto");
    UDIOcREte.setAttribute("controls", "none");
    UDIOcREte.style.display = "none"; // <-- oculto
    audioContainer.append(UDIOcREte);
    randomCoverVideo.src = listVideo[NVideoCover].replaceAll(" ", "%20");
    randomCoverVideo.className = "video-cover-random";
    containerCoverVideo.append(randomCoverVideo);
    randomCoverVideo.addEventListener('ended', ()=>{
       setTimeout(()=>{
           if (NVideoCover >= listVideo.length-1){
               sessionStorage.setItem('numberVideo', '0');
           }else{
               sessionStorage.setItem('numberVideo', (NVideoCover+1)+'');
           }
                window.location.reload();
           }, 4000

       )
    })
}
function start () {
    for (let cont = 0; cont < listVideo.length; cont++) {
        if (NVideoCover !== cont) {
            let video = document.createElement('video')
            video.src = listVideo[cont].replaceAll(' ', '%20');
            video.className = `items-carousel video-${cont}`;
            video.setAttribute('data-video', cont + "");
            let boxVideo = document.createElement('div');
            boxVideo.className = `container-video-carousel container-video-${cont}`;
            boxVideo.append(video);
            fragmentHtmlCarousel.append(boxVideo);
        }
    }

    containerCarouselVideo.append(fragmentHtmlCarousel);
}



play_button.addEventListener('click', (event) => {
    play_button.style.display = 'none';
    document.querySelector(".over-body").style.display='none';
    randomCoverVideo.play();
    randomCoverVideo.controls = true;
    UDIOcREte.play();
})

randomCoverVideo.addEventListener('click', () => {
    document.querySelector(".over-body").style.display='block';
        play_button.style.display = 'block';
        UDIOcREte.volume = 0.5;
        UDIOcREte.pause();

    }
);

const containerCarousel = document.querySelector('.container-carousel');
const itemsCarousel = document.querySelector('.items-carousel');
const containerItem = document.querySelector('.container-video-carousel');

const directionLeft = document.getElementById("btnLeft");
const directionRight = document.getElementById("btnRight");


console.clear();

let backNoBack = true;
let totalScroll = containerCarousel.offsetWidth;
const moveLeft = () => {
    if (totalScroll <= 0) {
        backNoBack = true;
        totalScroll = 0
    } else {
        totalScroll -= containerCarousel.scrollLeft;

    }
    containerCarousel.scrollLeft -= containerCarousel.offsetWidth;
}
const moveRight = () => {
    if (totalScroll >= containerCarousel.offsetWidth) {
        totalScroll = containerCarousel.offsetWidth
        backNoBack = false;
    } else {
        totalScroll += containerCarousel.scrollLeft;
    }
    containerCarousel.scrollLeft += containerCarousel.offsetWidth;
}

function startScroll() {
    if (backNoBack) {
        containerCarousel.scrollLeft += 100;
        totalScroll += 100;
    } else {
        containerCarousel.scrollLeft -= 100;
        totalScroll -= 100;
    }

    if (totalScroll >= containerCarousel.scrollWidth) {
        backNoBack = false
    } else if (totalScroll <= 0) {
        backNoBack = true;
    }
    setTimeout(startScroll, 3000);
}

const eventVideo = document.getElementsByClassName("items-carousel");
function  eventVideos () {
    for (let cont = 0; cont < eventVideo.length; cont++) {
        eventVideo[cont].addEventListener('click', (event) => {
            sessionStorage.setItem('numberVideo', event.composedPath()[0].getAttribute('data-video'));
            window.location.reload();
        }, true)
    }
}


directionLeft.addEventListener('click', moveLeft)
directionRight.addEventListener('click', moveRight);

window.onload=()=>{
    let N = sessionStorage.getItem('numberVideo');

    if (N !== null){
        NVideoCover = parseInt(N);
    }else {
        NVideoCover = (Math.round(Math.random() * (listVideo.length - 1)));
    }
        insert();
        start();
        eventVideos()
        startScroll();
        alert('Hey pondremos musica de fondo para que te relajes mientra ves los videos')
}
