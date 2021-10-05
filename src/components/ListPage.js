import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import request from 'superagent';

export default class ListPage extends Component {
    state = {
        data: []
    }
    

    componentDidMount = async () => {
         // update to call an imported fetchData function
        await this.fetchData();
    }
    
    // Move contents into a function in a fetch-utils.js file.
    // Then delete this.
    fetchData = async () => {
        const response = await request.get(`https://lab06b-be.herokuapp.com/teas`);

        this.setState({data: response.body});
    }


    render() {
        return (
            <>
                <ul>
                    {
                        this.state.data.map(dataObj => {
                        return(
                            <Link to={`/teas/${dataObj.id}`}>
                                <li key={dataObj.id}>
                                    <h3>{dataObj.tea_name}</h3>
                                    <img src={dataObj.url} alt='tea'/>
                                    <p>Type: {dataObj.type}</p>
                                    <p>Description: {dataObj.description}</p>
                                    <p>Native to North America: {dataObj.north_america_native.toString()}</p>
                                </li>
                            </Link>
                        )
                        })
                    }
                </ul>
            </>
        )
    }
}
