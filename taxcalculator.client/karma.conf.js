
const path = require('path'); // Import the path module

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    files: [
      { pattern: './src/test.ts', watched: false } // Entry point for tests
    ],
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map', // Source maps for debugging
      resolve: {
        extensions: ['.ts', '.js'], // Resolve TypeScript and JavaScript files
        alias: {
          '@app': path.resolve(__dirname, 'src/app/')
        }
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/
          },
          {
            test: /\.html$/,
            loader: 'html-loader' // Handle Angular templates
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'] // Handle CSS files
          }
        ]
      }
    },
    webpackMiddleware: {
      stats: 'errors-only' // Show only errors
    },
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    mime: {
      'text/javascript': ['js', 'mjs']  // Add this line to configure the MIME type for JavaScript
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_DEBUG,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true,
    listenAddress: 'localhost',
    hostname: 'localhost'
  });
};

