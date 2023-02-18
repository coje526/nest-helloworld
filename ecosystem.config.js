module.exports = {
    apps : [{
      name   : 'app',
      script : 'dist/main.js',
      instances: 1,
      exec_mode: 'cluster',
      max_memory_restart: '1G',
      error_file: './logs/app-err.log',
      out_file: './logs/app-out.log',
      env_development: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      env_staging: {
        NODE_ENV: 'staging',
      }
    }]
  }