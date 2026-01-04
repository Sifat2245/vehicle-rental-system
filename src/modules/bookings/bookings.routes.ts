import { Router } from "express";
import { bookingController } from "./bookings.controller";
import role from "../../middlewares/role";
import auth from "../../middlewares/auth";

const router = Router()

router.post('/', auth, bookingController.createBooking)
router.get('/', role("admin"), bookingController.getBookings)
router.put('/:bookingId', auth, bookingController.updateBooking)

export const bookingRoutes = router;