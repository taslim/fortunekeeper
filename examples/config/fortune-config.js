/**
 * Fortune Configuration Example
 * This file demonstrates how to properly configure the fortune service
 * while keeping sensitive information secure.
 */

const getFortuneConfig = () => ({
  // Use environment variables for sensitive values
  encryptionKey: process.env.FORTUNE_ENCRYPTION_KEY,
  
  // Public configuration
  maxDailyFortunes: 3,
  cacheTimeout: 3600,
  
  // Feature flags
  features: {
    premiumFortunes: process.env.NEXT_PUBLIC_PREMIUM_FORTUNES === 'true',
    customFortunes: process.env.NEXT_PUBLIC_CUSTOM_FORTUNES === 'true'
  },
  
  // Rate limiting configuration
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  }
});

export const validateConfig = (config) => {
  if (!config.encryptionKey) {
    throw new Error('Fortune encryption key is required');
  }
  // Add more validation as needed
};

export default getFortuneConfig; 