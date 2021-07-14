import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import plainText from "vite-plugin-plain-text";

process.env.BROWSER =
  process.platform === "win32"
    ? "chrome"
    : process.platform === "darwin"
    ? "google chrome"
    : undefined;

export default defineConfig({
  server: {
    open: true,
  },
  plugins: [reactRefresh(), plainText(/\.csv$/)],
});
