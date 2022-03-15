const title = document.querySelector(".title");
const prev = document.querySelector(".prev");
const playPause = document.querySelector(".playPause");
const next = document.querySelector(".next");
const audio = document.querySelector("audio");

const playBtn = document.querySelector(".playBtn");
const pauseBtn = document.querySelector(".pauseBtn");

//song list

const songList = [
    {
        path: "metamorphosis/StreamogGrime.mp3",
        songName: "Stream / Grime"
    },
    {
        path: "metamorphosis/Matutinal.mp3",
        songName: "Matutinal"
    },
    {
        path: "metamorphosis/Cohere.mp3",
        songName: "Cohere"
    },
    {
        path: "metamorphosis/Coup_d'aeil.mp3",
        songName: "Coup D'œil"
    },
    {
        path: "metamorphosis/TheImposing.mp3",
        songName: "The Imposing"
    }
];

let song_Playing = false;

//play song
function playSong(){
    song_Playing = true;
    audio.play();
    playBtn.classList.add("hidden");
    pauseBtn.classList.remove("hidden");

}
//pause song
function pauseSong(){
    song_Playing = false;
    audio.pause();
    pauseBtn.classList.add("hidden");
    playBtn.classList.remove("hidden");
}

//play or pause on click

playPause.addEventListener("click", () => (song_Playing ? 
    pauseSong() : playSong()));

//load song
function loadSong(songList) {
    title.textContent = songList.songName;
    audio.src = songList.path;
}

//current song
let i = 0;

//on load select first song on the list
loadSong(songList[i])

//previous song
function prevSong(){
    i--;
    if (i < 0){
        i = songList.length - 1;
    }
    loadSong(songList[i]);
    playSong();
}

prev.addEventListener("click", prevSong);

//next song
function nextSong(){
    i++;
    if (i > songList.length - 1){
        i = 0;
    }
    loadSong(songList[i]);
    playSong();
}

next.addEventListener("click", nextSong);
