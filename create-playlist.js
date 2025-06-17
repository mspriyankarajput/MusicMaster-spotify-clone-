const audio = new Audio();
let currentSongIndex = 0;
const playlist = [
  { title: "Recommended 1", audio: "audio/aud1.mp3" },
  { title: "Recommended 2", audio: "audio/aud2.mp3" }
];

// Mini player logic
function playSong(index) {
  currentSongIndex = index;
  audio.src = playlist[index].audio;
  audio.play();
  document.getElementById("playPause").textContent = "⏸";
}

document.getElementById("playPause").addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    document.getElementById("playPause").textContent = "⏸";
  } else {
    audio.pause();
    document.getElementById("playPause").textContent = "▶";
  }
});

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  playSong(currentSongIndex);
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  playSong(currentSongIndex);
}

audio.addEventListener("timeupdate", () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  document.getElementById("progressBar").value = progress;
  document.getElementById("currentTime").textContent = formatTime(audio.currentTime);
  document.getElementById("duration").textContent = formatTime(audio.duration);
});

document.getElementById("progressBar").addEventListener("input", (e) => {
  const seekTime = (e.target.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

document.getElementById("volumeControl").addEventListener("input", (e) => {
  audio.volume = e.target.value;
});

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

// Playlist Form Logic
document.getElementById("imageUpload").addEventListener("change", function () {
  const file = this.files[0];
  const preview = document.getElementById("previewContainer");
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
    };
    reader.readAsDataURL(file);
  }
});

function submitPlaylist() {
  const name = document.getElementById("playlistName").value;
  if (name.trim() === "") {
    alert("Please enter a playlist name.");
    return;
  }
  alert(`Playlist "${name}" created successfully!`);
  // Add actual backend or localStorage logic here
}
