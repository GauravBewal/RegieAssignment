import * as fs from 'fs';
import * as path from 'path';

enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
}

const logFilePath = path.join(__dirname, '../../logs/test.log');

// Ensure the logs directory exists
const logsDir = path.dirname(logFilePath);
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

function log(level: LogLevel, message: string) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] [${level}] ${message}\n`;

  fs.appendFileSync(logFilePath, logEntry);
  // Optionally log to console as well
  console.log(logEntry.trim());
}

export const logger = {
  info: (message: string) => log(LogLevel.INFO, message),
  warn: (message: string) => log(LogLevel.WARN, message),
  error: (message: string) => log(LogLevel.ERROR, message),
  debug: (message: string) => log(LogLevel.DEBUG, message),
};