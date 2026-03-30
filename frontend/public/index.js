// Popular songs list
const ulList = document.getElementById('popular-songs-list')
// Daily verse
const dailyVerse = document.getElementById('daily-lyric')

// function that renders the daily verse
const renderDailyVerse = (verse) => {
    dailyVerse.innerHTML = `<p>"${verse.text_content}" - ${verse.name}, ${verse.title}</p>`
}

// function that fetches the daily verse
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

// function that fetches the songs
const fetchSongs = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/songs')
        const songs = await response.json()
        // limits the amount of songs being rendered to the popular songs list
        const songLimit = songs.slice(0, 8)

        renderSongsStartPage(songLimit)
    } catch (error) {
        console.log(error)
    }
}

// function that renders the songs
const renderSongsStartPage = async (songs) => {
    ulList.innerHTML = ''

    songs.forEach((song, number) => {
        const li = document.createElement('li')
        li.className = 'popular-song-li'

        const mostPopular = (number + 1).toString().padStart(2, '0')

        li.innerHTML = `<a href="lyrics.html?song_id=${song.song_id}">${mostPopular} ${song.title} - ${song.artist}</a> <span><i class="fa-solid fa-eye"></i>${viewFormat(song.views)}</span>`
        ulList.appendChild(li)
        // kolla view format
    })
}

// function to make sure that we don't display a large number of views, instead we display higher value numbers with a K or M
function viewFormat(numberOfViews) {
    if (numberOfViews >= 1000000) {
        return `${(numberOfViews / 1000000).toFixed(1)}M`
    } else if (numberOfViews >= 1000) {
        return `${(numberOfViews / 1000).toFixed(1)}K`
    }
    return numberOfViews
}

fetchSongs()
