module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DB_URL || 'postgresql://paypay@localhost/pro-now',
  JWT_SECRET: process.env.JWT_SECRET || 'change-this'
};
