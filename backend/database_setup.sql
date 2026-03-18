CREATE DATABASE IF NOT EXISTS music_app;
USE music_app;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user'
);

CREATE TABLE artists (
    artist_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    genre VARCHAR(50)
);

CREATE TABLE albums (
    album_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    release_year INT,
    genre VARCHAR(50),
    cover_url VARCHAR(255),
    artist_id INT,
    FOREIGN KEY (artist_id) REFERENCES artists(artist_id) ON DELETE CASCADE
);

CREATE TABLE songs (
    song_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    album_id INT,
    FOREIGN KEY (album_id) REFERENCES albums(album_id) ON DELETE CASCADE
);

CREATE TABLE songs_artists (
    song_id INT,
    artist_id INT,
    PRIMARY KEY (song_id, artist_id),
    FOREIGN KEY (song_id) REFERENCES songs(song_id) ON DELETE CASCADE,
    FOREIGN KEY (artist_id) REFERENCES artists(artist_id) ON DELETE CASCADE
);

CREATE TABLE lyrics (
    lyric_id INT AUTO_INCREMENT PRIMARY KEY,
    text_content TEXT NOT NULL,
    song_id INT NOT NULL,
    part_type ENUM('verse', 'chorus', 'bridge', 'pre-chorus', 'post-chorus', 'intro', 'outro') NOT NULL DEFAULT 'verse',
    position INT NOT NULL,
    FOREIGN KEY (song_id) REFERENCES songs(song_id) ON DELETE CASCADE
);

CREATE TABLE song_views (
    song_view_id INT AUTO_INCREMENT PRIMARY KEY,
    viewed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    song_id INT,
    user_id INT,
    FOREIGN KEY (song_id) REFERENCES songs(song_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

INSERT INTO artists (name, genre) VALUES
('Miley Cyrus', 'Pop'),
('Post Malone', 'Hip Hop/Pop'),
('Taylor Swift', 'Pop/Country');

INSERT INTO albums (title, release_year, genre, artist_id) VALUES
('Endless Summer Vacation', 2023, 'Pop', 1),
('Austin', 2023, 'Pop', 2),
('Midnights', 2022, 'Pop', 3);

INSERT INTO songs (title, album_id) VALUES
('Flowers', 1),
('Chemical', 2),
('Anti-Hero', 3),
('Jaded', 1);

INSERT INTO songs_artists (song_id, artist_id) VALUES
(1, 1), -- Flowers -> Miley
(2, 2), -- Chemical -> Post Malone
(3, 3), -- Anti-Hero -> Taylor
(4, 1); -- Jaded -> Miley

INSERT INTO users (username, email, password_hash, role) VALUES
('test_user', 'test@example.com', 'hash_here', 'user'),
('admin_david', 'admin@musicapp.com', 'hash_here', 'admin');
