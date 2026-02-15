
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import { Route } from 'react-router-dom';

function App() {
  const [token, setToken] = useState<string>(
    localStorage.getItem('token') ?? ''
  );

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])
  return (
    <div className='bg-gray-50 min-h-screen'>
      <Navbar setToken={setToken} />
      <div className='flex w-full'>
        <Sidebar />
        <div className='flex-1'>
          <Route path='/add' element={<Add />} />
          <Route path='/list' element={<List />} />
          <Route path='/orders' element={<Orders />} />
        </div>
      </div>
    </div>
  )
}

export default App

