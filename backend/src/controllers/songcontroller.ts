import type { Request, Response } from 'express';
import * as songservice from '../services/songservice.js';

export const getSongs = async (req: Request, res: Response) => {
    try {
        const songs = await songservice.getAllSongs();
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ message: 'ett fel uppstod', error });
    }
};

export const getSearchedSongs = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string

    if (!search || search.length === 0) {
      return res.status(400).json({ message: 'Missing search query' })
    }

    const songs = await songservice.getSearchedSongs(search)
    res.status(200).json(songs)
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error })
  }
}

export const createSong = async (req: Request, res: Response) => {
    try {
        const { title, album_id } = req.body;
        const result = await songservice.createSong(title, album_id);
        res.status(201).json({ message: 'låten har skapats!', result });
    } catch (error) {
        res.status(500).json({ message: 'det gick inte att skapa låten', error });
    }
};

export const updateSong = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { title, album_id } = req.body;
        const result = await songservice.updateSong(id, title, album_id);
        res.status(200).json({ message: 'Låten har uppdaterats!', result });
    } catch (error) {
        res.status(500).json({ message: 'Ett fel uppstod vid uppdatering', error });
    }
};

export const deleteSong = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const result = await songservice.deleteSong(id);
        res.status(200).json({ message: 'Låten har raderats!', result });
    } catch (error) {
        res.status(500).json({ message: 'Ett fel uppstod vid radering', error });
    }
};
