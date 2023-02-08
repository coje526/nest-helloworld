module.exports = {
    apps : [{
      name   : 'app',
      script : 'dist/main.js',
      instances: 4,
      exec_mode: 'cluster',
      max_memory_restart: '1G',
      error_file: './logs/app-staging-err.log',
      out_file: './logs/app-staging-out.log',
      log: './logs/app-staging.log',
      env_staging: {
        NODE_ENV: 'staging',
      }
    }]
  }