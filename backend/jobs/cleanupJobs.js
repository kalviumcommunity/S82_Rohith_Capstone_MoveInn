const Booking = require('../models/bookingSchema');

const runExpiredBookingJob = async () => {
  try {
    const cutoffTime = new Date(Date.now() - 15 * 60 * 1000); // 15 minutes ago
    const result = await Booking.deleteMany({
      isConfirmed: false,
      createdAt: { $lt: cutoffTime },
    });

    console.log(`[CRON] Deleted ${result.deletedCount} expired bookings`);
  } catch (error) {
    console.error('[CRON] Error clearing expired bookings:', error);
  }
};

module.exports = { runExpiredBookingJob };
