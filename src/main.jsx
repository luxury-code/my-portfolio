import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx';
import theme from './theme.js';
import './index.css';

/** GitHub Pages 하위 경로(/my-portfolio/) 배포를 위해 basename 을 주입 */
const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={ theme }>
      <CssBaseline />
      <BrowserRouter basename={ basename }>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
