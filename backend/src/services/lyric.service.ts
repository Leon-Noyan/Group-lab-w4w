import pool from '../mysql_db.js'
import type { Lyric } from '../controllers/lyric.controller.js'
import type { RowDataPacket } from 'mysql2'

interface DailyLyric extends RowDataPacket {
    text_content: string;
    title: string;
    name: string
}
// returns a lyric by id
export const getLyricById = async (id: number) => {
    const [rows] = await pool.query(
        `SELECT lyrics.*,songs.title FROM lyrics JOIN songs ON lyrics.song_id = songs.song_id WHERE lyrics.song_id = ?`,
        [id]
    )
    return rows
}

// returns a random lyric each day, used by daily lyric card
export const getRandomLyric = async (): Promise<DailyLyric | undefined> => {
  const date = new Date()
  // responsible picking a random lyric each day
  const dailyDate = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()

    const [rows] = await pool.query<DailyLyric[]>(
        `SELECT lyrics.text_content, songs.title AS title, artists.name AS name
        FROM lyrics
        JOIN songs ON lyrics.song_id = songs.song_id JOIN songs_artists sa ON songs.song_id = sa.song_id
        JOIN artists ON sa.artist_id = artists.artist_id
        ORDER BY RAND(${dailyDate}) LIMIT 1`
    )
    return rows[0]
}
// creates a lyric
export const createLyric = async (lyricData: Omit<Lyric, 'lyric_id'>) => {
  const { song_id, text_content, part_type, position } = lyricData

  const [result] = await pool.query(
    'INSERT INTO lyrics (song_id, text_content, part_type, position) VALUES (?, ?, ?, ?)', [song_id, text_content, part_type, position]
  )
  return result
}
// updates an existing lyric
export const updateLyric = async (id: number, updateData: Partial<Lyric>) => {
  const { text_content, part_type, position } = updateData

  const [result] = await pool.query(
    'UPDATE lyrics SET text_content = ?, part_type = ?, position = ? WHERE lyric_id = ?', [text_content, part_type, position, id]
  )
  return result
}
// deletes an existing lyric
export const deleteLyric = async (id: number) => {
  const [result] = await pool.query('DELETE FROM lyrics WHERE lyric_id = ?', [id])
  return result
}
