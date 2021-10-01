import React, { Component } from 'react'

export default class AdminPage extends Component {
    state = {
        tea_name: '',
        type: '',
        description: '',
        isAmerican: '',
        url: '',
    }

    handleNameChange = () => {
        // update state to reflect e.target.value
    }

    handleTypeChange = () => {
        // update state to reflect e.target.value
    }

    handleDescriptionChange = () => {
        // update state to reflect e.target.value
    }

    handleIsAmericanChange = () => {
        // update state to reflect e.target.value
    }

    handleUrlChange = () => {
        // update state to reflect e.target.value
    }

    handleFormSubmit =  async () => {
        // prevent default
        // If a state value is empty, throw an alert.
        // makes a post request with state values.
        // redirects user to listPage.
    }
    
    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <label>
                    <input onChange={this.handleNameChange} type="text" name="tea_name" />
                </label>
                <label>
                    <input onChange={this.handleTypeChange} type="text" name="type" />
                </label>
                <label>
                    <input onChange={this.handleDescriptionChange} type="text" name="description" />
                </label>
                <label>
                    <input onChange={this.handleIsAmericanChange} type="text" name="north_america_native" />
                </label>
                <label>s
                    <input onChange={this.handleUrlChange} type="text" name="URL" />
                </label>
            </form>
        )
    }
}
