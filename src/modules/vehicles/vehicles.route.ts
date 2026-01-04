import { Router } from "express";
import { vehicleController } from "./vehicles.controller";
import role from "../../middlewares/role";

const router = Router()

router.post('/', role("admin"), vehicleController.postVehicle);
router.get('/', vehicleController.getVehicles)
router.get('/:vehicleId', vehicleController.getSingleVehicle)
router.put('/:vehicleId', role("admin"), vehicleController.updateVehicle)
router.delete('/:vehicleId', role("admin"), vehicleController.deleteVehicle)

export const vehicleRoutes = router;