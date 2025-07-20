// Console log'ları filtreleme
class Logger {
  constructor() {
    if (process.env.NODE_ENV === 'development') {
      this.setupFiltering();
    }
  }

  setupFiltering() {
    const originalError = console.error;
    const originalWarn = console.warn;

    // Error filtreleme
    console.error = (...args) => {
      const message = args[0]?.toString() || '';
      
      // Bu hataları gizle
      const ignoredErrors = [
        'ERR_NAME_NOT_RESOLVED',
        'Failed to load resource',
        'net::ERR_FAILED',
        'Manifest',
        'chrome-extension',
        'web_accessible_resources'
      ];
      
      if (!ignoredErrors.some(error => message.includes(error))) {
        originalError.apply(console, args);
      }
    };

    // Warning filtreleme
    console.warn = (...args) => {
      const message = args[0]?.toString() || '';
      
      if (!message.includes('DevTools') && !message.includes('extension')) {
        originalWarn.apply(console, args);
      }
    };
  }

  // Production'da sadece önemli log'lar
  info(message, data = '') {
    if (process.env.NODE_ENV === 'development') {
      console.log(`ℹ️ ${message}`, data);
    }
  }

  warn(message, data = '') {
    console.warn(`⚠️ ${message}`, data);
  }

  success(message, data = null) {
    console.log(`✅ ${message}`, data || '');
  }

  error(message, error = '') {
    console.error(`❌ ${message}`, error);
  }

  wallet(message, data = '') {
    console.log(`🦊 ${message}`, data);
  }

  token(message, data = '') {
    console.log(`🪙 ${message}`, data);
  }
}

export const logger = new Logger(); 