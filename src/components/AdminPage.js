import React, { Component } from 'react';
import { createTea, getTeaTypes } from '../fetch-utils.js';

export default class AdminPage extends Component {
    state = {
        tea_name: '',
        type_id: 0,
        description: '',
        north_america_native: '',
        url: '',
    }

    // Could place this action in the jsx if we want to clean up the class component.
    handleNameChange = async (e) => {
        await this.setState({tea_name: e.target.value});
    }

    // Could place this action in the jsx if we want to clean up the class component.
    handleTypeChange = async (e) => {
        await this.setState({type: e.target.value});
    }

    // Could place this action in the jsx if we want to clean up the class component.
    handleDescriptionChange = async (e) => {
        await this.setState({description: e.target.value});
    }

    // Could place this action in the jsx if we want to clean up the class component.
    handleIsAmericanChange = async (e) => {
        await this.setState({north_america_native: e.target.value});
    }

    // Could place this action in the jsx if we want to clean up the class component.
    handleUrlChange = async (e) => {
        await this.setState({url: e.target.value});
    }

    
    handleFormSubmit =  async (e) => {
        e.preventDefault();
        createTea(this.state);
        this.props.history.push('/');
    }
    
    render() {
        // ❓ Is this okay? This is an alternative to the componentDidMount approach. 
        const categoryDataArr = getTeaTypes()
        return (
            <form onSubmit={this.handleFormSubmit}>
                <label>
                    Name 
                    <input onChange={this.handleNameChange} type="text" name="tea_name" required />
                </label>
                <label>
                    Type   
                    <select onChange={this.handleTypeChange}>
                        {
                            categoryDataArr.map(catObj => {
                                return(
                                    <>
                                        <option value={catObj.id}>{catObj.tea_type}</option>
                                    </>
                                )
                            })
                        }
                    </select>
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
