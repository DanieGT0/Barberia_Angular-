export const environment = {
  production: false,
  auth0: {
    domain: 'dev-q4jyr4x3f1gn43ed.us.auth0.com',
    clientId: 'okysdDBR4OMlDlPsx6Y04laeqJGjq4Zv',
    audience: 'https://barberia-api',
    redirectUri: window.location.origin,
    errorPath: '/error'
  },
  api: {
    baseUrl: 'http://localhost:8080/api'
  }
};