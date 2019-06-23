import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './components/InputCustomizado';
import SubmitCustomizado from './components/SubmitCustomizado';

class FormularioAutor extends Component {

    constructor() {
        super();
        this.state = {nome:'',email:'',senha:''};
        this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
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
            // this.setState({lista: resposta});
            this.props.callbackAtualizaListagem(resposta);
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
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                        
                    <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome"/>
                    <InputCustomizado id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="E-mail"/>
                    <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} label="Senha"/>
                                              
                    <SubmitCustomizado type="submit" label="Gravar"/>
                        
                </form>             

            </div> 
        )
    }
}

class TabelaAutor extends Component {
    
    render() {
        return (
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
                            this.props.lista.map(autor => {
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
        )
    }
}

class AutorBox extends Component {

    constructor() {
        super();
        this.state = {lista : []};
        this.atualizaListagem = this.atualizaListagem.bind(this);
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

    atualizaListagem(novaLista) {
        this.setState({lista:novaLista});
    }

    render() {
        return (
            <div className="content" id="content"> 
                <FormularioAutor callbackAtualizaListagem={this.atualizaListagem}/>
                <TabelaAutor lista={this.state.lista}/>
                
            </div>
        )
    }
}

export default AutorBox;


