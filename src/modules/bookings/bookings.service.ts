import { pool } from "../../config/db";

const createBooking = async (payload: {
  customer_id: number;
  vehicle_id: number;
  rent_start_date: string;
  rent_end_date: string;
}) => {
  try {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

    // console.log(customer_id, "customer id from services");

    const vehicleResponse = await pool.query(
      `SELECT id, vehicle_name, daily_rent_price, availability_status FROM vehicles WHERE id = $1`,
      [vehicle_id]
    );

    if (vehicleResponse.rows.length === 0) throw new Error("Vehicle not found");

    const vehicle = vehicleResponse.rows[0];

    if (vehicle.availability_status === "booked")
      throw new Error("Vehicle is already booked");

    const start = new Date(rent_start_date);
    const end = new Date(rent_end_date);

    const days = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    const totalPrice = days * vehicle.daily_rent_price;

    const bookingResponse = await pool.query(
      `INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES ($1, $2, $3, $4, $5, 'active') RETURNING *`,
      [customer_id, vehicle_id, rent_start_date, rent_end_date, totalPrice]
    );

    await pool.query(
      `
            UPDATE vehicles
            SET availability_status = 'booked' WHERE id = $1
            `,
      [vehicle_id]
    );

    const booking = bookingResponse.rows[0];

    return {
      id: booking.id,
      customer_id: booking.customer_id,
      vehicle_id: booking.vehicle_id,
      rent_start_date: booking.rent_start_date,
      rent_end_date: booking.rent_end_date,
      total_price: booking.total_price,
      status: booking.status,
      vehicle: {
        vehicle_name: vehicle.vehicle_name,
        daily_rent_price: vehicle.daily_rent_price,
      },
    };
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const getBookings = async () => {
  const result = await pool.query("SELECT * FROM bookings");
  return result.rows;
};

const updateBooking = async (
  bookingId: number,
  status: "cancelled" | "returned",
  role: "customer" | "admin"
) => {
  try {

    const { rows } = await pool.query("SELECT * FROM bookings WHERE id=$1", [bookingId]);
    if (!rows.length) throw new Error("Booking not found");

    const booking = rows[0];

    if (status === "cancelled") {
      const today = new Date();
      const rentStart = new Date(booking.rent_start_date);
      if (today >= rentStart) {
        throw new Error("Cannot cancel a booking that has already started");
      }
    }

    const { rows: updatedRows } = await pool.query(
      "UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *",
      [status, bookingId]
    );

    const updatedBooking = updatedRows[0];

    let vehicleData = undefined;
    if (status === "returned") {
      await pool.query(
        "UPDATE vehicles SET availability_status='available' WHERE id=$1",
        [booking.vehicle_id]
      );

      const { rows: vehicleRows } = await pool.query(
        "SELECT availability_status FROM vehicles WHERE id=$1",
        [booking.vehicle_id]
      );

      vehicleData = vehicleRows[0];
    }
    return {
      id: updatedBooking.id,
      customer_id: updatedBooking.customer_id,
      vehicle_id: updatedBooking.vehicle_id,
      rent_start_date: updatedBooking.rent_start_date,
      rent_end_date: updatedBooking.rent_end_date,
      total_price: updatedBooking.total_price,
      status: updatedBooking.status,
      ...(vehicleData && { vehicle: vehicleData }),
    };
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const bookingServices = {
  createBooking,
  getBookings,
  updateBooking,
};
