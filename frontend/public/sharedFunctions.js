// Searchbar
const searchInput = document.getElementById('search-input')
const searchResults = document.getElementById('search-results')
const searchButton = document.getElementById('search-button')

let searchTimeout
const searchTimeHandler = (userInput) => {
    clearTimeout(searchTimeout)

    searchTimeout = setTimeout(() => {
        if (userInput.length >= 2) {
            fetchSearchedSongs(userInput)
        } else {
            searchResults.innerHTML = ''
            searchResults.style.display = 'none'
        }
    }, 500)
}

searchInput.addEventListener('input', (event) => {
    const userInput = event.target.value.trim()
    searchTimeHandler(userInput)
})

async function fetchSearchedSongs(search) {
    try {
        const response = await fetch(
            `http://localhost:3000/api/songs/search?search=${search}`
        )

        const songs = await response.json()

        searchResults.innerHTML = ''

        if (songs.length === 0) {
          searchResults.style.display = 'block'
          searchResults.innerHTML = '<p>Could not find results</p>'
          return
        } else if (searchInput.value === '') {
          searchResults.style.display = 'none'
        } else {
          searchResults.style.display = 'block'
        }

        songs.forEach((song) => {
          console.log('Song object:', song)
            const songDiv = document.createElement('div')
            songDiv.classList.add('song-card')
            // kolla att länken är rätt, den behöver plocka rätt id för rätt låt så att den får rätt sida
            songDiv.innerHTML = `<a href="lyrics.html?song_id=${song.song_id}">${song.title} - ${song.artist}</a>`

            searchResults.appendChild(songDiv)
        })
    } catch (error) {
        console.log(error)
        searchResults.style.display = 'none'
    }
}
