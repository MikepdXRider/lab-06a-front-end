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
       await this.fetchData();
    }


    fetchData = async () => {
        const response = await request.get(`https://lab06b-be.herokuapp.com/teas/${this.props.match.params.id}`);

        this.setState({data: response.body});
    }


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
                    <input onChange={this.handleNameChange} type="text" name="tea_name" />
                </label>
                <label>
                    Type   
                    <input onChange={this.handleTypeChange} type="text" name="type"/>
                </label>
                <label>
                    Description   
                    <input onChange={this.handleDescriptionChange} type="text" name="description"/>
                </label>
                <label>
                    Is North American Native? True/False   
                    <input onChange={this.handleIsAmericanChange} type="text" name="north_america_native"/>
                </label>
                <label>
                    URL
                    <input onChange={this.handleUrlChange} type="text" name="URL"/>
                </label>
                <p>Any unfilled input-field will remain unchanged.</p>
                <button>Submit</button>
            </form>
                }           
            </>
        )
    }
}
