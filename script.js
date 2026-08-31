const player = document.querySelector('.player');

const video = player.querySelector('.viewer');

const progress = player.querySelector('.progress');

const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');

const skipButtons = player.querySelectorAll('[data-skip]');

const ranges = player.querySelectorAll('.player__slider');


// PLAY / PAUSE
function togglePlay() {
  if (video.paused) {
    video.play();
    toggle.innerHTML = '❚ ❚';
  } else {
    video.pause();
    toggle.innerHTML = '►';
  }
}


// PLAY / PAUSE BUTTON
toggle.addEventListener('click', togglePlay);


// Keep button correct when video state changes
video.addEventListener('play', function () {
  toggle.innerHTML = '❚ ❚';
});

video.addEventListener('pause', function () {
  toggle.innerHTML = '►';
});


// PROGRESS BAR
function handleProgress() {
  if (video.duration) {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.width = percent + '%';
  }
}


// Update progress while video plays
video.addEventListener('timeupdate', handleProgress);


// VOLUME
function handleRangeUpdate() {
  if (this.name === 'volume') {
    video.volume = this.value;
  }

  if (this.name === 'playbackRate') {
    video.playbackRate = this.value;
  }
}

ranges.forEach(function (range) {
  range.addEventListener('input', handleRangeUpdate);
});


// SKIP BUTTONS
function skip() {
  video.currentTime += Number(this.dataset.skip);
}

skipButtons.forEach(function (button) {
  button.addEventListener('click', skip);
});


// PROGRESS BAR CLICK
function scrub(e) {
  const scrubTime =
    (e.offsetX / progress.offsetWidth) * video.duration;

  video.currentTime = scrubTime;
}

progress.addEventListener('click', scrub);