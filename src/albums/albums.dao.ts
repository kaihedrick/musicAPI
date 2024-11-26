import { OkPacket } from "mysql";
import { execute } from "../services/mysql.connector";
import { Album } from "./albums.model";
import { albumQueries } from './albums.queries';

export const readAlbums = async() => { 
    return execute <Album[]>(albumQueries.readAlbums, []);
};
export const readAlbumsByArtist = async (artistName : string) => {
    return execute<Album[]>(albumQueries.readAlbumsByArtist, [artistName]);
};
export const readAlbumsByArtistSearch = async (search : string) => {
    console.log('search param', search);
    return execute<Album[]>(albumQueries.readAlbumsByArtistSearch, [search]);
};
export const readAlbumsByDescriptionSearch = async (search : string) => {
    console.log('search param', search);
    return execute<Album[]>(albumQueries.readAlbumsByDescriptionSearch, [search]);
};
export const readAlbumsById = async (albumId : number) => {
    return execute<Album[]>(albumQueries.readAlbumsByAlbumId, [albumId]);
};
export const createAlbum = async (album : Album) => {
    return execute<OkPacket>(albumQueries.createAlbum,
        [album.title, album.artist, album.description, album.year, album.image]);
};
export const updateAlbum = async (album : Album) => {
    return execute<OkPacket>(albumQueries.updateAlbum,
        [album.title, album.artist, album.year, album.image, album.description, album.albumId]);
};
export const deleteAlbum = async (albumId: number) => {
    console.log('Attempting to delete album with ID:', albumId);
    const result = await execute<OkPacket>(albumQueries.deleteAlbum, [albumId]);
    console.log('Delete result:', result);
    return result.affectedRows > 0; // Check if any rows were affected
};
