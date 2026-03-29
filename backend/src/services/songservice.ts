import pool from '../mysql_db.js';

// returns all songs ranked used by popular songs list
export const getAllSongsRanked = async () => {
    const [rows] = await pool.query(`SELECT s.song_id, s.title, GROUP_CONCAT(DISTINCT a.name SEPARATOR ', ') AS artist,
      COUNT(DISTINCT sv.song_view_id) AS views
      FROM songs s
      LEFT JOIN songs_artists sa ON s.song_id = sa.song_id
      LEFT JOIN artists a ON sa.artist_id = a.artist_id
      LEFT JOIN song_views sv ON s.song_id = sv.song_id
      GROUP BY s.song_id, s.title
      ORDER BY views DESC`)
    return rows;
};

// returns all songs used by song page
export const getAllSongs = async () => {
    const [rows] = await pool.query(`SELECT s.song_id, s.title, GROUP_CONCAT(DISTINCT a.name SEPARATOR ', ') AS artist, alb.genre, alb.title AS album_title
      FROM songs s
      LEFT JOIN songs_artists sa ON s.song_id = sa.song_id
      LEFT JOIN artists a ON sa.artist_id = a.artist_id
      LEFT JOIN albums alb ON s.album_id = alb.album_id
      GROUP BY s.song_id, s.title, alb.genre, alb.title`)
    return rows;
};

// returns all songs that match the search query, used by search-bar
export const getSearchedSongs = async (search: string) => {
  const searchVal = `%${search}%`
    const [rows] = await pool.query(`
      SELECT s.song_id, s.title, GROUP_CONCAT(DISTINCT a.name ORDER BY a.name SEPARATOR ', ') AS artist
      FROM songs s
      LEFT JOIN songs_artists sa ON s.song_id = sa.song_id
      LEFT JOIN artists a ON sa.artist_id = a.artist_id
      LEFT JOIN albums alb ON s.album_id = alb.album_id
      WHERE s.title LIKE ? OR a.name LIKE ?
      GROUP BY s.song_id, s.title
      LIMIT 5
      `, [searchVal, searchVal])
    return rows;
};

export const createSong = async (title: string, album_id: number) => {
    const [result] = await pool.query('INSERT INTO songs (title, album_id) VALUES (?, ?)', [title, album_id]);
    return result;
};

export const createSongView = async (song_id: number, user_id: number) => {
  const [result] = await pool.query('INSERT INTO song_views (song_id, user_id) VALUES (?, ?)', [song_id, user_id])
  return result
}

export const updateSong = async (id: number, title: string, album_id: number) => {
    const [result] = await pool.query('UPDATE songs SET title = ?, album_id = ? WHERE song_id = ?', [title, album_id, id]);
    return result;
};

export const deleteSong = async (id: number) => {
    const [result] = await pool.query('DELETE FROM songs WHERE song_id = ?', [id]);
    return result;
};
