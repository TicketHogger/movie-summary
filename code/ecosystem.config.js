module.exports = {
  apps : [
    {
      name: 'movie-summary',
      script: './server/index.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: true,
      max_memory_restart: '1G',
      env: {
        "NODE_ENV": 'production',
        "HOST": 'localhost',
      },
      env_production: {
        "NODE_ENV": 'production',
        "HOST": 'localhost',
      },
    },
  ],
};
