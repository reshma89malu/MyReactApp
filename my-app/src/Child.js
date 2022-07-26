import React, { Component } from 'react'

export default class Child extends Component {
    onTrigger = (event) => {
        this.props.parentCallback("Some text from child");
        event.preventDefault();
    }
  
    render(){
        return(
        <div>
            <form onSubmit = {this.onTrigger}>
                <input className="btn btn-primary" type="submit" value="Get some text from child component"/>
            </form>
        </div>
        )
    }
}