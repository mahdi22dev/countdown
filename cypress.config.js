module.exports = {
  video: true,
  projectId: "gc8127",
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
      }),
        on("task", {
          log(message) {
            // Log the message to the console
            console.log(message);
            return null; // Return null to indicate success
          },
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
