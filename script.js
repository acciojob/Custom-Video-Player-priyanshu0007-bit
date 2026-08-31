/* Edit this file */
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
  } else {
    video.pause();
  }
}


function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}


function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}


function skip() {
  video.currentTime += Number(this.dataset.skip);
}


function handleRangeUpdate() {
  if (this.name === 'volume') {
    video.volume = this.value;
  }

  if (this.name === 'playbackRate') {
    video.playbackRate = this.value;
  }
}


function scrub(e) {
  const scrubTime =
    (e.offsetX / progress.offsetWidth) * video.duration;

  video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);

toggle.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);

video.addEventListener('pause', updateButton);

video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach(button => {
  button.addEventListener('click', skip);
});

ranges.forEach(range => {
  range.addEventListener('change', handleRangeUpdate);
  range.addEventListener('input', handleRangeUpdate);
});

progress.addEventListener('click', scrub);