const player = document.querySelector('.player');

const video = player.querySelector('.viewer');

const progress = player.querySelector('.progress');

const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');

const skipButtons = player.querySelectorAll('[data-skip]');

const ranges = player.querySelectorAll('.player__slider');


function togglePlay() {
  if (video.paused) {
    video.play();
    toggle.innerHTML = '❚ ❚';
  } else {
    video.pause();
    toggle.innerHTML = '►';
  }
}


toggle.addEventListener('click', togglePlay);


video.addEventListener('play', function () {
  toggle.innerHTML = '❚ ❚';
});

video.addEventListener('pause', function () {
  toggle.innerHTML = '►';
});


function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;

  progressBar.style.width = percent + '%';
  progressBar.style.flexBasis = percent + '%';
}

video.addEventListener('timeupdate', handleProgress);


video.addEventListener('timeupdate', handleProgress);


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


function skip() {
  video.currentTime += Number(this.dataset.skip);
}

skipButtons.forEach(function (button) {
  button.addEventListener('click', skip);
});


function scrub(e) {
  const scrubTime =
    (e.offsetX / progress.offsetWidth) * video.duration;

  video.currentTime = scrubTime;
}

progress.addEventListener('click', scrub);