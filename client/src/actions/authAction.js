import axios from 'axios';
import {returnErrors} from './errorAction';
import {
    USER_LOADED,
    USERS_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,

} from '../actions/types';



export const loadUser = () => (dispatch , getState) => {
    dispatch({ type: USERS_LOADING });



    
      axios
    .get('/api/auth/user', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
    };


export const login =({name,mdp})=>dispatch=>{
  const config={
    headers:{
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({name,mdp});
  axios
  .post('/api/auth',body,config)
  .then(res =>
    dispatch({
      type:LOGIN_SUCCESS,
      payload:res.data
    }))
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};






export const logout =()=>{
  return{
    type:LOGOUT_SUCCESS
  }
}




export const tokenConfig = getState=>{
  const token = getState().auth.token;

    const config = {
        headers: {
          'Content-type': 'application/json'
        }
      };
      if (token) {
        config.headers['x-auth-token'] = token;
      }
    return config;
}
