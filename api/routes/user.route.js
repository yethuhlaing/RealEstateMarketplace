import express from 'express';
import { test, deleteUser, updateUser, getUserListing } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.get("/test", test)
router.post('/update/:id', verifyToken, updateUser )
router.delete('/delete/:id', verifyToken, deleteUser )
router.get("/listings/:id", verifyToken, getUserListing )
export default router;