const cron = require('node-cron');
const { runExpiredBookingJob } = require('../jobs/cleanupJobs');

module.exports = () => {

  cron.schedule('*/10 * * * *', runExpiredBookingJob);
};
