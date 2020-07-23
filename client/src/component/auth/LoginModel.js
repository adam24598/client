import React,{Component} from 'react';
import{
    Button,
    Modal,
    ModalHeader,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    ModalBody,
    Alert
} from 'reactstrap';
 import {connect} from 'react-redux';
import PropTypes from 'prop-types';
 import {login} from  '../../actions/authAction';
 import {clearErrors} from '../../actions/errorAction';


 class LoginModal extends Component{
state={
    modal:false,
    name:'',
    mdp:'',
    msg: null,
    role:''
    
};
static propTypes={
    isAuthenticated:PropTypes.bool,
    error : PropTypes.object.isRequired,
    login:PropTypes.func.isRequired,
    clearErrors:PropTypes.func.isRequired,
    isAdmin:PropTypes.bool,
    
};



componentDidUpdate(prevProps){
    const {error,isAuthenticated}=this.props;
    if(error!==prevProps.error){
        if(error.id==='LOGIN_FAIL'){
            this.setState({msg:error.msg.msg});
        } else{
            this.setState({msg:null});
        }
    }
    

    if (this.state.modal){
        if(isAuthenticated){
            this.toggle();
        }
    }


}

toggle=()=>{
    this.props.clearErrors();
    this.setState({
        modal:!this.state.modal
    });
};



onChange=(e)=>{
    this.setState({[e.target.name]:e.target.value});
};


onSubmit = e =>{
    e.preventDefault();
    
    const{name,mdp}= this.state;
    const user ={
        name,
        mdp
    }

    this.props.login(user);

};



render(){
    return(
        <div>
            <NavLink onClick={this.toggle} href='#'>
                Login
            </NavLink>

<Modal isOpen={this.state.modal} toggle={this.toggle}>

        <ModalHeader toggle={this.toggle} >
            login
        </ModalHeader>
        <ModalBody>
            {this.state.msg?(
                <Alert color='danger'>{this.state.msg}</Alert>
            ): null}
            <Form onSubmit={this.onSubmit}>
            
            <FormGroup>
                    <Label for="user">User</Label>
                    <Input 
                    type="text"
                    name="name"
                    id="user"
                    placeholder="enter name"
                    onChange={this.onChange}/>

                
                
                    <Label for="user">mdp</Label>
                    <Input 
                    type="text"
                    name="mdp"
                    id="user"
                    placeholder="enter password"
                    onChange={this.onChange}/>

                
                <Button
                color="dark"
                style={{marginTop:'2rem'}}
                block>Login</Button>
                </FormGroup>
            </Form>
        </ModalBody>

</Modal>



        </div>
    )
}
 }
const mapStateToProps = state =>({
   isAuthenticated:state.auth.isAuthenticated,
   isAdmin:state.auth.isAdmin,
   error:state.error
   
});
 

export default connect(mapStateToProps,{login,clearErrors})(LoginModal);