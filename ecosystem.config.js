module.exports = {
  apps: [
    {
      name: 'minideutsch-expo',
      script: 'npx',
      args: 'expo start --web --port 3000',
      cwd: '/home/user/webapp',
      env: {
        NODE_ENV: 'development',
        EXPO_DEVTOOLS_LISTEN_ADDRESS: '0.0.0.0'
      },
      log_file: '/home/user/webapp/logs/expo.log',
      error_file: '/home/user/webapp/logs/expo-error.log',
      out_file: '/home/user/webapp/logs/expo-out.log',
      merge_logs: true,
      max_restarts: 5,
      min_uptime: '10s'
    },
    {
      name: 'demo-server',
      script: '/home/user/webapp/demo-server.js',
      cwd: '/home/user/webapp',
      env: {
        NODE_ENV: 'development',
        PORT: 8080
      },
      log_file: '/home/user/webapp/logs/demo.log',
      error_file: '/home/user/webapp/logs/demo-error.log',
      out_file: '/home/user/webapp/logs/demo-out.log',
      merge_logs: true
    }
  ]
};