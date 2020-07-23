import axios from'axios';
import {GET_USERS,ADD_USER,DELETE_USER,USERS_LOADING,PUT_USER} from './types';

export const getUsers=()=> dispatch =>{
    dispatch(setUsersLoadind());
    axios.get('/api/users')
    .then(res=>dispatch({
        type :GET_USERS,
        payload:res.data

    }))
};


export const deleteUser=(id)=>dispatch=>{
   axios.delete(`/api/users/${id}`).then(res=>
    dispatch({
        type:DELETE_USER,
        payload:id
    }))
};
export const addUser=user=>dispatch=>{
    axios.post('/api/users',user)
    .then(res=>dispatch({
        type:ADD_USER,
        payload:res.data
    }))
};

export const setUsersLoadind=()=>{
    return{
        type : USERS_LOADING
    };
};
export const updateUser=(user)=>dispatch=>{
    axios.put('/api/auth/',user).then(res=>
     dispatch({
         type:PUT_USER,
         payload:res.data
     }))
 };