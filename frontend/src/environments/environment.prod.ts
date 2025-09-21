export const environment = {
  production: true,
  auth0: {
    domain: 'your-domain.auth0.com',
    clientId: 'your-client-id',
    audience: 'your-api-audience',
    redirectUri: window.location.origin,
    errorPath: '/error'
  },
  api: {
    baseUrl: 'https://your-production-api.com/api'
  }
};