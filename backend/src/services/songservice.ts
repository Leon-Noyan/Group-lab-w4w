import pool from '../mysql_db.js';

export const getAllSongs = async () => {
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

export const createSong = async (title: string, album_id: number) => {
    const [result] = await pool.query('INSERT INTO songs (title, album_id) VALUES (?, ?)', [title, album_id]);
    return result;
};

export const updateSong = async (id: number, title: string, album_id: number) => {
    const [result] = await pool.query('UPDATE songs SET title = ?, album_id = ? WHERE song_id = ?', [title, album_id, id]);
    return result;
};

export const deleteSong = async (id: number) => {
    const [result] = await pool.query('DELETE FROM songs WHERE song_id = ?', [id]);
    return result;
};
