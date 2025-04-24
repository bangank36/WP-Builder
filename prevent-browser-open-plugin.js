/**
 * Custom webpack plugin to prevent automatic browser opening
 */
class PreventBrowserOpenPlugin {
  constructor() {
    this.name = 'PreventBrowserOpenPlugin';
  }

  apply(compiler) {
    // Hook into the webpack compilation process
    compiler.hooks.afterEmit.tap(this.name, (compilation) => {
      // Check if webpack-dev-server is running
      if (process.env.WEBPACK_DEV_SERVER) {
        // Override any browser opening functionality
        if (global.open) {
          const originalOpen = global.open;
          global.open = function(url, ...args) {
            console.log(`[PreventBrowserOpenPlugin] Prevented automatic browser opening for: ${url}`);
            return { closed: false }; // Return a fake window object
          };
        }
      }
    });
  }
}

module.exports = PreventBrowserOpenPlugin;
