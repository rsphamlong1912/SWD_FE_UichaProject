import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './components/GlobalStyles';
import 'antd/dist/antd.min.css';
import '~/assets/styles/main.css';
import '~/assets/styles/responsive.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GlobalStyles>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GlobalStyles>,
);
