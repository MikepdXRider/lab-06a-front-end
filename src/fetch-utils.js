// import React from 'react'
import request from 'superagent';

// tested ✔
export async function getTeas() {
    try{
        const response = await request.get(`https://lab06b-be.herokuapp.com/teas`);
        console.log(response.body);
        return response.body;
    } catch (error) {
        console.log(error);
    }
}

// tested ✔
export async function getTeaTypes() {
    try{
        const response = await request.get(`https://lab06b-be.herokuapp.com/tea-types`);
        return response.body;
    } catch (error) {
        console.log(error);
    }
}

// NOT TESTED ❗
export async function getTeaById(id) {
    try{
        const response = await request.get(`https://lab06b-be.herokuapp.com/teas/${id}`);
        return response.body;
    } catch (error) {
        console.log(error);
    }
}

// NOT TESTED ❗
export async function deleteTeaById(id) {
    try{
        await request.delete(`https://lab06b-be.herokuapp.com/teas/${id}`);
    } catch (error) {
        console.log(error);
    }
}

// tested ✔
export async function createTea(newTeaObj) {
    try{
        await request.post('https://lab06b-be.herokuapp.com/teas')
        .send(newTeaObj);
    } catch (error) {
        console.log(error);
    }
}

// NOT TESTED ❗
export async function updateTeaById(id, teaObj) {
    try{
        await request.put(`https://lab06b-be.herokuapp.com/teas/${id}`)
        .send(teaObj);
    } catch (error) {
        console.log(error);
    }
}




