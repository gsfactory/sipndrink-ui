import log from 'loglevel';

// Set log level based on environment
log.setLevel(process.env.NODE_ENV === 'production' ? 'warn' : 'debug');

export default log;
