import {execute } from '../services/mysql.connector';
import { Track } from './tracks.model';
import { trackQueries } from './tracks.queries';

export const readTracks = async (albumId: number) => { 
    return execute<Track[]>(trackQueries.readTracks, [albumId]);
};
export const createTrack = async(track: Track, index: number, albumId: number) => {
    return execute<Track[]>(trackQueries.createTrack, 
        [albumId, track.title, track.number, track.video, track.lyrics, track.trackId]);
};
export const updateTrack = async (track: Track) =>{
return execute<Track[]>(trackQueries.updateTrack,
[track.title, track.number, track.video, track.lyrics, track.trackId]);
};
