import { Router } from 'express';
import * as controller from '@controller/task';

const router = Router();

router.route('/tasks')
    .post(controller.saveTask)
    .get(controller.getTasks)


export default router;