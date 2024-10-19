import React from 'react';
import './css/App.css';
import Navbar from "./layouts/header-footer/Navbar";
import Footer from "./layouts/header-footer/Footer";
import Homepage from "./layouts/pages/homepage";


function App() {
  return (
    <div className="App">
      {/* Navbar */}
    <Navbar/>
      {/* Navbar */}

        {/* Homepage */}
        <Homepage/>
        {/* Homepage */}

        {/* Footer */}
     <Footer/>
    </div>
  );
}

export default App;
