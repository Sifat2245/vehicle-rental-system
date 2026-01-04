import { Request, Response } from "express";
import { bookingServices } from "./bookings.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const booking = await bookingServices.createBooking(req.body);
    // console.log(req.body);

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};

const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await bookingServices.getBookings();
    return res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: bookings,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};

const updateBooking = async (req: Request, res: Response) => {
  try {
    const bookingId = Number(req.params.bookingId);
    const { status } = req.body;
    const userRole = req.user.role;

    if (!status || !["cancelled", "returned"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be 'cancelled' or 'returned'.",
      });
    }
    if (status === "cancelled" && userRole !== "customer") {
      return res.status(403).json({
        success: false,
        message: "Only customers can cancel a booking",
      });
    }

    if (status === "returned" && userRole !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can mark a booking as returned",
      });
    }

    const updatedBooking = await bookingServices.updateBooking(bookingId, status, userRole);

    let message = "";
    if (status === "cancelled") message = "Booking cancelled successfully";
    if (status === "returned") message = "Booking marked as returned. Vehicle is now available";

    return res.status(200).json({
      success: true,
      message,
      data: updatedBooking,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};

export const bookingController = {
  createBooking,
  getBookings,
  updateBooking,
};
