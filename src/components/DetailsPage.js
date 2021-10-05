import React, { Component } from 'react';
import request from 'superagent';

export default class DetailsPage extends Component {
    state = {
        data: {},
        displayUpdate: false,
        tea_name: '',
        type: '',
        description: '',
        isAmerican: '',
        url: '',
    }


    componentDidMount = async () => {
        // update to call an imported fetchData function
        await this.fetchData();
    }

    // Move contents into a function in a fetch-utils.js file.
    // Then delete this.
    fetchData = async () => {
        const response = await request.get(`https://lab06b-be.herokuapp.com/teas/${this.props.match.params.id}`);

        this.setState({data: response.body});
    }

    // Move contents into a function in a fetch-utils.js file.
    handleDeleteClick = async () => {
        const confirmation = window.confirm('Are you sure? Deletions can be permanent.');

        if (confirmation === true) {
            await request.delete(`https://lab06b-be.herokuapp.com/teas/${this.props.match.params.id}`);

            this.props.history.push('/');
        }

        return;
    }

    changeDisplayUpdate = async (e) => {
        await this.setState({displayUpdate: !this.state.displayUpdate})
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
        await this.setState({isAmerican: e.target.value});
    }

    // Could place this action in the jsx if we want to clean up the class component.
    handleUrlChange = async (e) => {
        await this.setState({url: e.target.value});
    }

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
    // Couldn't get this version to work
    // prepareState = async (stateObj) => {
    //     for (const property in stateObj) {
    //         if (!stateObj.property){
    //             const currentPropData = await this.fetchData();
    //             await this.setState({property: currentPropData.property});
    //             console.log(this.state)
    //         }
    //     }
    // }

    // This should be handled in a form in the jsx below. Just add current state data as value attibutes in the form inputs.
    prepareState = async (stateObj) => {
        const currentData = this.state.data
        const { tea_name, type, description, north_america_native, url } = this.state
        console.log('description', description)
        console.log('current data:', currentData)
        if (!tea_name) await this.setState({tea_name: currentData.tea_name});
        if (!type) await this.setState({type: currentData.type});
        if (!description) await this.setState({description: currentData.description});
        if (!north_america_native) await this.setState({north_america_native: currentData.north_america_native});
        if (!url) await this.setState({url: currentData.url});
        console.log('updated state', this.state);
    }


    handleFormSubmit =  async (e) => {
        e.preventDefault();
        await this.prepareState(this.state)
        try{
            await request.put(`https://lab06b-be.herokuapp.com/teas/${this.props.match.params.id}`)
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
        await this.fetchData();
        await this.changeDisplayUpdate();
    }


    render() {
        return (
            <>
                {!this.state.displayUpdate ?
                <> 
                    <div>
                        <h3>{this.state.data.tea_name}</h3>
                        <img src={this.state.data.url} alt='tea'/>
                        <p>Type: {this.state.data.type}</p>
                        <p>Description: {this.state.data.description}</p>
                        <p>Native to North America: {String(this.state.data.north_america_native)}</p>
                    </div>
                    <button onClick={this.handleDeleteClick}>Delete</button>
                    <button onClick={this.changeDisplayUpdate}>Update</button>
                </>
                : <form onSubmit={this.handleFormSubmit}>
                <label>
                    Name 
                    {/* Add value attribute with state data value. */}
                    <input onChange={this.handleNameChange} type="text" name="tea_name" />
                </label>
                <label>
                    Type   
                    {/* Needs to be a select container with options generated by mapping categories data. -> When generating, add a conditional select attribute.
                        Needs values set to categories id */}
                    <input onChange={this.handleTypeChange} type="text" name="type"/>
                </label>
                <label>
                    Description   
                    {/* Add value attribute with state data value. */}
                    <input onChange={this.handleDescriptionChange} type="text" name="description"/>
                </label>
                <label>
                    Is North American Native? True/False   
                    {/* Add value attribute with state data value. */}
                    <input onChange={this.handleIsAmericanChange} type="text" name="north_america_native"/>
                </label>
                <label>
                    URL
                    {/* Add value attribute with state data value. */}
                    <input onChange={this.handleUrlChange} type="text" name="URL"/>
                </label>
                {/* Remove this, no longer necessary if inputs are auto-filled. */}
                <p>Any unfilled input-field will remain unchanged.</p>
                <button>Submit</button>
            </form>
                }           
            </>
        )
    }
}
