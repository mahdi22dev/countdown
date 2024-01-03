module.exports = {
  // video: true,
  // projectId: "gc8127",
  e2e: {
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.name === "chrome" && browser.isHeadless) {
          launchOptions.args = launchOptions.args.map((arg) => {
            if (arg === "--headless") {
              return "--headless=new";
            }
            return arg;
          });
        }
        return launchOptions;
      });
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
};
