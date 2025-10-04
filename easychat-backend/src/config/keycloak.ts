// keycloak.js
const session = require('express-session');
const Keycloak = require('keycloak-connect');

const memoryStore = new session.MemoryStore();

const keycloak = new Keycloak({ store: memoryStore }, {
    "realm": "easychat",
    "auth-server-url": "http://127.0.0.1:8080/", // or your Keycloak URL
    "ssl-required": "none",
    "resource": "easychat-backend", // Must be a Keycloak Client
    "public-client": true,
    "confidential-port": 0
});

module.exports = { keycloak, memoryStore };