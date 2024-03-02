import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import './index.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';

//! Create a query client
const queryClient = new QueryClient();

//! Create a stripe promise
const stripePromise = loadStripe(
  'pk_test_51Opchj2NuUJ2hTgmjbeX0QP4wLsN1PZ4zYFSW3cydzWBrdWM9WtjTpEYwFTblHWj4LvxfswVnZWFAj8Ajtfozpni003Ki7BJmU'
);
//! Stripe options
const options = {
  mode: 'payment',
  currency: 'usd',
  amount: 1099
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Elements stripe={stripePromise} options={options}>
          <App />
        </Elements>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
