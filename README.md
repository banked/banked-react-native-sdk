# banked-node

[![Version](https://img.shields.io/npm/v/@banked/node)](https://www.npmjs.com/package/@banked/rn-banked-checkout)

The Banked React Native component that offers an interface for processing a payment session created using the Banked API.

## Installation

Install the package with

```
npm install @banked/rn-banked-checkout
# or
yarn add @banked/rn-banked-checkout
```

Link the dependencies

```
react-native link @banked/rn-banked-checkout
# or
yarn add @banked/rn-banked-checkout
```

## Usage

Import the Checkout component

```
import Checkout from '@banked/rn-banked-checkout';
```

Add the Checkout component to your code

```
<Checkout paymentId = {YOUR_PAYMENT_ID}
                  apiKey = {YOUR_API_KEY}
                  onCancel={YOUR_CANCEL_HANDLER}/>
```

## License

Banked
