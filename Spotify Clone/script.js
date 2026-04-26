console.log("Welcome to Spotify");

// Run after DOM is ready to avoid missing-element errors when opened in different contexts
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize the Variables
        let songIndex = 0;
        let audioElement = new Audio('songs/1.mp3');
        let masterPlay = document.getElementById('masterPlay');
        let myProgressBar = document.getElementById('myProgressBar');
        let gif = document.getElementById('gif');
        let masterSongName = document.getElementById('masterSongName');
        let masterCover = document.getElementById('masterCover');
        let masterSongNameBanner = document.getElementById('masterSongNameBanner');
        let songItems = Array.from(document.getElementsByClassName('songItem'));

        let songs = [
            { songName: "Gal Sun", filePath: "songs/1765367449_Gal_Sun.mp3", coverPath: "covers/1.jpg" },
            { songName: "All Black - Raftaar", filePath: "songs/All Black Raftaar 128 Kbps.mp3", coverPath: "covers/2.jpg" },
            { songName: "Jogi - Various", filePath: "songs/Jogi - Various.mp3", coverPath: "covers/3.jpg" },
            { songName: "Kaatilana - Talwiinder", filePath: "songs/Kaatilana - Talwiinder.mp3", coverPath: "covers/4.jpg" },
            { songName: "Moka Soka", filePath: "songs/Moka_Soka_1.mp3", coverPath: "covers/5.jpg" },
            { songName: "Nashe Si Chadh Gayi", filePath: "songs/Nashe Si Chadh Gayi Befikre 128 Kbps.mp3", coverPath: "covers/6.jpg" },
            { songName: "Ramba Ho", filePath: "songs/Ramba Ho Dhurandhar 128 Kbps.mp3", coverPath: "covers/7.jpg" },
            { songName: "Run Down The City", filePath: "songs/Run Down The City Monica Dhurandhar 128 Kbps.mp3", coverPath: "covers/8.jpg" },
            { songName: "Tamanche Pe Disco", filePath: "songs/Tamanche Pe Disco Bullett Raja 128 Kbps.mp3", coverPath: "covers/9.jpg" },
            { songName: "Total", filePath: "songs/Total_1.mp3", coverPath: "covers/10.jpg" },
        ]
        
        // Set initial banner
        if (masterCover && songs[0]) masterCover.src = songs[0].coverPath;
        if (masterSongNameBanner && songs[0]) masterSongNameBanner.innerText = songs[0].songName;

        // Populate UI items safely
        songItems.forEach((element, i)=>{ 
            const img = element.getElementsByTagName("img")[0];
            if (img && songs[i]) img.src = songs[i].coverPath; 
            const nameEl = element.getElementsByClassName("songName")[0];
            if (nameEl && songs[i]) nameEl.innerText = songs[i].songName; 
        })

        if (!masterPlay) {
            console.warn('masterPlay element not found — playback controls will not work');
            return;
        }

        // Handle play/pause click
        masterPlay.addEventListener('click', ()=>{
            if(audioElement.paused || audioElement.currentTime<=0){
                audioElement.play();
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
                if (gif) gif.style.opacity = 1;
            }
            else{
                audioElement.pause();
                masterPlay.classList.remove('fa-pause-circle');
                masterPlay.classList.add('fa-play-circle');
                if (gif) gif.style.opacity = 0;
            }
        })

        // Listen to Events
        audioElement.addEventListener('timeupdate', ()=>{ 
            // Update Seekbar
            if (audioElement.duration && myProgressBar) {
                const progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
                myProgressBar.value = isFinite(progress) ? progress : 0;
            }
        })

        if (myProgressBar) {
            myProgressBar.addEventListener('change', ()=>{
                if (audioElement.duration) audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
            })
        }

        // Handle individual song item clicks
        songItems.forEach((element) => {
            element.addEventListener('click', (e) => {
                songIndex = parseInt(e.currentTarget.id);
                console.log('Song item clicked:', songIndex);

                // Update UI first
                masterSongName.innerText = songs[songIndex].songName;
                masterCover.src = songs[songIndex].coverPath;
                masterSongNameBanner.innerText = songs[songIndex].songName;
                if (gif) gif.style.opacity = 1;
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');

                // Then handle audio
                audioElement.src = songs[songIndex].filePath;
                audioElement.currentTime = 0;
                audioElement.play()
                    .then(() => console.log('Playback started'))
                    .catch(err => console.warn('Playback prevented or failed:', err));
            })
        })

        const nextBtn = document.getElementById('next');
        if (nextBtn) {
            nextBtn.addEventListener('click', ()=>{
                songIndex = (songIndex >= 9) ? 0 : songIndex + 1;
                
                masterSongName.innerText = songs[songIndex].songName;
                masterCover.src = songs[songIndex].coverPath;
                masterSongNameBanner.innerText = songs[songIndex].songName;
                
                audioElement.src = songs[songIndex].filePath;
                audioElement.currentTime = 0;
                audioElement.play().catch(err => console.warn('Playback prevented:', err));
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
            })
        }

        const prevBtn = document.getElementById('previous');
        if (prevBtn) {
            prevBtn.addEventListener('click', ()=>{
                songIndex = (songIndex <= 0) ? 9 : songIndex - 1;

                masterSongName.innerText = songs[songIndex].songName;
                masterCover.src = songs[songIndex].coverPath;
                masterSongNameBanner.innerText = songs[songIndex].songName;

                audioElement.src = songs[songIndex].filePath;
                audioElement.currentTime = 0;
                audioElement.play().catch(err => console.warn('Playback prevented:', err));
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
            })
        }
    }
    catch (err) {
        console.error('Error initializing player script:', err);
    }
});

// Global error handler to surface unexpected runtime errors in the console
window.addEventListener('error', (e) => {
    console.error('Uncaught error:', e.message, e.filename + ':' + e.lineno);
});