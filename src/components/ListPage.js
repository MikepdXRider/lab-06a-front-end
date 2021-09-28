import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import request from 'superagent'

export default class ListPage extends Component {
    state = {
        data: []
    }
    
    componentDidMount = async () => {
        await this.fetchData();
    }
    
    fetchData = async () => {
        const response = await request.get(`https://tea-dummy-get.herokuapp.com/teas`)

        console.log(response.body)
        this.setState({data: response.body})
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
                                    <h3>{dataObj.tea}</h3>
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
