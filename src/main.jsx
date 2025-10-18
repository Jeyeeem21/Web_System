import React, { useEffect, useState } from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CarsPage from './CarsPage'
import OrderPage from './OrderPage'

function Router() {
  const [path, setPath] = useState(window.location.pathname + window.location.hash);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname + window.location.hash);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Decide rendering based on path
  if (path.startsWith('/order')) return <OrderPage />;
  if (path.startsWith('/cars')) return <CarsPage />;
  return <App />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
