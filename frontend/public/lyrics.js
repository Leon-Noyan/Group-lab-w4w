const lyricContainer = document.getElementById('lyric-container')
const urlId = new URLSearchParams(window.location.search).get('song_id')
// Comments
const commentInput = document.getElementById('comment-input')
const commentsListUl = document.getElementById('comments-list-ul')
const commentsBtn = document.getElementById('comments-btn')
const form = document.getElementById('comment-form')
const emptyComments = document.getElementById('empty-comments')

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
        lyricText.textContent = row.text_content

        // append to container
        contentDiv.appendChild(partOfSong)
        contentDiv.appendChild(lyricText)
        lyricContainer.appendChild(contentDiv)
    })
}

// Comments

form.addEventListener('submit', async (event) => {
    event.preventDefault()

    if (!commentInput.value) {
        alert('Enter a comment')
        return
    }
    const comment = {
        song_id: parseInt(urlId),
        user_id: 1,
        username: 'Yulia',
        content: commentInput.value
    }

    try {
        const response = await fetch('http://localhost:3000/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        })
        if (response.ok) {
            const createdComment = await response.json()
            commentInput.value = ''
            displayComment(createdComment)
        }
    } catch (error) {
        console.error(error)
    }
})

const displayComment = (comment) => {
    const commentLi = document.createElement('li')

    const updateBtn = document.createElement('button')
    updateBtn.textContent = 'Update'
    updateBtn.addEventListener('click', () =>
        updateComment(comment._id, comment)
    )

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Delete'
    deleteBtn.addEventListener('click', async () => deleteComment(comment._id))

    commentLi.innerHTML = `<p>${comment.username} - ${comment.content}</p>

    `
    commentsListUl.appendChild(commentLi)
    commentLi.appendChild(updateBtn)
    commentLi.appendChild(deleteBtn)
}

// fetch comments
const fetchComments = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/api/comments/song/${id}`)
        const comments = await response.json()

        commentsListUl.innerHTML = ''

        if (comments.length === 0) {
            emptyComments.style.display = 'block'
        } else {
            emptyComments.style.display = 'none'
            comments.forEach((comment) => displayComment(comment))
        }

    } catch (error) {
        console.error(error)
    }
}

const updateComment = async (id, comment) => {
    const updatedMessage = prompt('Update your comment', comment.content)

    if (!updatedMessage) {
        return
    }

    try {
        const response = await fetch(
            `http://localhost:3000/api/comments/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: updatedMessage })
            }
        )
        if (response.ok) {
            fetchComments(urlId)
        }
    } catch (error) {
        console.error(error)
    }
}

const deleteComment = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/comments/${id}`, {
        method: 'DELETE'
    })
    if (response.ok) {
      fetchComments(urlId)
    }
  } catch (error) {
    console.error(error)
  }
}

if (!urlId) {
    console.error('Missing song id')
    lyricContainer.innerHTML = 'Song not found'
} else {
    fetchLyricById(urlId)
    fetchComments(urlId)
}
