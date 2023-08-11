import React, { useEffect, useState } from 'react';
import './App.css';
import ApiProvider from './data/ApiProvider';
import Home from './pages/HomePage';



function App() {

  
  return (
    <ApiProvider>
    <div className="App">
       <header>
        <nav>
           <h1><a href="/" className="header__links">CI Moviez</a></h1>
        </nav>
        <form id="search_form">
            <input id="search_box" type="search" name="searchbox" placeholder="search movie"/>
            <button id="search_btn" type="submit">search</button>
        </form>
      </header>
      <Home/>
          <footer className="footer">
              <p>
                  <span className="nowrap">Copyright &copy;</span>
                  <span className="nowrap">GraceValley Technologies</span>
              </p>
          </footer>
    </div>
    </ApiProvider>
  );
}

export default App;
