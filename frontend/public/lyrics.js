const lyricContainer = document.getElementById('lyric-container')
const urlId = new URLSearchParams(window.location.search).get('song_id')

// Comments
const commentInput = document.getElementById('comment-input')
const commentsListUl = document.getElementById('comments-list-ul')
const commentsBtn = document.getElementById('comments-btn')
const form = document.getElementById('comment-form')
const emptyComments = document.getElementById('empty-comments')

// auth
// grabs data
const userToken = (token) => {
    if (token) {
        const payload = token.split('.')[1]
        const decoded = atob(payload)
        return JSON.parse(decoded)
    } else {
        return null
    }
}
const token = localStorage.getItem('token')
const user = userToken(token)

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

// function that renders the lyrics
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
        lyricText.className = 'lyricText'
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

    // checks if the user has entered text in the comment section if not, thet are met with a pop up alert
    if (!commentInput.value.trim()) {
        alert('Enter a comment')
        return
    }
    // template for the comment object
    const comment = {
        song_id: parseInt(urlId),
        user_id: user?.user_id,
        username: user?.username,
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

// function that displays the comment
const displayComment = (comment) => {
    // creates a li element
    const commentLi = document.createElement('li')
    commentLi.className = 'comment-li'

    const textComment = document.createElement('p')
    textComment.textContent = `${comment.username} - ${comment.content}`
    commentLi.appendChild(textComment)
    // creates a button element
    if (user && user.user_id === comment.user_id) {
        const updateBtn = document.createElement('button')
        updateBtn.className = 'update-btn'
        updateBtn.textContent = 'Update'

        updateBtn.addEventListener('click', () =>
            updateComment(comment._id, comment)
        )
        // creates a button element
        const deleteBtn = document.createElement('button')
        deleteBtn.className = 'delete-btn'
        deleteBtn.textContent = 'Delete'
        deleteBtn.addEventListener('click', async () =>
            deleteComment(comment._id)
        )

        // appends the elements to the comment li

        commentLi.appendChild(updateBtn)
        commentLi.appendChild(deleteBtn)
    }

    commentsListUl.appendChild(commentLi)
}

// fetch comments
const fetchComments = async (id) => {
    try {
        const response = await fetch(
            `http://localhost:3000/api/comments/song/${id}`
        )
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
    // gives the user a prompt window where they can update their comment
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

// function that deletes the comment
const deleteComment = async (id) => {
    try {
        const response = await fetch(
            `http://localhost:3000/api/comments/${id}`,
            {
                method: 'DELETE'
            }
        )
        if (response.ok) {
            fetchComments(urlId)
        }
    } catch (error) {
        console.error(error)
    }
}

// function that creates a song view
const createSongView = async () => {
    try {
        await fetch(`http://localhost:3000/api/songs/${urlId}/views`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: user?.user_id })
        })
    } catch (error) {
        console.error(error)
    }
}

if (!user) {
    form.style.display = 'none'
    const infoMessage = document.createElement('p')
    infoMessage.textContent = 'You need to be logged in to post a comment'
    document.getElementById('comments-container').appendChild(infoMessage)
} else {
    form.style.display = 'flex'
}

// checks if the song id is present in the url
if (!urlId) {
    console.error('Missing song id')
    lyricContainer.innerHTML = 'Song not found'
} else {
    fetchLyricById(urlId)
    fetchComments(urlId)
    createSongView()
}
