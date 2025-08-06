import cron from 'node-cron';
import { downgradeExpiredSubscriptions } from '../services/users.service';

// Schedule to run every minute
export const startSubscriptionDowngradeJob = () => {
  cron.schedule('* * * * *', async () => {
    try {
      await downgradeExpiredSubscriptions();
    } catch (error) {
      console.error('❌ Error downgrading subscriptions:', error);
    }
  });
};
