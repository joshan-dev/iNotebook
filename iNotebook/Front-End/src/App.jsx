import './App.css'
import Contact from './components/Contact';
import Footer from './components/Footer';
import Home from './components/Home';
import Navbar from './components/Navbar'
import Login from './components/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import AddNote from './components/AddNote';
import Notes from './components/Notes';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <Router>
    <div>
      <Navbar />
      <Toaster toastOptions={{
      style: {
        background: 'black',
        color: "white",
      }
  }}/>
      <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/notes" element={<Notes/>} />
      <Route exact path="/addnote" element={<AddNote/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/signup" element={<SignUp/>} />
        <Route exact path="/contact" element={<Contact/>}/>
      </Routes>
      <Footer/>
      </div>
  </Router>
  )
}

export default App
