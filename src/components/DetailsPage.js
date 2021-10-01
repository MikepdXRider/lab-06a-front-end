import React, { Component } from 'react';
import request from 'superagent';

export default class DetailsPage extends Component {
    state = {
        data: {},
        // updateDisplay: 'none'
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
   
    render() {
        return (
            <>
                <div>
                    <h3>{this.state.data.tea}</h3>
                    <img src={this.state.data.url} alt='tea'/>
                    <p>Type: {this.state.data.type}</p>
                    <p>Description: {this.state.data.description}</p>
                    <p>Native to North America: {String(this.state.data.north_america_native)}</p>
                </div>
                <button onClick={this.handleDeleteClick}>Delete</button>
                {/* <button onClick={this.showUpdateForm}>Update</button> */}
                
            </>
        )
    }
}
