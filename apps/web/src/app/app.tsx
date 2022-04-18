import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Navbar from '../components/Navbar';
import { Container } from '@mui/material';

function App() {
  return (
    <>
      <Navbar />

      <Container component="main" maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
