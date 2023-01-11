const songImg = document.querySelector(".song-img");
const playBtn = document.querySelector(".play");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const shuffleBtn = document.querySelector(".shuffle");
const playListBtn = document.querySelector(".playlist");
const songName = document.querySelector(".song-name");
const artistName = document.querySelector(".artist-name");
const slider = document.querySelector("input");
const currentTime = document.querySelector(".current-time");
const songDuration = document.querySelector(".song-duration");
const music = document.querySelector("audio");
const side = document.querySelector(".side-bar");
const close = document.querySelector(".close");
const head = document.querySelector(".head");
playListBtn.addEventListener("click", (eo) => {
  side.style.top = "0";
});
close.addEventListener("click", (eo) => {
  side.style.top = "-1500px";
});
let currentIndex = 0;
// load music when load the page
const loadMusic = (eo) => {
  let song = songs[eo];
  songName.innerHTML = song.name;
  artistName.innerHTML = song.artist;
  songImg.style.backgroundImage = `url('${song.cover}')`;
  music.src = song.path;
  head.style.backgroundImage = `url('${song.cover}')`;
};
window.addEventListener("load", (eo) => {
  loadMusic(currentIndex);
});
// play music and toggle icon when click playBtn
playBtn.addEventListener("click", (eo) => {
  if (eo.target.className == "material-icons-round play") {
    eo.target.classList.remove("play");
    eo.target.classList.add("pause");
    playMusic();
  } else {
    eo.target.classList.add("play");
    eo.target.classList.remove("pause");
    pauseMusic();
  }
});
// stup input and time
const formatTime = (time) => {
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);
  if (min < 10) {
    min = `0${min}`;
  }
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
};
music.addEventListener("loadeddata", (eo) => {
  songDuration.innerHTML = formatTime(music.duration);
  slider.max = music.duration;
});
setInterval(() => {
  currentTime.innerHTML = formatTime(music.currentTime);
  slider.value = music.currentTime;
}, 1000);
slider.addEventListener("change", (eo) => {
  music.currentTime = slider.value;
  playMusic();
});
// set up prev and next Btns
nextBtn.addEventListener("click", (eo) => {
  if (shuffleBtn.innerText == "shuffle") {
    let rand = Math.floor(Math.random() * songs.length);
    currentIndex = rand;
    loadMusic(currentIndex);
    playMusic();
  } else {
    nextSong();
  }
});
const nextSong = (eo) => {
  if (currentIndex >= songs.length - 1) {
    currentIndex = 0;
  } else {
    ++currentIndex;
  }
  loadMusic(currentIndex);
  playMusic();
};
const prevSong = (eo) => {
  if (currentIndex <= 0) {
    currentIndex = songs.length - 1;
  } else {
    --currentIndex;
  }
  loadMusic(currentIndex);
  playMusic();
};
prevBtn.addEventListener("click", (eo) => {
  prevSong();
});
const playMusic = (eo) => {
  music.play();
  playBtn.innerHTML = "pause";
  songImg.classList.add("song-img-rotate");
  playBtn.classList.add("play-shadow");
};
const pauseMusic = (eo) => {
  music.pause();
  playBtn.innerHTML = "play_arrow";
  songImg.classList.remove("song-img-rotate");
  playBtn.classList.remove("play-shadow");
};
// change shuffle icon to repeat
shuffleBtn.addEventListener("click", (eo) => {
  let iconName = eo.target.innerText;
  switch (iconName) {
    case "shuffle":
      eo.target.innerText = "repeat";
      break;
    case "repeat":
      eo.target.innerText = "repeat_one";
      break;
    case "repeat_one":
      eo.target.innerText = "shuffle";
      break;
  }
});
// what to do when the song ended
music.addEventListener("ended", (eo) => {
  let iconName = shuffleBtn.innerText;
  switch (iconName) {
    case "repeat":
      nextSong();
      break;
    case "repeat_one":
      music.currentTime = 0;
      loadMusic(currentIndex);
      playMusic();
      break;
    case "shuffle":
      let rand = Math.floor(Math.random() * songs.length);
      currentIndex = rand;
      loadMusic(currentIndex);
      playMusic();
      break;
  }
});
// add list of songs as playlist
const ul = document.querySelector("ul");
for (let i = 0; i < songs.length; i++) {
  let song = songs[i];
  let liTag = `<li>
  <div class="img">
      <img src="${song.cover}" alt="no internet">
  </div>
  <div class="song-info">
      <h2>${song.name}</h2>
      <p>${song.artist}</p>
  </div>
  <audio class="audio" src="${song.path}"></audio>
  <span class="li-song-duration"></span>
  </li>`;
  ul.insertAdjacentHTML("beforeend", liTag);
}
const audio = document.querySelectorAll(".audio");
const playLi = document.querySelectorAll("li");
const liSongDuration = document.querySelectorAll(".li-song-duration");
for (let i = 0; i < playLi.length; i++) {
  const element = playLi[i];
  music.addEventListener("loadeddata", (eo) => {
    liSongDuration[i].innerText = `${formatTime(audio[i].duration)}`;
  });
  element.addEventListener("click", (eo) => {
    currentIndex = i;
    loadMusic(currentIndex);
    playMusic();
  });
}
