var siteInfo = require('./content/setup/config.json');
console.log(siteInfo);
var glob = require('glob');
var path = require('path');

// Enhance Nuxt's generate process by gathering all content files from Netifly CMS
// automatically and match it to the path of your Nuxt routes.
// The Nuxt routes are generate by Nuxt automatically based on the pages folder.
const dynamicRoutes = getDynamicPaths({
  // '/blog': 'blog/posts/*.json',
});

export default {
  mode: 'universal',

  head: {
    title: siteInfo.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: siteInfo.description
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // '@nuxtjs/pwa',
    '@nuxtjs/markdownit',
    '@bazzite/nuxt-netlify'
  ],

  markdownit: {
    injected: true,
    preset: 'default',
    breaks: true,
    html: true
  },

  pwa: {
    icons: {
      iconSrc: siteInfo.icon
    },
    manifest: {
      name: siteInfo.name,
      short_name: siteInfo.name,
      description: siteInfo.description,
      lang: 'en'
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: '/images/uploads/.*',
          handler: 'cacheFirst',
          strategyOptions: {
            cacheName: 'image-cache',
            cacheExpiration: {
              maxEntries: 100,
              maxAgeSeconds: 86400
            }
          }
        }
      ]
    }
  },

  /*
   ** Route config for pre-rendering
   */
  router: {},

  generate: {
    fallback: true,
    routes: dynamicRoutes
  },

  plugins: [],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};

/**
 * Create an array of URLs from a list of files
 * @param {*} urlFilepathTable
 */
function getDynamicPaths(urlFilepathTable) {
  // if (process.argv.includes('--spa')) return [];
  return [].concat(
    ...Object.keys(urlFilepathTable).map(url => {
      const filepathGlob = urlFilepathTable[url];
      return glob
        .sync(filepathGlob, { cwd: 'content' })
        .map(filepath => `${url}/${path.basename(filepath, '.json')}/`);
    })
  );
}
