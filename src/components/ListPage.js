import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import request from 'superagent';
import { getTeas } from '../fetch-utils.js';

export default class ListPage extends Component {
    state = {
        data: []
    }

    componentDidMount = async () => {
        const allTeaData = await getTeas();

        this.setState({data: allTeaData});
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
                                        <p>Type: {dataObj.tea_type}</p>
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
