import React, { Component } from 'react'
import PubSub from 'pubsub-js';

class InputCustomizado extends Component {

    constructor(){
        super();
        this.state = {msgErro:''};
    }

    render() {
        return (
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label> 
                <input {...this.props}/>                  
                <span className="error">{this.state.msgErro}</span>            
            </div>
        )
    }

    componentDidMount() {
        PubSub.subscribe("erro-validacao", function(topico,erro) {
            // console.log(erro);
            // console.log(this.props.name);
            if(this.props.value === '') {
                this.setState({msgErro: erro.error});
            }
        }.bind(this));
        
        PubSub.subscribe("limpa-erros", function(topico) {
            this.setState({msgErro: ''});
        }.bind(this));
    }
}

export default InputCustomizado;