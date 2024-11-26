// src/tracks/tracks.routes.ts
import { Router } from 'express';
import { getTracks } from '../tracks/tracks.controller';

const router = Router();
router.get('/albums/:albumId/tracks', getTracks);

export default router;
