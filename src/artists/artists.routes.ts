import { Router } from "express";
import * as ArtistsController from './artists.controller';

const router = Router();
router
    .route('/artists')
    .get(ArtistsController.readArtists);

export default router;