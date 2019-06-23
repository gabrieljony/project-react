import React, { Component } from 'react'
import PubSub from 'pubsub-js';

export default class TratadorErros extends Component {

    publicaErros(obj){
        console.log(obj);
        console.log(obj.error);
        PubSub.publish("erro-validacao", obj);
        // for(var i=0; i<obj.error.length; i++){
        //     var erro = obj.error[i];
        //     console.log(erro);
        // }
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
