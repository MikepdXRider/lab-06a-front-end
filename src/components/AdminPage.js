import React, { Component } from 'react';
import request from 'superagent';

export default class AdminPage extends Component {
    state = {
        tea_name: '',
        type: '',
        description: '',
        isAmerican: '',
        url: '',
    }


    handleNameChange = async (e) => {
        await this.setState({tea_name: e.target.value});
    }


    handleTypeChange = async (e) => {
        await this.setState({type: e.target.value});
    }


    handleDescriptionChange = async (e) => {
        await this.setState({description: e.target.value});
    }


    handleIsAmericanChange = async (e) => {
        await this.setState({isAmerican: e.target.value});
    }


    handleUrlChange = async (e) => {
        await this.setState({url: e.target.value});
    }


    handleFormSubmit =  async (e) => {
        e.preventDefault();

        try{
            await request.post('https://lab06b-be.herokuapp.com/teas')
            .send({
                tea_name: this.state.tea_name,
                type: this.state.type,
                description: this.state.description,
                north_america_native: this.state.isAmerican,
                url: this.state.url,
            });
        } catch (error) {
            alert(error);
        }

        this.props.history.push('/');
    }
    
    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <label>
                    Name 
                    <input onChange={this.handleNameChange} type="text" name="tea_name" required />
                </label>
                <label>
                    Type   
                    <input onChange={this.handleTypeChange} type="text" name="type" required/>
                </label>
                <label>
                    Description   
                    <input onChange={this.handleDescriptionChange} type="text" name="description" required/>
                </label>
                <label>
                    Is North American Native? True/False   
                    <input onChange={this.handleIsAmericanChange} type="text" name="north_america_native" required/>
                </label>
                <label>
                    URL
                    <input onChange={this.handleUrlChange} type="text" name="URL" required/>
                </label>
                <button>Submit</button>
            </form>
        )
    }
}
