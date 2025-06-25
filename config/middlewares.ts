export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:', 'apollo-server-landing-page.cdn.apollographql.com'],
          'img-src': ["'self'", 'data:', 'blob:', 'apollo-server-landing-page.cdn.apollographql.com'],
          'media-src': ["'self'", 'data:', 'blob:'],
          'script-src': ["'self'", "'unsafe-inline'", 'apollo-server-landing-page.cdn.apollographql.com'],
          'style-src': ["'self'", "'unsafe-inline'", 'apollo-server-landing-page.cdn.apollographql.com'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      origin: [
        'http://localhost:4321',
        'http://localhost:3000',
        'http://127.0.0.1:4321',
        'http://127.0.0.1:3000',
        process.env.FRONTEND_URL || 'https://yourdomain.com',
        /\.pages\.dev$/,
      ]
    }
  },
  {
    name: 'strapi::poweredBy',
    config: {
      poweredBy: 'Strapi <strapi.io>',
    },
  },
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
