import { Router } from "express";
import { vehicleController } from "./vehicles.controller";
import role from "../../middlewares/role";

const router = Router()

router.post('/', role("admin"), vehicleController.postVehicle);

export const vehicleRoutes = router;