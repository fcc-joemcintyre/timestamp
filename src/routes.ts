import { Express } from 'express';
import { timestamp } from './listener.js';

/**
 * Initialize routes.
 * @param app Express instance
 */
export function init (app: Express) {
  app.get ('/api/date', timestamp);
}
