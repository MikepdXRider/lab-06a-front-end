import React from 'react'
import request from 'superagent';

export default async function getTeas() {
    const response = await request.get(`https://lab06b-be.herokuapp.com/teas`);

    this.setState({data: response.body});
}
