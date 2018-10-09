const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/tobcitydev',
  port: process.env.PORT || 8000,
  cookieKey: process.env.COOKIEKEY || 'asdasdasdasdsadsadsad',
  facebookAppID: process.env.FACEBOOK_APP_ID || '299960864082504',
  facebookAppSecret: process.env.FACEBOOK_APP_SECRET || '16ddbe32c735ea78b675491057652efa',
  googleID: process.env.GOOGLE_ID || '935751292286-e1a2ba2bmbk6fsahs65sgii2hj9vvcai.apps.googleusercontent.com',
  googleSecret: process.env.GOOGLE_SECRET || 'nPLz2CdPaw88dRNUC28lxJaJ',
  user: process.env.USER || 'jandreus87@gmail.com',
  pass: process.env.PASS || 'BMxyDpeTK3nv',
  sendgridKeyid: process.env.SENDGRID_KEY_ID || 'JIS1LNBTSDqr_R5NI_ilvQ',
  sendgridKey: process.env.SENDGRID_KEY || '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',
};

export default config;
