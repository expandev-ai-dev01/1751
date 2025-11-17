import { Router } from 'express';
import * as vehicleController from '@/api/v1/external/vehicle/controller';
import * as vehicleDetailController from '@/api/v1/external/vehicle/detail/controller';
import * as contactController from '@/api/v1/external/contact/controller';

const router = Router();

router.get('/vehicle', vehicleController.listHandler);
router.get('/vehicle/filter-options', vehicleController.filterOptionsHandler);
router.get('/vehicle/modelos-by-marcas', vehicleController.modelosByMarcasHandler);
router.get('/vehicle/:id', vehicleDetailController.getHandler);

router.post('/contact', contactController.postHandler);

export default router;
