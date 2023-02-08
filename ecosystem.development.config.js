module.exports = {
    apps : [{
      name   : 'app',
      script : 'dist/main.js',
      instances: 4,
      exec_mode: 'cluster',
      max_memory_restart: '1G',
      error_file: './logs/app-development-err.log',
      out_file: './logs/app-development-out.log',
      log: './logs/app-development.log',
      env_development: {
        NODE_ENV: 'development'
      },
    }]
  }