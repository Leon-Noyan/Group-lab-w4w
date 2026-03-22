const lyricContainer = document.getElementById('lyric-container')

const fetchLyricById = async (id) => {
  if (!id) {
    console.error('Missing id')
    return
  }

  try {
    const response = await fetch(`http://localhost:3000/api/lyrics/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch lyric')
    }
    const lyric = await response.json()
    renderLyric(lyric)
  } catch (error) {
    console.error(error)
  }
}

const renderLyric = (rows) => {

  lyricContainer.innerHTML = ''

  if (rows.length === 0 || !rows) {
    lyricContainer.innerHTML = 'Could not find lyrics'
    return
  }

  // Render song title
  const title = document.createElement('h1')
  title.textContent = rows[0].title
  title.className = 'song-title'
  lyricContainer.appendChild(title)


  rows.forEach((row) => {
    // div container
    const contentDiv = document.createElement('div')
    contentDiv.className = 'lyric-content'

    // part of song labels
    const partOfSong = document.createElement('p')
    partOfSong.className = 'part-of-song'
    partOfSong.textContent = row.part_type.toUpperCase()

    // song text
    const lyricText = document.createElement('p')
    lyricText.className = 'lyric-text'
    lyricText.textContent = row.text_content

    // append to container
    contentDiv.appendChild(partOfSong)
    contentDiv.appendChild(lyricText)
    lyricContainer.appendChild(contentDiv)
  })
}

const urlId = new URLSearchParams(window.location.search).get('song_id')
if (!urlId) {
  console.error('Missing song id')
  lyricContainer.innerHTML = 'Song not found'
} else {
  fetchLyricById(urlId)
}
