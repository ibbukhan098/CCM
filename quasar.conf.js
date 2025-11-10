/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

const { configure } = require('quasar/wrappers');

module.exports = configure(function (ctx) {
  return {
    // https://quasar.dev/quasar-cli/supporting-ts
    supportTS: false,

    // https://quasar.dev/quasar-cli/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/boot-files
    boot: [
      'axios',
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: [
      'app.scss'
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      'mdi-v5',
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!
      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      vueRouterMode: 'history', // available values: 'hash', 'history'
      // env: require('dotenv').config().parsed,
      // env: { ...env },
      env: {
        CCMAPI: process.env.NODE_ENV == 'dev' ? 'https://apigateway.easyfastnow.com/gateway/' :
        process.env.NODE_ENV == 'stage' ? 'https://apigateway.easyfastnow.com/gateway/' : process.env.NODE_ENV == 'production'
        ? 'https://apigateway.linesheetspro.com/gateway/' : 'https://apigateway.easyfastnow.com/gateway/',


        WooCommerceAPI: process.env.NODE_ENV == 'dev' ? 'https://api-woocommerce.sellerscommerce.com/' :
        process.env.NODE_ENV == 'stage' ? 'https://woocommerce.easyfastnow.com/' : process.env.NODE_ENV == 'production'
        ? 'https://api-woocommerce.sellerscommerce.com/' : 'https://api-woocommerce.sellerscommerce.com/',


        ShopifyAPI: process.env.NODE_ENV == 'dev' ? 'http://localhost:3000/' :
        process.env.NODE_ENV == 'stage' ? 'https://shopify.easyfastnow.com/' : process.env.NODE_ENV == 'production'
        ? 'https://api-shopify.sellerscommerce.com/' : 'http://localhost:3000/',

        UtilityAPI: process.env.NODE_ENV == 'dev' ? 'https://utils.easyfastnow.com/' :
        process.env.NODE_ENV == 'stage' ? 'https://utils.easyfastnow.com/' : process.env.NODE_ENV == 'production'
        ? 'https://util.sellerscommerce.com/' : 'https://utils.easyfastnow.com/',

        StripeAPI:
        process.env.NODE_ENV == 'dev' ? 'http://localhost:5002/':
        process.env.NODE_ENV == 'stage' ? ' https://invoices.easyfastnow.com/' :
        process.env.NODE_ENV == 'production' ? ' https://invoices.sellerscommerce.com/' : ' https://invoices.easyfastnow.com/',

        CatalogAPI:
        process.env.NODE_ENV == 'dev' ? 'https://catalog.easyfastnow.com/':
        process.env.NODE_ENV == 'stage' ? 'https://catalog.easyfastnow.com/' :
        process.env.NODE_ENV == 'production' ? 'https://catalog.sellerscommerce.com/' : 'http://localhost:5004/',

        // ImageURL: 'https://az777500.vo.msecnd.net/images/',
        ImageURL: 'https://ccmweb.blob.core.windows.net/ccm/images/',

        ScriptURL: process.env.NODE_ENV == 'dev' ? 'GTM-MXNZG6C' :
        process.env.NODE_ENV == 'stage' ? 'GTM-MXNZG6C' : process.env.NODE_ENV == 'production'
        ? 'GTM-WXBZ4LF' : 'GTM-MXNZG6C'

        // WooCommerceAPI: ctx.dev ?'http://localhost:5003/' : ctx.debug ? 'https://woocommerce.easyfastnow.com/'
        // : ctx.prod ?'https://api-woocommerce.sellerscommerce.com/' : 'https://woocommerce.easyfastnow.com/',

        // ShopifyAPI: ctx.dev ?'http://localhost:3000/' : ctx.debug ? 'https://stageapi-shopify.sellerscommerce.com' :
        // ctx.prod ? 'https://api-shopify.sellerscommerce.com/' : 'dos',

        // UtilityAPI:ctx.dev ? 'http://localhost:2000/' : ctx.debug ? 'https://stageutil.sellerscommerce.com' :
        // ctx.prod ? 'https://utii.sellerscommerce.com/' : 'dos'
      },
      // transpile: false,
      // publicPath: '/',

      // Add dependencies for transpiling with Babel (Array of string/regex)
      // (from node_modules, which are by default not transpiled).
      // Applies only if "transpile" is set to true.
      // transpileDependencies: [],

      // rtl: true, // https://quasar.dev/options/rtl-support
      // preloadChunks: true,
      // showProgress: false,
      // gzip: true,
      // analyze: true,

      // Options below are automatically set depending on the env, set them if you want to override
      // extractCSS: false,

      // https://quasar.dev/quasar-cli/handling-webpack
      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      chainWebpack (/* chain */) {
        //
      },
    },

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      https: false,
      port: 8080,
      open: true // opens browser window automatically
    },

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      config: {},

      // iconSet: 'material-icons', // Quasar icon set
      // lang: 'en-US', // Quasar language pack

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: ['Notify', 'Dialog', 'Loading', 'Meta']
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: ["fadeIn","fadeOut","slideInLeft","slideInRight"],

    // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false,

      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      prodPort: 3000, // The default port that the production server should use
                      // (gets superseded if process.env.PORT is specified at runtime)

      maxAge: 1000 * 60 * 60 * 24 * 30,
        // Tell browser when a file from the server should expire from cache (in ms)

      chainWebpackWebserver (/* chain */) {
        //
      },

      middlewares: [
        ctx.prod ? 'compression' : '',
        'render' // keep this as last one
      ]
    },

    // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW

      // for the custom service worker ONLY (/src-pwa/custom-service-worker.[js|ts])
      // if using workbox in InjectManifest mode
      chainWebpackCustomSW (/* chain */) {
        //
      },

      manifest: {
        name: `Catalog Manager`,
        short_name: `Catalog Manager`,
        description: `A Quasar Framework app`,
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'catalog-communication-manager'
      },

      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      chainWebpackMain (/* chain */) {
        // do something with the Electron main process Webpack cfg
        // extendWebpackMain also available besides this chainWebpackMain
      },

      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      chainWebpackPreload (/* chain */) {
        // do something with the Electron main process Webpack cfg
        // extendWebpackPreload also available besides this chainWebpackPreload
      },
    }
  }
});
