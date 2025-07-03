// config/logger.ts
import log4js from 'log4js';

log4js.configure({
  appenders: {
    console: { type: 'console' },
    file: {
      type: 'file',
      filename: 'logs/server.log',
      maxLogSize: 100 * 1024 * 1024,
      backups: 3,
      compress: true
    },
    access: {
      type: 'file',
      filename: 'logs/access.log',
      maxLogSize: 100 * 1024 * 1024,
      backups: 3,
      compress: true
    }
  },
  categories: {
    default: { appenders: ['console', 'file'], level: 'debug' },
    access: { appenders: ['console', 'access'], level: 'info' }
  }
});

export const logger = log4js.getLogger();
export const accessLogger = log4js.getLogger('access');
