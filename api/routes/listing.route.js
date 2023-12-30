import express from 'express';
import { createListing } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyToken.js';
const router = express.Router();

router.post("/createListing", verifyToken , createListing)

export default router;