import React, { Component } from 'react'
import request from 'superagent'

export default class SearchPage extends Component {
    componentDidMount = async () => {
        await this.fetchData();
    }
    
    fetchData = async () => {
        const response = await request.get()
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
