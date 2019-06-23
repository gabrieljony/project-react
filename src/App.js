import React from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';
import InputCustomizado from './components/InputCustomizado';
import SubmitCustomizado from './components/SubmitCustomizado';

class App extends React.Component {

  constructor() {
    super();
    this.state = {lista : [],nome:'',email:'',senha:''};
    this.enviaForm = this.enviaForm.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setSenha = this.setSenha.bind(this);
  }

  // função antes do render ser chamado pela 1 vez
  componentWillMount() {
    // console.log("WillMount");
  }

  // component acabou de ser montado, logo quando o render é envocado pela 1 vez essa função é chamado
  componentDidMount() {
    // console.log("DidMount");
    $.ajax({
        url:"http://localhost:8080/spring-postegresql/api/autores",
        dataType: 'json',
        success: function(resposta) {
          // console.log("chegou agora");
          // console.log(this);
          // console.log(resposta);
          this.setState({lista: resposta});
        }.bind(this),
        error: function(resposta){
          console.log(resposta);
          console.log("erro");
        }
    });
  }

  // submit o formulario
  enviaForm(evento){
    evento.preventDefault();// para que o evento não seja propagado e não recarregue a página completa
    // console.log(this);
    // console.log("dados estão sendo enviados");
    $.ajax({
      url:"http://localhost:8080/spring-postegresql/api/autor/novo",
      contentType: 'application/json',
      dataType:'json',
      type:'post',
      data: JSON.stringify({nome:this.state.nome,email:this.state.email,senha:this.state.senha}),
      success: function(resposta) {
        // console.log("chegou resposta");
        // console.log(this);
        // console.log(resposta);
        this.setState({lista: resposta});
      }.bind(this),
      error: function(resposta){
          console.log(resposta);
          console.log("erro");
      }
    });
  }

  setNome(evento){
    this.setState({nome:evento.target.value});
  }
  setEmail(evento){
    this.setState({email:evento.target.value});
  }
  setSenha(evento){
    this.setState({senha:evento.target.value});
  }

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
                  <div className="content" id="content">
                    <div className="pure-form pure-form-aligned">
                      <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                        
                        <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome"/>
                        <InputCustomizado id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="E-mail"/>
                        <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} label="Senha"/>
                                              
                        <SubmitCustomizado type="submit" label="Gravar"/>
                        
                      </form>             

                    </div>  
                    <div>            
                      <table className="pure-table">
                        <thead>
                          <tr>
                            <th>Nome</th>
                            <th>email</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.state.lista.map(autor => {
                              return (
                                <tr key={autor.id}>
                                  <td>{autor.nome}</td>
                                  <td>{autor.email}</td>
                                </tr>
                              );
                            })
                          }
                        </tbody>
                      </table> 
                    </div>             
                  </div>
                </div>     
      </div>
    );
  }
}

export default App;
