// =======================
// SONG DATABASE
// =======================
const volumeSlider = document.getElementById("volumeSlider");
const volumeIcon = document.getElementById("volumeIcon");
const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const totalTimeEl = document.getElementById("totalTime");
const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const allSongs = {
    playlist: [
      {
        title: "On My Way",
        artist: "Alan Walker",
        img: "images/1.jpg",
        src: "audio/aud1.mp3"
      },
      {
        title: "Fade",
        artist: "Alan Walker",
        img: "images/2.jpg",
        src: "audio/aud2.mp3"
      }
    ],
    lastListening: [
      {
        title: "Cartoon - On & On",
        artist: "Daniel Levi",
        img: "images/3.jpg",
        src: "audio/aud3.mp3"
      },
      {
        title: "Tu Hai To ",
        artist: "Arjit singh",
        img: "images/4.jpg",
        src: "audio/aud4.mp3"
      },
      {
        title: "Kheriyat",
        artist: "Arjit singh",
        img: "images/8.jpg",
        src: "audio/aud14.mp3"
      },
      {
        title: "Dhadak",
        artist: "Arjit singh",
        img: "images/8.jpg",
        src: "audio/dhadak.mp3"
      }
    ],
    recommended: [
      {
        title: "Sitar..chanakaya",
        artist: "Rishab Rikhiram",
        img: "images/5.jpg",
        src: "audio/aud4.mp3"
      },
       {
        title: "Ai hawa Mere sath Chal",
        artist: "Lata Mangeshkar",
        img: "images/6.jpg",
        src: "audio/aud6.mp3"
      },
      {
        title: "mane Tera Nam dil rakh diya",
        artist: "shreya Ghoshal",
        img: "images/7.jpg",
        src: "audio/aud7.mp3"
      },
      {
        title: "Shayad",
        artist: "Arjit singh",
        img: "images/8.jpg",
        src: "audio/aud17.mp3"
      } 
    ]
      
};

// =======================
// ELEMENT REFERENCES
// =======================
const songListEl = document.getElementById("songList");
const audioPlayer = document.getElementById("audioPlayer");
const currentSongImg = document.getElementById("currentSongImg");
const currentSongTitle = document.getElementById("currentSongTitle");
const currentSongArtist = document.getElementById("currentSongArtist");
const playPauseBtn = document.getElementById("playPause");

let currentCategory = "playlist";
let currentSongIndex = 0;
let isPlaying = false;

// =======================
// RENDER SONGS TO LIST
// =======================
function renderSongs(category) {
  const songs = allSongs[category];
  songListEl.innerHTML = "";

  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.classList.add("songItem");
    li.dataset.index = index;

    li.innerHTML = `
      <span>${String(index + 1).padStart(2, "0")}</span>
      <img src="${song.img}" alt="">
      <h5>${highlightText(song.title)}<br><div class="subtitle">${highlightText(song.artist)}</div></h5>
      <i class="bi bi-play-circle-fill playListPlay" data-id="${category}-${index}"></i>
    `;

    songListEl.appendChild(li);
  });

  addPlayListeners();
  highlightCurrentSong(currentSongIndex);
}

// =======================
// LOAD A SONG INTO PLAYER
// =======================
function loadSong(category, index) {
  const song = allSongs[category][index];
  currentCategory = category;
  currentSongIndex = index;

  audioPlayer.src = song.src;
  currentSongImg.src = song.img;
  currentSongTitle.textContent = song.title;
  currentSongArtist.textContent = song.artist;

  audioPlayer.play();
  isPlaying = true;
  updatePlayButton(true);
  highlightCurrentSong(index);
}

// =======================
// UPDATE PLAY/PAUSE ICON
// =======================
function updatePlayButton(playing) {
  if (playing) {
    playPauseBtn.classList.remove("bi-play-fill");
    playPauseBtn.classList.add("bi-pause-fill");
  } else {
    playPauseBtn.classList.remove("bi-pause-fill");
    playPauseBtn.classList.add("bi-play-fill");
  }
}

// Highlight current song
function highlightCurrentSong(index) {
  document.querySelectorAll(".songItem").forEach((item, i) => {
    item.classList.toggle("playing", i === index);
  });
}

// =======================
// SIDEBAR MENU CLICK
// =======================
document.querySelectorAll(".sidebar-menu li").forEach(menu => {
  menu.addEventListener("click", () => {
    const category = menu.getAttribute("data-type");
    renderSongs(category);
    loadSong(category, 0);

    document.querySelectorAll(".sidebar-menu li").forEach(li => li.classList.remove("active"));
    menu.classList.add("active");
  });
});

// =======================
// PLAY/PAUSE BUTTON
// =======================
playPauseBtn.addEventListener("click", () => {
  if (isPlaying) {
    audioPlayer.pause();
    updatePlayButton(false);
    isPlaying = false;
  } else {
    audioPlayer.play();
    updatePlayButton(true);
    isPlaying = true;
  }
});

let isRepeat = false;
let isShuffle = false;

repeatBtn.addEventListener("click", () => {
  isRepeat = !isRepeat;
  repeatBtn.classList.toggle("active", isRepeat);
  if (isRepeat) {
    shuffleBtn.classList.remove("active");
    isShuffle = false;
  }
});

shuffleBtn.addEventListener("click", () => {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle("active", isShuffle);
  if (isShuffle) {
    repeatBtn.classList.remove("active");
    isRepeat = false;
  }
});

audioPlayer.addEventListener("ended", () => {
  const songsInCategory = allSongs[currentCategory];
  if (isRepeat) {
    audioPlayer.currentTime = 0;
    audioPlayer.play();
  } else if (isShuffle) {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * songsInCategory.length);
    } while (nextIndex === currentSongIndex);
    loadSong(currentCategory, nextIndex);
  } else {
    let nextIndex = currentSongIndex + 1;
    if (nextIndex >= songsInCategory.length) nextIndex = 0;
    loadSong(currentCategory, nextIndex);
  }
});

function addPlayListeners() {
  document.querySelectorAll(".playListPlay").forEach(btn => {
    btn.addEventListener("click", () => {
      const [cat, idx] = btn.dataset.id.split("-");
      loadSong(cat, parseInt(idx));
    });
  });
}

renderSongs("playlist");
loadSong("playlist", 0);

// =======================
// SEARCH FUNCTIONALITY
// =======================
searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase();
  console.log("Search query:", query);

  if (!query) {
    renderSongs(currentCategory);
    return;
  }

  const allResults = Object.entries(allSongs).flatMap(([category, songs]) =>
    songs
      .map((song, index) => ({ ...song, category, index }))
      .filter(song =>
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query)
      )
  );

  console.log("Filtered results:", allResults);
  renderFilteredSongs(allResults, query);
});


searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const songs = allSongs[currentCategory];
    const query = this.value.toLowerCase();
    const index = songs.findIndex(song =>
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query)
    );
    if (index !== -1) loadSong(currentCategory, index);
  }
});

function renderFilteredSongs(filteredSongs, query = "") {
  console.log("Rendering", filteredSongs.length, "filtered songs");
  songListEl.innerHTML = "";

  filteredSongs.forEach(song => {
    const li = document.createElement("li");
    li.classList.add("songItem");

    li.innerHTML = `
      <span>-</span>
      <img src="${song.img}" alt="">
      <h5>${highlightText(song.title, query)}<br>
        <div class="subtitle">
          ${highlightText(song.artist, query)}
          <span class="category-label">(${song.category})</span>
        </div>
      </h5>
      <i class="bi bi-play-circle-fill playListPlay" data-id="${song.category}-${song.index}"></i>
    `;

    songListEl.appendChild(li);
  });

  addPlayListeners();
}

function highlightText(text, query = searchInput.value.toLowerCase()) {
  if (!query) return text;
  const re = new RegExp(`(${query})`, "gi");
  return text.replace(re, '<mark>$1</mark>');
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

audioPlayer.addEventListener("timeupdate", () => {
  progressBar.value = audioPlayer.currentTime;
  currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
});

audioPlayer.addEventListener("loadedmetadata", () => {
  progressBar.max = audioPlayer.duration;
  totalTimeEl.textContent = formatTime(audioPlayer.duration);
});

progressBar.addEventListener("input", () => {
  audioPlayer.currentTime = progressBar.value;
});
;

// Set default volume
audioPlayer.volume = volumeSlider.value;

// Volume slider changes
volumeSlider.addEventListener("input", () => {
  audioPlayer.volume = volumeSlider.value;
  updateVolumeIcon();
});

// Mute/unmute toggle on icon click
volumeIcon.addEventListener("click", () => {
  if (audioPlayer.volume > 0) {
    audioPlayer.dataset.lastVolume = audioPlayer.volume;
    audioPlayer.volume = 0;
    volumeSlider.value = 0;
  } else {
    audioPlayer.volume = audioPlayer.dataset.lastVolume || 1;
    volumeSlider.value = audioPlayer.volume;
  }
  updateVolumeIcon();
});

// Update volume icon based on current volume
function updateVolumeIcon() {
  if (vol === 0) {
    volumeIcon.className = "bi bi-volume-mute-fill";
  } else if (vol < 0.5) {
    volumeIcon.className = "bi bi-volume-down-fill";
  } else {
    volumeIcon.className = "bi bi-volume-up-fill";
  }
}

prevBtn.addEventListener("click", () => {
  const prevIndex = (currentSongIndex - 1 + allSongs[currentCategory].length) % allSongs[currentCategory].length;
  loadSong(currentCategory, prevIndex);
});

nextBtn.addEventListener("click", () => {
  const nextIndex = (currentSongIndex + 1) % allSongs[currentCategory].length;
  loadSong(currentCategory, nextIndex);
});

const artists = [
  { name: "Alan Walker", image: "images/5.jpg", page: "artists/alan-walker.html" },
  { name: "Arijit Singh", image: "images/8.jpg", page: "artists/arijit-singh.html" },
  { name: "Shreya Ghoshal", image: "images/7.jpg", page: "artists/shreya.html" },
  { name: "Lata Mangeshkar", image: "images/6.jpg", page: "artists/lata-mangeshkar.html" },
  { name: "Alka Yagnik", image: "images/alka.jpg", page: "artists/alka.html" },
  { name: "Kavita Krishnamurthy", image: "images/kavita.jpg", page: "artists/kavita.html" },
  { name: "Asha Bhosale", image: "images/asha.jpg", page: "artists/asha.html" },
  { name: "Sonu Nigam", image: "images/sonu.jpg", page: "artists/sonu.html" }
];


const artistList = document.querySelector(".artist-list");

artists.forEach((artist) => {
  const card = document.createElement("a");
  card.className = "artist-card";
  card.href = artist.page;
  card.target = "_blank"; // Open in a new tab
  card.innerHTML = `
    <img src="${artist.image}" alt="${artist.name}" />
    <p>${artist.name}</p>
  `;
  artistList.appendChild(card);
});


loadPopularArtists();
// Load when page is ready
document.addEventListener("DOMContentLoaded", loadPopularArtists);

function showLogin() {
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
}

function showSignup() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "block";
}
//liked song details...
function likeCurrentSong() {
  const title = document.getElementById("currentSongTitle").textContent;
  const artist = document.getElementById("currentSongArtist").textContent;
  const img = document.getElementById("currentSongImg").getAttribute("src");

  const likedSongs = JSON.parse(localStorage.getItem("likedSongs")) || [];

  if (!likedSongs.some(song => song.title === title)) {
    likedSongs.push({ title, artist, img });
    localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
    alert(`${title} added to Liked Songs`);
  } else {
    alert(`${title} is already in Liked Songs`);
  }
}

const card = document.createElement('div');
card.className = 'artist-card';
card.innerHTML = `
  <img src="${artist.image}" alt="${artist.name}">
  <p>${artist.name}</p>
`;
card.style.cursor = 'pointer';
card.addEventListener('click', () => {
  window.location.href = artist.page;
});
artistList.appendChild(card);
