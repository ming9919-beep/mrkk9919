import type { CapacitorConfig } from '@capacitor/cli';

/* iOS / Android container for the ABA Mobile demo.
   Web assets are the same Vite build, but with a RELATIVE base ('./') so that
   WKWebView can load them from the app bundle instead of a web server. */
const config: CapacitorConfig = {
  appId: 'com.mrkk9919.abamobile',
  appName: 'ABA Mobile',
  webDir: 'dist/public',
  ios: {
    contentInset: 'always',
    backgroundColor: '#0C2A33',
  },
};

export default config;
