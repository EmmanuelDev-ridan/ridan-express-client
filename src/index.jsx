import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import store from './store/index';
import { FiCheckCircle, FiAlertTriangle, FiInfo, FiXCircle, FiShoppingCart } from 'react-icons/fi';

const EcommerceToaster = () => (
  <Toaster
    position="top-right"
    gutter={16}
    containerClassName="ecommerce-toast-container"
    toastOptions={{
      duration: 4000,
      style: {
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
        padding: '16px',
        color: '#1f2937',
        maxWidth: '420px'
      },
      success: {
        icon: <FiCheckCircle className="text-green-600 w-6 h-6" />,
        style: {
          background: '#f0fdf4',
          borderColor: '#16a34a'
        }
      },
      error: {
        icon: <FiXCircle className="text-red-600 w-6 h-6" />,
        style: {
          background: '#fef2f2',
          borderColor: '#dc2626'
        }
      },
      loading: {
        style: {
          background: '#f3f4f6',
          borderColor: '#9ca3af'
        }
      },
      custom: {
        icon: <FiShoppingCart className="text-orange-500 w-6 h-6" />,
        style: {
          background: '#fff7ed',
          borderColor: '#f97316'
        }
      }
    }}
  />
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
    <EcommerceToaster />
  </Provider>
);

reportWebVitals();