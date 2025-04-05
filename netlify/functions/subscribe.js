const fetch = require('node-fetch');

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  const { email } = JSON.parse(event.body);
  const API_KEY = process.env.MAILERLITE_API_KEY;
  const GROUP_ID = '150618368696649601';

  const response = await fetch(`https://api.mailerlite.com/api/v2/groups/${GROUP_ID}/subscribers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-MailerLite-ApiKey': API_KEY,
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Subscription failed', error: data }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Subscription successful', data }),
  };
};
