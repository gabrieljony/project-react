import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './components/InputCustomizado';
import SubmitCustomizado from './components/SubmitCustomizado';
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros';

class FormularioAutor extends Component {

    constructor() {
        super();
        this.state = {nome:'',email:'',senha:''};
        this.enviaForm = this.enviaForm.bind(this);
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
            // this.props.callbackAtualizaListagem(resposta);
            PubSub.publish('atualiza-lista-autores', resposta);
            this.setState({nome:'',email:'',senha:''})//limpa o formulario
        }.bind(this),
        error: function(resposta){
            // console.log(resposta);
            // console.log("erro");
            if(resposta.status === 500) {
                //recuperar quais foram os erros
                //exibir a mensagem de erro no campo - span
                new TratadorErros().publicaErros(resposta.responseJSON);
            }
            if(resposta.status === 400) {
                new TratadorErros().publicaErros(resposta.responseJSON);
            }
        },
        beforeSend: function(){
            PubSub.publish("limpa-erros", {});
        }
        });
    }

    salvaAlteracao(nomeInput, evento){
        var campoSendoAlterado = {};
        campoSendoAlterado[nomeInput] = evento.target.value;
        this.setState(campoSendoAlterado);
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                        
                    <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.salvaAlteracao.bind(this, 'nome')} label="Nome"/>
                    <InputCustomizado id="email" type="email" name="email" value={this.state.email} onChange={this.salvaAlteracao.bind(this, 'email')} label="E-mail"/>
                    <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.salvaAlteracao.bind(this, 'senha')} label="Senha"/>
                                              
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

        PubSub.subscribe('atualiza-lista-autores', function(topico, novaLista) {
            this.setState({lista:novaLista});
        }.bind(this));
    }

    render() {
        return (
            <div>

            <div className="header">
              <h1>Cadastro de Autores</h1>
            </div>
            <div className="content" id="content"> 
                <FormularioAutor/>
                <TabelaAutor lista={this.state.lista}/>
                
            </div>
            </div>
        )
    }
}

export default AutorBox;


