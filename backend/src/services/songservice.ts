import pool from '../mysql_db.js';

// kolla på denna verkar inte som att den uppdaterar vilka låtar som är mest populära, kommer nog behöva göra en liknande till denna för låt hemsidan utan song_view dock då den inte ska ranka låtarna utan endast visa dem samt byta namn på denna till typ getAllRankedSongs.
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

export const updateSong = async (id: number, title: string, album_id: number) => {
    const [result] = await pool.query('UPDATE songs SET title = ?, album_id = ? WHERE song_id = ?', [title, album_id, id]);
    return result;
};

export const deleteSong = async (id: number) => {
    const [result] = await pool.query('DELETE FROM songs WHERE song_id = ?', [id]);
    return result;
};
