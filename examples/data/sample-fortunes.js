import { encryptFortune } from '../../utils/fortune';

// Sample fortunes for demonstration purposes
const sampleFortunes = [
  "The stars align for great code today",
  "Your next commit will be your best yet",
  "A helpful code review is in your future"
];

// Example of how fortunes are encrypted in production
export const fortunes = sampleFortunes.map(fortune => encryptFortune(fortune));

// Documentation for implementing production fortunes
/**
 * Production Implementation Notes:
 * 1. Store actual fortune data in a secure database
 * 2. Use environment variables for encryption keys
 * 3. Implement rate limiting for fortune fetching
 * 4. Add access logging for security monitoring
 */ 