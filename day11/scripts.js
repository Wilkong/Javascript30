const player = document.querySelector('.player');
const viewer = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay() {    
    if (viewer.paused) {
        viewer.play();
    } else {
        viewer.pause();
    }
}

function updateButton () {
    const state = this.paused ? '►' : '❚ ❚';
    toggle.textContent = state;
}

function skip () {    
    viewer.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    viewer[this.name] = this.value;
}

function handleProgress() {    
    const percent = (viewer.currentTime / viewer.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub (e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * viewer.duration;
    viewer.currentTime = scrubTime;
}

viewer.addEventListener('click', togglePlay);
viewer.addEventListener('play', updateButton);
viewer.addEventListener('pause', updateButton);
viewer.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(element => element.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);