const artistSongs = [
    {
      title: "Lag Jaa Gale",
      audio: "../audio/lata1.mp3"
    },
    {
      title: "Ajeeb Dastan Hai Yeh",
      audio: "../audio/lata2.mp3"
    },
    {
      title: "Ai Hawa Mere Sang Chal",
      audio: "../audio/aud6.mp3"
    }
  ];
  
  const songList = document.getElementById("songList");
  const audio = new Audio();
  let currentSong = 0;
  
  artistSongs.forEach((song, i) => {
    const card = document.createElement("div");
    card.className = "song-card";
    card.innerHTML = `
      <span>${song.title}</span>
      <button onclick="playSong(${i})">▶</button>
    `;
    songList.appendChild(card);
  });
  
  function playSong(index) {
    currentSong = index;
    audio.src = artistSongs[index].audio;
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
    currentSong = (currentSong - 1 + artistSongs.length) % artistSongs.length;
    playSong(currentSong);
  }
  
  function nextSong() {
    currentSong = (currentSong + 1) % artistSongs.length;
    playSong(currentSong);
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
  
  function formatTime(t) {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  }
  
  function shareArtist() {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert("Artist page link copied to clipboard!");
    });
  }
  