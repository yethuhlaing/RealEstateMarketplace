import express from 'express';
import { createListing, deleteListing } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyToken.js';
const router = express.Router();

router.post("/createListing", verifyToken , createListing)
router.delete("/delete/:id", verifyToken, deleteListing )


export default router;