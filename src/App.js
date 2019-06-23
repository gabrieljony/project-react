import React from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import AutorBox from './Autor';

class App extends React.Component {

  render() {
    // console.log("render");
    // console.log(this.state.lista);
    return (
      <div id="layout">
          <a href="#menu" id="menuLink" className="menu-link">
            
              <span></span>
          </a>

          <div id="menu">
              <div className="pure-menu">
                  <a className="pure-menu-heading" href="Company">Company</a>

                  <ul className="pure-menu-list">
                      <li className="pure-menu-item"><a href="Home" className="pure-menu-link">Home</a></li>
                      <li className="pure-menu-item"><a href="Autor" className="pure-menu-link">Autor</a></li>
                      <li className="pure-menu-item"><a href="Livro" className="pure-menu-link">Livro</a></li>
                  </ul>
              </div>
          </div>

          <div id="main">
                  <div className="header">
                    <h1>Cadastro de Autores</h1>
                  </div>
                  

                  <AutorBox />
                     
                                
                  
                </div>     
      </div>
    );
  }
}

export default App;
