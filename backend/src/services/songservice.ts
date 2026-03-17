import pool from '../mysql_db.js';

export const getAllSongs = async () => {
    const [rows] = await pool.query('SELECT * FROM songs');
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