import React, { Component } from 'react';
import { deleteTeaById, getTeaById, getTeaTypes, updateTeaById } from '../fetch-utils.js';

export default class DetailsPage extends Component {
    state = {
        data: {},
        displayUpdate: false,
        tea_name: '',
        type_id: '',
        description: '',
        north_america_native: '',
        url: '',
    }


    componentDidMount = async () => {
        await this.fetchData();
    }


    fetchData = async () => {
        const teaData = await getTeaById(this.props.match.params.id);

        this.setState({data: teaData});
    }

   
    handleDeleteClick = async () => {
        const confirmation = window.confirm('Are you sure? Deletions can be permanent.');

        if (confirmation === true) {
            await deleteTeaById(this.props.match.params.id);

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
        await this.setState({type_id: e.target.value});
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
    // prepareState = async (stateObj) => {
    //     const currentData = this.state.data
    //     const { tea_name, type, description, north_america_native, url } = this.state
    //     console.log('description', description)
    //     console.log('current data:', currentData)
    //     if (!tea_name) await this.setState({tea_name: currentData.tea_name});
    //     if (!type) await this.setState({type: currentData.type});
    //     if (!description) await this.setState({description: currentData.description});
    //     if (!north_america_native) await this.setState({north_america_native: currentData.north_america_native});
    //     if (!url) await this.setState({url: currentData.url});
    //     console.log('updated state', this.state);
    // }


    handleFormSubmit =  async (e) => {
        // Prevents default form behaviour.
        e.preventDefault();
        // Creates a updatedTeaObj with relevant state data.
        const updatedTeaObj = {
            tea_name: this.state.tea_name,
            type_id: this.state.type_id,
            description: this.state.description,
            north_america_native: this.state.north_america_native,
            url: this.state.url,
        };
        // Makes a PUT request to API with id and updated obj.
        await updateTeaById(this.props.match.params.id, updatedTeaObj);
        // Retrieve updated data.
        await this.fetchData();
        // Hides update form.
        await this.changeDisplayUpdate();
    }


    render() {
        // ❓ Is this okay? This is an alternative to the componentDidMount approach. 
        const categoryDataArr = getTeaTypes();
        return (
            <>
                {!this.state.displayUpdate ?
                <> 
                    <div>
                        <h3>{this.state.data.tea_name}</h3>
                        <img src={this.state.data.url} alt='tea'/>
                        <p>Type: {this.state.data.type_id}</p>
                        <p>Description: {this.state.data.description}</p>
                        <p>Native to North America: {String(this.state.data.north_america_native)}</p>
                    </div>
                    <button onClick={this.handleDeleteClick}>Delete</button>
                    <button onClick={this.changeDisplayUpdate}>Update</button>
                </>
                : <form onSubmit={this.handleFormSubmit}>
                <label>
                    Name 
                    <input value={this.state.tea_name} onChange={this.handleNameChange} type="text" name="tea_name" />
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
                    <input value={this.state.description} onChange={this.handleDescriptionChange} type="text" name="description"/>
                </label>
                <label>
                    Is North American Native? True/False   
                    <input value={this.state.north_america_native} onChange={this.handleIsAmericanChange} type="text" name="north_america_native"/>
                </label>
                <label>
                    URL
                    <input value={this.state.url} onChange={this.handleUrlChange} type="text" name="URL"/>
                </label>
                <button>Submit</button>
            </form>
                }           
            </>
        )
    }
}
