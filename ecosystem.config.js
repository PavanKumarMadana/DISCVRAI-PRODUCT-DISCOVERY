module.exports = {
  apps: [
    {
      name: 'discvrai-backend',
      script: 'backend/server.js',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};
