import React, { Component } from 'react'
import request from 'superagent'

export default class DetailsPage extends Component {
    state = {
        data: {}
    }

    componentDidMount = async () =>{
       await this.fetchData()
    }

    fetchData = async () => {
        const response = await request.get(`https://lab06b-be.herokuapp.com/teas/${this.props.match.params.id}`)
        console.log(response.body)
        this.setState({data: response.body})
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
            </>
        )
    }
}
