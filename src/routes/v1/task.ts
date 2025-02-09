import { Router } from 'express';
import * as controller from '@controller/task';
import * as APIPaths from '@constants/api_path_constants';
const router = Router();

router.route(APIPaths.TASKS)
    .post(controller.saveTask)
    .get(controller.getTasks)

router.route(APIPaths.UPDATE_TASK)
    .put(controller.updateTask)
    .delete(controller.deleteTask)

router.route(APIPaths.UPDATE_TASK_STATUS)
    .put(controller.updateTaskStatus)
router.route(APIPaths.SEARCH_TASK)
    .get(controller.getTasksSearch)

export default router;