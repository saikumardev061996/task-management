import { Router } from 'express';
import * as controller from '@controller/dummy';

const router = Router();

router.route('/')
    .get(controller.getDummy);


export default router;