const title = document.querySelector(".title");
const album = document.querySelector(".album");
const artist = document.querySelector(".artist");
const prev = document.querySelector(".prev");
const playPause = document.querySelector(".playPause");
const next = document.querySelector(".next");
const audio = document.querySelector("audio");
const albumCover = document.querySelector(".albumCover");

const timer = document.querySelector("#current-time");
const songDuration = document.querySelector("#duration");


const playBtn = document.querySelector(".playBtn");
const pauseBtn = document.querySelector(".pauseBtn");

const player = document.getElementById("player");

//song list

const songList = [
    {
        path: "metamorphosis/StreamogGrime.mp3",
        songName: "Stream / Grime",
        album: "Metamorphosis",
        artist: "Ckin",
    },
    {
        path: "metamorphosis/Matutinal.mp3",
        songName: "Matutinal",
        album: "Metamorphosis",
        artist: "Ckin"
    },
    {
        path: "metamorphosis/Cohere.mp3",
        songName: "Cohere",
        album: "Metamorphosis",
        artist: "Ckin"
    },
    {
        path: "metamorphosis/Coup_d'aeil.mp3",
        songName: "Coup D'œil",
        album: "Metamorphosis",
        artist: "Ckin"
    },
    {
        path: "metamorphosis/TheImposing.mp3",
        songName: "The Imposing",
        album: "Metamorphosis",
        artist: "Ckin"
    }
];

let song_Playing = false;



//play song
function playSong(){
    song_Playing = true;
    audio.play();
    playBtn.classList.add("hidden");
    pauseBtn.classList.remove("hidden");
    albumCover.style.animationPlayState = "running";
    // audio.addEventListener("ended", nextSong);

}
//pause song
function pauseSong(){
    song_Playing = false;
    audio.pause();
    pauseBtn.classList.add("hidden");
    playBtn.classList.remove("hidden");
    albumCover.style.animationPlayState = "paused";

}

//play or pause on click

playPause.addEventListener("click", () => (song_Playing ? 
    pauseSong() : playSong()));

//load song
function loadSong(songList) {
    title.textContent = songList.songName;
    album.textContent = songList.album;
    artist.textContent = songList.artist;
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


// ~~~Progress bar~~~

const progressBar = document.querySelector("#progressBar");

// Set max value when you know the duration
audio.onloadedmetadata = function() { 
    progressBar.max = audio.duration;
    let totalMins = Math.floor(audio.duration / 60);
    let totalSecs = Math.floor(audio.duration % 60);
    if (totalSecs < 10) {
        totalSecs = '0' + String(totalSecs);}
    songDuration.innerHTML = totalMins + ':' + totalSecs;
}
// update audio position
progressBar.onchange = () => audio.currentTime = progressBar.value;


// Timer
// update range input when currentTime updates
audio.ontimeupdate = function() {
    progressBar.value = audio.currentTime
    let currentMins = Math.floor(audio.currentTime / 60);
    let currentSecs = Math.floor(audio.currentTime % 60);
    if (currentSecs < 10) {
    currentSecs = '0' + String(currentSecs);}
    timer.innerHTML = currentMins + ':' + currentSecs;
};

// Play next song
audio.addEventListener('ended',function(){
    nextSong(); 
  });


