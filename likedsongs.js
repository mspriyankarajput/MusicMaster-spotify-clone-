const likedSongs = [
  {
    title: "On My Way",
    artist: "Alan Walker",
    img: "images/1.jpg",
    audio: "audio/aud1.mp3"
  },
  {
    title: "Fade",
    artist: "Alan Walker",
    img: "images/2.jpg",
    audio: "audio/aud2.mp3"
  }
];

const container = document.getElementById("likedSongsContainer");
let currentAudio = null;
let currentProgress = null;
let currentIndex = -1;

// Generate song cards
likedSongs.forEach((song, index) => {
  const card = document.createElement("div");
  card.className = "song-card";
  card.innerHTML = `
    <img src="${song.img}" alt="${song.title}">
    <div class="song-info">
      <h4>${song.title}</h4>
      <p>${song.artist}</p>
      <div class="progress-bar" id="progress-${index}">
        <div class="progress-bar-fill" id="progress-fill-${index}"></div>
      </div>
    </div>
    <button class="play-button" onclick="playSong('${song.audio}', ${index})">▶</button>
  `;
  container.appendChild(card);
});

function playSong(src, index) {
  if (currentAudio) {
    currentAudio.pause();
    if (currentProgress) currentProgress.style.width = '0%';
  }

  currentAudio = new Audio(src);
  currentIndex = index;
  currentAudio.play();

  const miniPlayer = document.getElementById("miniPlayer");
  miniPlayer.style.display = "flex";

  document.getElementById("miniImg").src = likedSongs[index].img;
  document.getElementById("miniTitle").textContent = likedSongs[index].title;
  document.getElementById("miniArtist").textContent = likedSongs[index].artist;
  document.getElementById("miniPlayPause").innerHTML = "⏸";

  const progressFill = document.getElementById(`progress-fill-${index}`);
  currentProgress = progressFill;

  currentAudio.addEventListener("timeupdate", () => {
    const percent = (currentAudio.currentTime / currentAudio.duration) * 100;
    progressFill.style.width = `${percent}%`;
    document.getElementById("miniProgress").value = percent;

    document.getElementById("currentTime").textContent = formatTime(currentAudio.currentTime);
    document.getElementById("duration").textContent = formatTime(currentAudio.duration);
  });

  currentAudio.addEventListener("ended", () => {
    progressFill.style.width = "0%";
    document.getElementById("miniProgress").value = 0;
    document.getElementById("miniPlayPause").innerHTML = "▶";
  });

  // Volume
  const volumeSlider = document.getElementById("miniVolume");
  currentAudio.volume = volumeSlider.value;
  volumeSlider.addEventListener("input", () => {
    currentAudio.volume = volumeSlider.value;
  });
}

// Mini play/pause toggle
document.getElementById("miniPlayPause").addEventListener("click", () => {
  if (currentAudio) {
    if (currentAudio.paused) {
      currentAudio.play();
      document.getElementById("miniPlayPause").innerHTML = "⏸";
    } else {
      currentAudio.pause();
      document.getElementById("miniPlayPause").innerHTML = "▶";
    }
  }
});

// Queue navigation
function nextSong() {
  if (currentIndex < likedSongs.length - 1) {
    currentIndex++;
    const next = likedSongs[currentIndex];
    playSong(next.audio, currentIndex);
  }
}

function prevSong() {
  if (currentIndex > 0) {
    currentIndex--;
    const prev = likedSongs[currentIndex];
    playSong(prev.audio, currentIndex);
  }
}

// Utility
function formatTime(time) {
  const mins = Math.floor(time / 60) || 0;
  const secs = Math.floor(time % 60) || 0;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// Seekable progress bar
document.getElementById("miniProgress").addEventListener("input", (e) => {
  if (currentAudio) {
    const percent = e.target.value;
    const newTime = (percent / 100) * currentAudio.duration;
    currentAudio.currentTime = newTime;
  }
});

// Toggle between light and dark mode
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  // Change button text based on theme
  if (document.body.classList.contains("light-mode")) {
    themeToggle.textContent = "🌙 Dark Mode";
  } else {
    themeToggle.textContent = "☀️ Light Mode";
  }
});


