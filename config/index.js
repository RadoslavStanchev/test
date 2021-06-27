const config = {
    PORT: 3000,
    DB_URI: `mongodb://localhost/js-backend-exam`,
    SALT_ROUNDS: 10,
    SECRET: 'TESTSALT',
    COOKIE_NAME: 'TOKEN',
}

module.exports = config;