import { Router } from 'express';
import * as AlbumsController from './albums.controller';

const router = Router();

router.
    route('/albums').
    get(AlbumsController.readAlbums);

router.
    route('/albums/:artist').
    get(AlbumsController.readAlbumsByArtist);
router.
    route('/albums/search/artist/:search').
    get(AlbumsController.readAlbumsByArtistSearch);

router.
    route('/albums/search/description/:search').
    get(AlbumsController.readAlbumsByDescriptionSearch);

router.
    route('/albums').
    post(AlbumsController.createAlbum);

router.
    route('/albums').
    put(AlbumsController.updateAlbum);
        
router.
    route('/albums/:albumId').
    delete(AlbumsController.deleteAlbum);
router.
    route('/albums/:albumId').
    get(AlbumsController.readAlbumsById); // Make sure to add this line for fetching by ID
// New route for fetching tracks within an album
router.route('/albums/:albumId/tracks').get(AlbumsController.readTracksByAlbumId);

    export default router;