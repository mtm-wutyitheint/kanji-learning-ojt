module.exports = ({ env }) => ({
  // ...
  email: {
    provider: 'sendgrid',
    providerOptions: {
      apiKey: env('SENDGRID_API_KEY', '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'),
    },
    settings: {
      defaultFrom: 'developernaiaunglwin@gmail.com',
      defaultReplyTo: 'developernaiaunglwin@gmail.com',
      testAddress: 'scm.naingaunglwin@gmail.com',
    },
  },
  // ...
});