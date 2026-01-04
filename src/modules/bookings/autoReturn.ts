import cron from "node-cron";
import { pool } from "../../config/db";

cron.schedule("0 0 * * *", async () => {
  try {
    const { rows: expiredBookings } = await pool.query(
      `SELECT id, vehicle_id FROM bookings 
       WHERE rent_end_date < NOW() AND status='active'`
    );

    if (expiredBookings.length === 0) {
      await pool.query("COMMIT");
      return;
    }

    for (const booking of expiredBookings) {
      await pool.query(
        `UPDATE bookings SET status='returned' WHERE id=$1`,
        [booking.id]
      );

      await pool.query(
        `UPDATE vehicles SET availability_status='available' WHERE id=$1`,
        [booking.vehicle_id]
      );
    }

    await pool.query("COMMIT");
  } catch (err) {
    await pool.query("ROLLBACK");
  }
});
