import express from 'express';
import { generateContacts } from '../controllers';
const router = express.Router();

/* GET home page. */
router.get('/generate', generateContacts );

export default router;
