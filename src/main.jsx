import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./styles/style.scss";
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { ToastContainer } from 'react-toastify';


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <StrictMode>
    <App />
    <ToastContainer/>
  </StrictMode>
  </Provider>
);
