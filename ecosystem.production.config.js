module.exports = {
    apps : [{
      name   : 'app',
      script : 'dist/main.js',
      instances: 4,
      exec_mode: 'cluster',
      max_memory_restart: '1G',
      error_file: './logs/app-production-err.log',
      out_file: './logs/app-production-out.log',
      log: './logs/app-production.log',
      env_production: {
        NODE_ENV: 'production'
      },
    }]
  }