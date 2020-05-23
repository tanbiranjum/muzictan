(function () {
  const container = document.querySelector(".container");
  const progressBar = document.querySelector(".player__progress");
  const title = document.querySelector(".box__title");
  const image = document.querySelector(".box__img");
  const prevBtn = document.querySelector(".player__btn--prev");
  const nextBtn = document.querySelector(".player__btn--next");
  const playBtn = document.querySelector(".player__btn--play");

  const music = [
    "Cecilia Krull - My Life Is Going On",
    "Powfu - death bed",
    "John Legend- All of Me",
    "Avenged Sevenfold - Dear God",
    "Bensound memories",
  ];

  let playing = false;
  let playingIndex = 0;

  // INITIALIZE MUSIC LIST
  music.forEach((item) => {
    const list = `<div class="container-list" draggable="true">
    <audio class="audio" src="./src/{music-src}">
      Your browser does not support the
      <code>audio</code> element.
    </audio>
    <p class="container-list__title">{title}</p>
    <i class="fa fa-play-circle container-list__btn"></i>
  </div>`;
    let newList = list
      .replace("{music-src}", `${item}.mp3`)
      .replace("{title}", item);
    container.insertAdjacentHTML("beforeend", newList);
  });

  const list = document.querySelectorAll(".container-list");
  const audio = document.querySelectorAll("audio");

  audio.forEach((item) => {
    item.addEventListener("timeupdate", progress);
  });

  list.forEach((li, index) => {
    li.setAttribute("data-index", index);
    li.addEventListener("click", playAudio);
  });

  prevBtn.addEventListener("click", musicControlPrev);
  playBtn.addEventListener("click", musicControlPlay);
  nextBtn.addEventListener("click", musicControlNext);

  function playAudio(e) {
    refresh();
    this.classList.add("active");
    playBtn.classList.remove("fa-play");
    playBtn.classList.add("fa-pause");
    const index = this.getAttribute("data-index") * 1;
    setState(index);
    playing = true;
    playingIndex = index;
  }
  // WILL STOP PREVIOUS MUSIC
  function refresh() {
    list.forEach((i) => {
      i.classList.remove("active");
    });
    audio.forEach((i) => {
      i.pause();
      i.currentTime = 0;
    });
  }
  // PROGRESS BAR
  function progress() {
    progressBar.style.width = `${(this.currentTime / this.duration) * 100}%`;
    if (this.currentTime === this.duration) {
      playingIndex++;
      if (playingIndex === music.length) {
        playingIndex = 0;
        refresh();
        setState(playingIndex);
        return;
      }
      refresh();
      setState(playingIndex);
    }
  }
  // SET STATE
  function setState(index) {
    audio[index].play();
    list[index].classList.add("active");
    image.src = `./img/img-music--${index + 1}.jpg`;
    image.classList.add("animate");
    title.innerHTML = music[index];
    playBtn.classList.remove("fa-play");
    playBtn.classList.add("fa-pause");
    title.classList.add("box-animation");
  }

  //MUSIC CONTROL

  function musicControlPlay() {
    if (playing === true) {
      playBtn.classList.remove("fa-pause");
      playBtn.classList.add("fa-play");

      audio[playingIndex].pause();
      image.classList.remove("animate");
      title.classList.remove("box-animation");
      playing = false;
    } else {
      audio[playingIndex].play();
      list[playingIndex].classList.add("active");
      title.classList.add("box-animation");
      title.innerHTML = music[playingIndex];
      image.classList.add("animate");
      playBtn.classList.remove("fa-play");
      playBtn.classList.add("fa-pause");
      playing = true;
    }
  }

  function musicControlNext() {
    playingIndex++;
    if (playingIndex === music.length) {
      playingIndex = 0;
    }
    refresh();
    setState(playingIndex);
    playing = true;
  }

  function musicControlPrev() {
    if (playingIndex === 0) {
      playingIndex = 5;
    }
    playingIndex--;
    refresh();
    setState(playingIndex);
    playing = true;
  }
})();
