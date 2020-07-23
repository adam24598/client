import React ,{Component,Fragment} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserList from './component/UserList';
import UserModal from './component/UserModal';
import InterfaceUser from './component/InterfaceUser';
import AppNavbar from './component/AppNavbar';
import {
  Container
} from 'reactstrap';
import {Provider,connect} from 'react-redux';
import PropTypes from 'prop-types';
import store from './store';
import {loadUser} from './actions/authAction';



class App extends Component{
  static propTypes={
    auth:PropTypes.object.isRequired
};
  componentDidMount(){
    store.dispatch(loadUser());
    
  };
render(){

  const{isAuthenticated,user}=this.props.auth;
  




    const authLinks =(
        <Fragment>
            <Container>
            
     <InterfaceUser/>
</Container> 
        </Fragment>
    );
    const adminLinks =(
      <Fragment>
          <Container>

   <UserModal/>
   <UserList/>
</Container> 
      </Fragment>
  );
    
    


  return (
    <Provider store={store}>
     <div className = "App" >
    <AppNavbar/>  
    

    {user && user.name==='admin' ? adminLinks: isAuthenticated ?authLinks:''}


                  </div>
    </Provider>



  );
}}

const mapStateToProps = state =>({
  auth: state.auth
});
export default connect (mapStateToProps,null)(App);