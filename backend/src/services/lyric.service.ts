import pool from '../mysql_db.js'
import type { Lyric } from '../controllers/lyric.controller.js'

export const getLyricById = async (id: number) => {
    const [rows] = await pool.query(
        'SELECT * FROM lyrics WHERE song_id = ? ORDER BY position ASC',
        [id]
    )
    return rows
}

export const createLyric = async (lyricData: Omit<Lyric, 'lyric_id'>) => {
  const { song_id, text_content, part_type, position } = lyricData

  const [result] = await pool.query(
    'INSERT INTO lyrics (song_id, text_content, part_type, position) VALUES (?, ?, ?, ?)', [song_id, text_content, part_type, position]
  )
  return result
}

export const updateLyric = async (id: number, updateData: Partial<Lyric>) => {
  const { text_content, part_type, position } = updateData

  const [result] = await pool.query(
    'UPDATE lyrics SET text_content = ?, part_type = ?, position = ? WHERE lyric_id = ?', [text_content, part_type, position, id]
  )
  return result
}

export const deleteLyric = async (id: number) => {
  const [result] = await pool.query('DELETE FROM lyrics WHERE lyric_id = ?', [id])
  return result
}
