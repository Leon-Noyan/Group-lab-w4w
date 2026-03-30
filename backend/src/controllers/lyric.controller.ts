import type { Request, Response } from 'express'
import * as lyricservice from '../services/lyric.service.js'
import type { ResultSetHeader } from 'mysql2'

// lyric object
export interface Lyric {
    lyric_id: number
    text_content: string
    song_id: number
    part_type:
        | 'verse'
        | 'chorus'
        | 'bridge'
        | 'pre-chorus'
        | 'post-chorus'
        | 'intro'
        | 'outro'
    position: number
}

export const getLyricsBySong = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const lyrics = (await lyricservice.getLyricById(id)) as Lyric[]

        if (!lyrics || lyrics.length === 0) {
            return res.status(404).json({ message: 'Could not find lyrics' })
        }
        res.status(200).json(lyrics)
    } catch (error) {
        console.log('error:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const getRandomLyric = async (req: Request, res: Response) => {

  try {
    const lyric = await lyricservice.getRandomLyric()
    if (!lyric) {
      return res.status(404).json({ message: 'Could not find lyrics' })
    }
    return res.status(200).json(lyric)
  } catch (error) {
    console.log('error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const postLyric = async (req: Request, res: Response) => {
    try {
        const newLyric: Omit<Lyric, 'lyric_id'> = req.body

        if (
            !newLyric.song_id ||
            !newLyric.text_content ||
            !newLyric.part_type ||
            !newLyric.position
        ) {
            return res.status(400).json({ message: 'Missing required fields' })
        }
        const result = await lyricservice.createLyric(newLyric)
        const header = result as ResultSetHeader

        res.status(201).json({
            message: 'Lyric created successfully',
            insertId: header.insertId
        })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const updateLyric = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const data: Partial<Lyric> = req.body

        const result = await lyricservice.updateLyric(id, data)
        res.status(200).json({ message: 'Lyric updated successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const deleteLyric = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const result = await lyricservice.deleteLyric(id)
        const header = result as ResultSetHeader

        if (header.affectedRows === 0) {
            return res.status(404).json({
                message: 'Could not find lyric'
            })
        }
        res.status(200).json({ message: 'Lyric deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}
