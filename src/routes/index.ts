import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { vehicleRoutes } from "../modules/vehicles/vehicles.route";

const router = Router()

router.use('/auth', authRoutes)
router.use('/vehicles', vehicleRoutes)

export const V1Routes = router;