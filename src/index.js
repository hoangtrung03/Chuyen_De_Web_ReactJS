import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.min.css'
import './index.scss';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals';
import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';
import vi from "./assets/i18n/vi.json";
import en from "./assets/i18n/en.json";

const root = ReactDOM.createRoot(document.getElementById('root'));
i18next.init({
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  resources: {
      en: {
        translation: en
      },
      vi: {
        translation: vi
      },
  },
});
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
