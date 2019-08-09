import express from 'express';
import {generateContacts, readContacts} from '../controllers';
const router = express.Router();

/* GET home page. */
router.get('/', readContacts);
router.get('/generate', generateContacts );
router.get('/generate/:sort', readContacts);

export default router;
