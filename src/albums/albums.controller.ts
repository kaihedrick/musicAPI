import { Request, RequestHandler, Response } from 'express';
import { Album } from './albums.model';
import { Track } from './../tracks/tracks.model';
import * as AlbumDao from './albums.dao';
import * as TracksDao from '../tracks/tracks.dao';
import { OkPacket } from 'mysql';

export const readAlbums: RequestHandler = async (req: Request, res: Response) => {
    try{
        let albums;
        let albumId = parseInt(req.query.albumId as string);

        console.log('albumId', albumId);
        if(Number.isNaN(albumId)){
            albums = await AlbumDao.readAlbums();
        } else {
            albums = await AlbumDao.readAlbumsById(albumId)
        }
        await readTracks(albums, res);

        res.status(200).json(
            albums
        );
    } catch(error){
        console.error('[albums.controller][readAlbums][Error] ',error);
        res.status(500).json({
            message: 'There was an error when fetching albums'
        });
    }
};
export const readAlbumsByArtist: RequestHandler = async (req: Request, res: Response) => {
    try{
        const albums = await AlbumDao.readAlbumsByArtist(req.params.artist);

        await readTracks(albums, res);

        res.status(200).json(
            albums
        );
    } catch(error){
        console.error('[albums.controller][readAlbums][Error] ',error);
        res.status(500).json({
            message: 'There was an error when fetching albums'
        });
    }
};
export const readAlbumsByArtistSearch: RequestHandler = async (req: Request, res: Response) => {
    try{
        console.log('search', req.params.search);
        const albums = await AlbumDao.readAlbumsByArtistSearch('%' + req.params.search + '%');

        await readTracks(albums, res);

        res.status(200).json(
            albums
        );
    } catch(error){
        console.error('[albums.controller][readAlbums][Error] ',error);
        res.status(500).json({
            message: 'There was an error when fetching albums'
        });
    }
};
export const readAlbumsByDescriptionSearch: RequestHandler = async (req: Request, res: Response) => {
    try{
        console.log('search', req.params.search);
        const albums = await AlbumDao.readAlbumsByDescriptionSearch('%' + req.params.search + '%');

        await readTracks(albums, res);

        res.status(200).json(
            albums
        );
    } catch(error){
        console.error('[albums.controller][readAlbums][Error] ',error);
        res.status(500).json({
            message: 'There was an error when fetching albums'
        });
    }
};
export const createAlbum: RequestHandler = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await AlbumDao.createAlbum(req.body);
        console.log('req.body', req.body);
        console.log('album', okPacket);

        req.body.tracks.forEach(async (track: Track, index: number) => {
            try{
                await TracksDao.createTrack(track, index, okPacket.insertId);
        } catch(error){
            console.error('albums.controller][createAlbumTracks][Error] ', error);
            res.status(500).json({
                message: 'There was an error when writing album tracks'
            });
        }
        });
        res.status(200).json(okPacket); // Respond with the album creation result
    } catch (error) {
        console.error('[albums.controller][createAlbum][Error] ', error);

        // Type assertion to handle the error
        res.status(500).json({
            message: 'There was an error when writing albums'
        });
    }
};


export const updateAlbum: RequestHandler = async (req: Request, res: Response) => {
    try{
        const okPacket: OkPacket = await AlbumDao.updateAlbum(req.body);
        console.log('req.body', req.body);
        console.log('album', okPacket);

        req.body.tracks.forEach(async(track: Track, index: number) =>{
            try{
                await TracksDao.updateTrack(track);
            } catch(error){
                console.error('[albums.controller][updateAlbum][Error] ', error);
                res.status(500).json({
                    message: 'There was an error when writing album tracks'
                });
            }
        });
        res.status(200).json(
            okPacket
        );
    }catch(error){
        console.error('[albums.controller][updateAlbum][Error] ',error);
        res.status(500).json({
            message: 'There was an error when updating albums'
        });
    }
};
async function readTracks(albums: Album[], res: Response<any, Record<string, any>>){
    for(let i=0; i< albums.length; i++){
        try{
            const tracks = await TracksDao.readTracks(albums[i].albumId);
            albums[i].tracks = tracks;
        } catch(error){
            console.error('[albums.controller][readTracks][Error] ', error);
            res.status(500).json({
                message: 'There was an error when fetching album tracks'
            });
        }
    }
}
//explain for activity 1
export const deleteAlbum: RequestHandler = async (req: Request, res: Response) => {
    try {
        // Parse albumId from request parameters
        let albumId = parseInt(req.params.albumId as string);
        console.log('albumId', albumId);

        // Check if albumId is a valid number
        if (!Number.isNaN(albumId)) {
            // Call DAO to delete the album
            const response = await AlbumDao.deleteAlbum(albumId);
            // Respond with the result
            res.status(200).json(response);
        } else {
            // Throw error for invalid albumId
            throw new Error("Integer expected for albumId");
        } 
    } catch (error) {
        // Log error and respond with a server error
        console.error('[albums.controller][deleteAlbum][Error]', error);
        res.status(500).json({
            message: 'There was an error when deleting the album'
        });
    }
};


export const readAlbumsById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const albumId = parseInt(req.params.albumId as string);
        if (Number.isNaN(albumId)) {
            return res.status(400).json({ message: 'Invalid album ID' });
        }

        const album = await AlbumDao.readAlbumsById(albumId);
        if (album.length === 0) {
            return res.status(404).json({ message: 'Album not found' });
        }

        await readTracks(album, res);
        res.status(200).json(album);
    } catch (error) {
        console.error('[albums.controller][readAlbumsById][Error]', error);
        res.status(500).json({ message: 'There was an error when fetching album' });
    }
};
export const readTracksByAlbumId = async (req: Request, res: Response) => {
    const albumId = parseInt(req.params.albumId, 10);

    try {
        // Fetch the album first to verify it exists (optional)
        const album = await AlbumDao.readAlbumsById(albumId);
        if (album.length === 0) {
            return res.status(404).json({ message: 'Album not found' });
        }

        // Fetch tracks associated with the album
        const tracks = await TracksDao.readTracks(albumId);
        res.status(200).json(tracks);
    } catch (error) {
        console.error('[albums.controller][readTracksByAlbumId][Error]', error);
        res.status(500).json({ message: 'Error retrieving tracks for the album' });
    }
};

const ALBUMS = [
    { id: 1, name: 'Please Please Me (1963)', band: 'The Beatles'},
    { id: 2, name: 'With The Beatles (1963)', band: 'The Beatles' },
    { id: 3, name: 'A Hard Day\'s Night (1964)anchester United', band: 'The Beatles' },
    { id: 4, name: 'Beatles For Sale (1964)', band: 'The Beatles' },
    { id: 5, name: 'Help! (1965)', band: 'The Beatles' },
    { id: 6, name: 'Rubber Soul (1965)', band: 'The Beatles' },
    { id: 7, name: 'Sgt Pepper\'s Lonely Heart Club Band (1967)', band: 'The Beatles' },
    { id: 8, name: 'Most of these records are not very good', band: 'The Beatles' },
];
export const getAlbums = (req: Request, res: Response) => {
    res.send(ALBUMS);
}


