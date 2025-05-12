import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ReactDom from "react-dom/client";
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';


ReactDom.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
