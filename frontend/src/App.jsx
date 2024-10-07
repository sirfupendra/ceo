import React from 'react'
import Intro from './components/Intro'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Posts from './components/Posts';
import Alumnisection from './components/Alumnisection';
import Vision from './components/Vision';
import Signup from './components/Signup';
import Signin from './components/Signin';


function App() {
  return (
    <div>
    <Router>
    <Routes>
<Route path='/' element={ <Intro/>}/>
<Route path='/Home' element={<Home/>} />
<Route path='/Posts' element={<Posts/>}/>

<Route path='/Vision' element={<Vision/>}/>
<Route path="/Alumnisection" element={<Alumnisection />} />
  <Route path="/Signup" element={<Signup />} />
   <Route path="/Signin" element={<Signin />} />
    </Routes>
    </Router>
     
    
    </div>
  )
}

export default App