import { Router } from "express";
import { vehicleController } from "./vehicles.controller";
import role from "../../middlewares/role";

const router = Router()

router.post('/', role("admin"), vehicleController.postVehicle);
router.get('/', vehicleController.getVehicles)
router.get('/:id', vehicleController.getSingleVehicle)
router.put('/:id', role("admin"), vehicleController.updateVehicle)

export const vehicleRoutes = router;