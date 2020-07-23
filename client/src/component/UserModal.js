import React,{Component} from 'react';
import{
    Button,
    Modal,
    ModalHeader,
    Form,
    FormGroup,
    Label,
    Input,
    ModalBody
} from 'reactstrap';
 import {connect} from 'react-redux';
 import {addUser} from  '../actions/userActions';


 class UserModal extends Component{
state={
    modal:false,
    name:'',
    mdp:'',
    solde:'',
    role:''
}
toggle=()=>{
    this.setState({
        modal:!this.state.modal
    });

}


onChange=(e)=>{
    this.setState({[e.target.name]:e.target.value});
};
onSubmit = e =>{
    e.preventDefault();
    const newUser={

name:this.state.name,
mdp:this.state.mdp,
solde:this.state.solde,

    }
    this.props.addUser(newUser);
    this.toggle();
}

render(){
    return(
        <div>
            
<Button
color="dark"
style={{marginBottom:'2rem',
marginTop:'2rem'}}
onClick={this.toggle}
>Add user</Button>
<Modal
    isOpen={this.state.modal}
    toggle={this.toggle}>

        <ModalHeader toggle={this.toggle}>
            Add to User List
        </ModalHeader>
        <ModalBody>
            <Form onSubmit={this.onSubmit}>
            
            <FormGroup>
                    <Label for="user">User</Label>
                    <Input 
                    type="text"
                    name="name"
                    id="user"
                    placeholder="Add name"
                    onChange={this.onChange}/>

                </FormGroup>
                <FormGroup>
                    <Label for="user">mdp</Label>
                    <Input 
                    type="password"
                    name="mdp"
                    id="user"
                    placeholder="Add password"
                    onChange={this.onChange}/>

                </FormGroup>
                <FormGroup>
                    <Label for="user">solde</Label>
                    <Input 
                    type="number"
                    name="solde"
                    id="user"
                    placeholder="Add credit"
                    onChange={this.onChange}/>

                </FormGroup>
                <Button
                color="dark"
                style={{marginTop:'2rem'}}
                block>Add User</Button>
            </Form>
        </ModalBody>

</Modal>



        </div>
    )
}
 }
const mapStateToProps = state =>({
    user : state.user
});

 export default connect(mapStateToProps,{addUser})(UserModal);