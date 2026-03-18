const ulList = document.getElementById('popular-songs-list')

const searchInput = document.getElementById('search-input')
const searchResults = document.getElementById('seatchResults')
const searchButton = document.getElementById('search-button')

const dailyVerse = document.getElementById('daily-lyric')

const renderDailyVerse = (verse) => {
    dailyVerse.innerHTML = `<p>"${verse.text_content}" - ${verse.artist_name}, ${verse.song_title}</p>`
}

const fetchDailyVerse = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/lyrics/random')
        const verse = await response.json()
        renderDailyVerse(verse)
    } catch (error) {
        console.log(error)
    }
}

fetchDailyVerse()

const fetchSongs = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/songs')
        const songs = await response.json()

        const songLimit = songs.slice(0, 8)

        renderSongsStartPage(songLimit)
    } catch (error) {
        console.log(error)
    }
}

const renderSongsStartPage = async (songs) => {
    ulList.innerHTML = ''

    songs.forEach((song, number) => {
        const li = document.createElement('li')

        const mostPopular = (number + 1).toString().padStart(2, '0')

        li.textContent = `${mostPopular} ${song.title} - ${song.artist}`
        ulList.appendChild(li)
    })
}

fetchSongs()
