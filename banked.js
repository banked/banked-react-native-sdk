const baseUrl = 'https://api.banked.com/v2/checkout_sessions/';
const headers = new Headers({
  'Content-Type': 'application/json',
  'Banked-Platform': 'ReactNative Checkout',
  'Banked-Platform-Version': '1',
});

export function getPayment(paymentId, apiKey) {

  if (!apiKey) {
    throw Error('API key missing');
  }

  return fetch(`${baseUrl}${paymentId}?api_key=${apiKey}&logo_format=png`, {
    accept: 'application/json',
    headers
  })
    .then((response) => {
      if (!response.ok) {
        switch (response.status) {
          case 403:
            throw Error('API key incorrect');
          case 404:
            throw Error('Payment not found');
          default:
            throw Error('Something went wrong.');
        }
      }
      return response;
    },
    () => {
      throw new Error('Failed to fetch payment');
    })
    .then((response) => response.json());
}

const requests = [];

export function cancelSetProvider() {
  requests.forEach((controller) => {
    controller.abort();
  });
}

export function setProvider(paymentId, providerId, apiKey) {
  const controller = new AbortController();

  cancelSetProvider();
  requests.push(controller);

  return fetch(`${baseUrl}${paymentId}?api_key=${apiKey}`, {
    accept: 'application/json',
    method: 'PATCH',
    signal: controller.signal,
    headers,
    body: JSON.stringify({
      provider_id: providerId
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw Error('Something went wrong. Please try a different payment provider.');
      }
      return response;
    })
    .then((response) => response.json());
}
