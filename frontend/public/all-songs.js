document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('songs-list-container');

    async function fetchAndRenderSongs() {
        try {
            // Hämta data från backend
            const response = await fetch('http://localhost:3000/api/songs/all');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Konvertera till JSON
            const songs = await response.json();

            // Sortera i bokstavsordning (A-Ö)
            songs.sort((a, b) => {
                const titleA = a.title.toLowerCase();
                const titleB = b.title.toLowerCase();
                
                if (titleA < titleB) return -1;
                if (titleA > titleB) return 1;
                return 0; 
            });

            // Töm containern
            container.innerHTML = '';

            if (songs.length === 0) {
                container.innerHTML = '<p id="loading-text">No songs found in the database yet.</p>';
                return;
            }

            // Skapa ett kort för varje låt
            songs.forEach(song => {
                const card = document.createElement('a');
                card.classList.add('song-card');
                
                // Länk till rätt låt-ID
                card.href = `lyrics.html?id=${song.song_id}`;

                const genreText = song.genre ? song.genre : 'Unknown Genre';
                const artistText = song.artist ? song.artist : 'Unknown Artist';

                card.innerHTML = `
                    <h3 class="song-title">${song.title}</h3>
                    <p class="song-artist"><i class="fa-solid fa-microphone-lines"></i> ${artistText}</p>
                    <span class="song-genre">${genreText}</span>
                `;

                container.appendChild(card);
            });

        } catch (error) {
            console.error('Error fetching songs:', error);
            container.innerHTML = '<p id="loading-text" style="color: red;">Failed to load songs. Is the backend running?</p>';
        }
    }

    fetchAndRenderSongs();
});