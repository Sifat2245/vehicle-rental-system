import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { vehicleRoutes } from "../modules/vehicles/vehicles.route";
import { userRoutes } from "../modules/users/users.routes";
import { bookingRoutes } from "../modules/bookings/bookings.routes";

const router = Router()

router.use('/auth', authRoutes)
router.use('/vehicles', vehicleRoutes)
router.use('/users', userRoutes)
router.use('/bookings', bookingRoutes)

export const V1Routes = router;