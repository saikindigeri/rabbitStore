import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Custom plugin to force server restart on file changes
const restartServerOnChange = () => ({
  name: 'restart-server-on-change',
  configureServer(server) {
    // Watch for changes in the src directory
    server.watcher.on('change', (path) => {
      console.log(`File changed: ${path}. Restarting server...`);
      server.restart(); // Forces a full server restart
    });
  },
});

export default defineConfig({
  plugins: [
    react(), // React plugin with HMR
    restartServerOnChange(), // Custom plugin to restart server
  ],
  server: {
    // Optional: Ensure watcher is active
    watch: {
      usePolling: true, // Use polling if file changes aren't detected (slower but reliable)
    },
  },
});