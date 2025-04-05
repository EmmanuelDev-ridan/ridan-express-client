import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        open: true,
        strictPort: true,

        proxy: {
            '/api': {
                target: 'http://localhost:5000', // Your backend URL
                changeOrigin: true,
                secure: false,
                // rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Adjust based on your API routes
            },
        }
    }
});
