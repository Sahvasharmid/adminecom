import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/AuthPage/LoginPage';

import AdminRoute from './Components/Routes/AdminRoute';
import NotFoundPage from './Pages/NotFoundPage';

import CreateProduct from './Pages/Admin/CreateProduct';
import About from './Pages/Admin/Home';
import Products from './Pages/Admin/Products';
import Home from './Pages/Admin/Home';
import AddLinkForm from './Pages/trial';

import './App.css'
import Settings from './Pages/Admin/Settings/Settings';
const App = () => {
  return (
    <div>
      
      <BrowserRouter basename='adminecom'>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/add" element={<AddLinkForm/>} />
        
          {/* Nested route for admin dashboard */}
          <Route path='/dashboard' element={<AdminRoute></AdminRoute>}>
          <Route path='home' element={<Home></Home>}></Route>
      <Route path='products' element={<Products></Products>}></Route>
      <Route path='settings' element={<Settings></Settings>}></Route>
          </Route>

          {/* Add a catch-all route for unknown paths */}
          <Route path="*" element={<NotFoundPage></NotFoundPage>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
