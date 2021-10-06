// import React from 'react'
import request from 'superagent';

export async function getTeas() {
    try{
        const response = await request.get(`https://lab06b-be.herokuapp.com/teas`);
        return response.body;
    } catch (error) {
        console.log(error);
    }
}


export async function getTeaTypes() {
    try{
        const response = await request.get(`https://lab06b-be.herokuapp.com/tea-types`);
        return response.body;
    } catch (error) {
        console.log(error);
    }
}


export async function createTea(newTeaObj) {
    try{
        await request.post('https://lab06b-be.herokuapp.com/teas')
        .send(newTeaObj);
    } catch (error) {
        console.log(error);
    }
}




