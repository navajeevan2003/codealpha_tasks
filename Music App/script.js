/* =========================================================
   CODEALPHA MUSIC PLAYER
========================================================= */


/* =========================================================
   SONG DATA
========================================================= */

const songs = [

    {
        title: "Perfect",
        artist: "Ed Sheeran",
        audio: "./assets/music/song1.mp3",
        cover: "./assets/images/song1.jpg"
    },

    {
        title: "Avenger",
        artist: "Imagine Dragons",
        audio: "./assets/music/song2.mp3",
        cover: "./assets/images/song2.jpg"
    },

    {
        title: "Dream",
        artist: "Alan Walker",
        audio: "./assets/music/song3.mp3",
        cover: "./assets/images/song3.jpg"
    }

];


/* =========================================================
   ELEMENTS
========================================================= */

const audio = document.getElementById("audio");

const cover = document.getElementById("cover");

const title = document.getElementById("title");

const artist = document.getElementById("artist");

const playBtn = document.getElementById("playBtn");

const previousBtn =
    document.getElementById("previousBtn");

const nextBtn =
    document.getElementById("nextBtn");

const progress =
    document.getElementById("progress");

const currentTime =
    document.getElementById("currentTime");

const duration =
    document.getElementById("duration");

const volume =
    document.getElementById("volume");

const volumeIcon =
    document.getElementById("volumeIcon");

const playlistItems =
    document.getElementById("playlistItems");

const songCount =
    document.getElementById("songCount");

const themeBtn =
    document.getElementById("themeBtn");

const musicPlayer =
    document.getElementById("musicPlayer");

const menuBtn =
    document.getElementById("menuBtn");

const shuffleBtn =
    document.getElementById("shuffleBtn");

const repeatBtn =
    document.getElementById("repeatBtn");

const playMode =
    document.getElementById("playMode");


/* =========================================================
   VARIABLES
========================================================= */

let currentSongIndex = 0;

let isShuffle = false;

let isRepeat = false;


/* =========================================================
   LOAD SONG
========================================================= */

function loadSong(index) {

    currentSongIndex = index;

    const song = songs[currentSongIndex];

    title.textContent = song.title;

    artist.textContent = song.artist;

    cover.src = song.cover;

    audio.src = song.audio;

    audio.load();

    progress.value = 0;

    currentTime.textContent = "00:00";

    duration.textContent = "00:00";

    updatePlaylist();

}


/* =========================================================
   PLAY SONG
========================================================= */

async function playSong() {

    try {

        await audio.play();

        playBtn.textContent = "⏸";

        musicPlayer.classList.add("playing");

    }

    catch (error) {

        console.error("Audio playback error:", error);

        alert(
            "Music could not be played.\n\n" +
            "Please check that the MP3 file is inside:\n" +
            "assets/music/"
        );

    }

}


/* =========================================================
   PAUSE SONG
========================================================= */

function pauseSong() {

    audio.pause();

    playBtn.textContent = "▶";

    musicPlayer.classList.remove("playing");

}


/* =========================================================
   PLAY / PAUSE
========================================================= */

playBtn.addEventListener("click", () => {

    if (audio.paused) {

        playSong();

    } else {

        pauseSong();

    }

});


/* =========================================================
   NEXT SONG
========================================================= */

function nextSong() {

    if (isShuffle) {

        let randomIndex;

        do {

            randomIndex =
                Math.floor(
                    Math.random() * songs.length
                );

        } while (
            randomIndex === currentSongIndex &&
            songs.length > 1
        );

        currentSongIndex = randomIndex;

    } else {

        currentSongIndex++;

        if (currentSongIndex >= songs.length) {

            currentSongIndex = 0;

        }

    }

    loadSong(currentSongIndex);

    playSong();

}


nextBtn.addEventListener(
    "click",
    nextSong
);


/* =========================================================
   PREVIOUS SONG
========================================================= */

function previousSong() {

    currentSongIndex--;

    if (currentSongIndex < 0) {

        currentSongIndex =
            songs.length - 1;

    }

    loadSong(currentSongIndex);

    playSong();

}


previousBtn.addEventListener(
    "click",
    previousSong
);


/* =========================================================
   AUDIO TIME UPDATE
========================================================= */

audio.addEventListener(
    "timeupdate",
    () => {

        if (!audio.duration) {
            return;
        }

        const percentage =
            (audio.currentTime /
                audio.duration) * 100;

        progress.value = percentage;

        currentTime.textContent =
            formatTime(audio.currentTime);

    }
);


/* =========================================================
   AUDIO METADATA
========================================================= */

audio.addEventListener(
    "loadedmetadata",
    () => {

        if (!isNaN(audio.duration)) {

            duration.textContent =
                formatTime(audio.duration);

        }

    }
);


/* =========================================================
   PROGRESS BAR
========================================================= */

progress.addEventListener(
    "input",
    () => {

        if (!audio.duration) {
            return;
        }

        const newTime =
            (progress.value / 100) *
            audio.duration;

        audio.currentTime = newTime;

    }
);


/* =========================================================
   FORMAT TIME
========================================================= */

function formatTime(time) {

    if (isNaN(time)) {

        return "00:00";

    }

    const minutes =
        Math.floor(time / 60);

    const seconds =
        Math.floor(time % 60);

    return (
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0")
    );

}


/* =========================================================
   VOLUME
========================================================= */

audio.volume = 0.8;

volume.addEventListener(
    "input",
    () => {

        audio.volume = volume.value;

        updateVolumeIcon();

    }
);


function updateVolumeIcon() {

    if (audio.volume === 0) {

        volumeIcon.textContent = "🔇";

    }

    else if (audio.volume < 0.5) {

        volumeIcon.textContent = "🔉";

    }

    else {

        volumeIcon.textContent = "🔊";

    }

}


/* =========================================================
   SONG ENDED
========================================================= */

audio.addEventListener(
    "ended",
    () => {

        if (isRepeat) {

            audio.currentTime = 0;

            playSong();

        }

        else {

            nextSong();

        }

    }
);


/* =========================================================
   PLAYLIST
========================================================= */

function updatePlaylist() {

    playlistItems.innerHTML = "";

    songs.forEach(
        (song, index) => {

            const item =
                document.createElement("div");

            item.className =
                "playlist-item";

            if (
                index === currentSongIndex
            ) {

                item.classList.add("active");

            }


            item.innerHTML = `

                <img
                    class="playlist-cover"
                    src="${song.cover}"
                    alt="${song.title}"
                >

                <div class="playlist-details">

                    <strong>
                        ${song.title}
                    </strong>

                    <span>
                        ${song.artist}
                    </span>

                </div>

                <span class="playlist-play">
                    ${index === currentSongIndex ? "▶" : "•"}
                </span>

            `;


            item.addEventListener(
                "click",
                () => {

                    loadSong(index);

                    playSong();

                }
            );


            playlistItems.appendChild(item);

        }
    );


    songCount.textContent =
        `${songs.length} Songs`;

}


/* =========================================================
   SHUFFLE
========================================================= */

shuffleBtn.addEventListener(
    "click",
    () => {

        isShuffle = !isShuffle;

        shuffleBtn.classList.toggle(
            "active",
            isShuffle
        );

        playMode.textContent =
            isShuffle ? "Shuffle" : "Normal";

    }
);


/* =========================================================
   REPEAT
========================================================= */

repeatBtn.addEventListener(
    "click",
    () => {

        isRepeat = !isRepeat;

        repeatBtn.classList.toggle(
            "active",
            isRepeat
        );

        playMode.textContent =
            isRepeat ? "Repeat" : "Normal";

    }
);


/* =========================================================
   THEME
========================================================= */

themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light"
        );

        if (
            document.body.classList.contains(
                "light"
            )
        ) {

            themeBtn.textContent = "🌙";

        }

        else {

            themeBtn.textContent = "☀";

        }

    }
);


/* =========================================================
   MENU BUTTON
========================================================= */

menuBtn.addEventListener(
    "click",
    () => {

        document.getElementById(
            "playlist"
        ).scrollIntoView({
            behavior: "smooth"
        });

    }
);


/* =========================================================
   ERROR HANDLING
========================================================= */

audio.addEventListener(
    "error",
    () => {

        console.error(
            "Audio failed to load:",
            audio.src
        );

    }
);


/* =========================================================
   INITIALIZE PLAYER
========================================================= */

loadSong(0);

updateVolumeIcon();

console.log(
    "CodeAlpha Music Player loaded successfully."
);

console.log(
    "Current audio:",
    songs[0].audio
);