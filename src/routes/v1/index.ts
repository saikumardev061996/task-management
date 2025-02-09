import * as APIPaths from '@constants/api_path_constants';
import { Router } from 'express';
import DummyRoutes from './dummy';
import TaskRoutes from "./task"


const router = Router();

router.use(APIPaths.ROUTER_DUMMY, DummyRoutes);
router.use('', TaskRoutes);

export default router;