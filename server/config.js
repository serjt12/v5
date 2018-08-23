const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/tobcitydev',
  port: process.env.PORT || 8000,
  cookieKey: process.env.cookieKey || 'asdasdasdasdsadsadsad',
  facebookAppID: process.env.FACEBOOK_APP_ID || '299960864082504',
  facebookAppSecret: process.env.FACEBOOK_APP_SECRET || 'SsWH9r7xYMgq',
  googleID: process.env.GOOGLE_ID || '935751292286-e1a2ba2bmbk6fsahs65sgii2hj9vvcai.apps.googleusercontent.com',
  googleSecret: process.env.GOOGLE_SECRET || 'nPLz2CdPaw88dRNUC28lxJaJ',
};

export default config;
