import './App.css';
import Hero from './Component/Hero/Hero';
import Login from './Component/Login/Login';
import Sign from './Component/Login/Sign';
import Nav from './Component/Navigation/Nav';
import { UserProvider } from './UserContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Contact from './Component/Contact/Contact'
import About from './Component/About/About'
import { FetchingData } from './Component/ContextApi/FetchingData';
import ProductDetail from './Component/ProductDetail/ProductDetail';
import Category from './Component/Category/Category';
import Cart from './Component/Cart/Cart';

function App() {
  return (
    <>
      <UserProvider>
        <FetchingData >
          <Router>
            <Nav />
            <Routes>
              <Route path='/Hero' element={<Hero />} />
              <Route exact path='/Login' element={<Login />} />
              <Route path='/Sign' element={<Sign />} />
              <Route path='/Contact' element={<Contact />} />
              <Route path='/About' element={<About />} />
              <Route path='/ProductDetail/:id' element={<ProductDetail />} />
              <Route path='/Category/:name' element={<Category/>} />
              <Route path='/Cart' element={<Cart/>} />
               

            </Routes>
          </Router>
        </FetchingData >
      </UserProvider>
    </>
  );
}

export default App;
