import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './router';




console.log('app');

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      app
      <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
    </>
  )
}

export default App
