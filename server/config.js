const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/tobcitydev',
  port: process.env.PORT || 8000,
  cookieKey: process.env.COOKIEKEY || 'asdasdasdasdsadsadsad',
  facebookAppID: process.env.FACEBOOK_APP_ID || '299960864082504',
  facebookAppSecret: process.env.FACEBOOK_APP_SECRET || '16ddbe32c735ea78b675491057652efa',
  googleID: process.env.GOOGLE_ID || '878565016195-hn0qlmuml1t0a456pt9scbhqvdf0lse0.apps.googleusercontent.com',
  googleSecret: process.env.GOOGLE_SECRET || 'Z2nnVMXbk24TeDj2IT76rAO7',
  user: process.env.USER || 'jandreus87@gmail.com',
  pass: process.env.PASS || 'BMxyDpeTK3nv',
  sendgridKeyid: process.env.SENDGRID_KEY_ID || 'JIS1LNBTSDqr_R5NI_ilvQ',
  sendgridKey: process.env.SENDGRID_KEY || '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',
  accountSid : process.env.TWILIO_ACCOUNT_SID || 'AqBXgk9S5QLPzUw66R2Vy2BmBC0odxM0',
  authToken : process.env.TWILIO_AUTH_TOKEN || 'AqBXgk9S5QLPzUw66R2Vy2BmBC0odxM0',
  authyKey : process.env.TWILIO_AUTHY_KEY || 'J4y0SECjS052rpX5FyXJpPUVXD0TOQH9',
};

export default config;
