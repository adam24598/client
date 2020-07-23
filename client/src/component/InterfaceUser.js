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
 import {updateUser} from  '../actions/userActions';
 import PropTypes from 'prop-types'

 class InterfaceUser extends Component{
  state={
      modal:false,
      name:'',
      mdp:'',
      solde:'',
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
  const user={

name:this.state.name,

solde:this.state.solde,

  }
  this.props.updateUser(user);
  
}
  render(){
    

    
        
               
      return(
          <div>
               
<Form onSubmit={this.onSubmit}>
<FormGroup controlId="formBasicEmail">
  <Label>solde</Label>
  <Input type="number" name="solde" id="user" placeholder="Entre solde" onChange={this.onChange} />
  
</FormGroup>


<Button variant="primary" type="submit" className='mr-3'>
  verser
</Button>
<Button variant="primary" type="submit" className='mr-3'>
  retirer
</Button>
<Button
variant="primary" type="submit" className='mr-3'
onClick={this.toggle}
>virement</Button>

</Form>
<Modal
  isOpen={this.state.modal}
  toggle={this.toggle}>

      <ModalHeader toggle={this.toggle}>
          nom destinataire
      </ModalHeader>
      <ModalBody>
          <Form onSubmit={this.onSubmit}>
          
          <FormGroup>
                  <Label for="user">User</Label>
                  <Input 
                  type="number"
                  name="name"
                  id="user"
                  placeholder="Add name"
                  onChange={this.onChange}/>
                  <Button variant="primary" type="submit" className='mt-3 mr-3'>
                        ok
                  </Button>

              </FormGroup>
              </Form>
              </ModalBody>
              </Modal>

</div>)}}
const mapStateToProps = state =>({
  user : state.user
});

export default connect (mapStateToProps,{updateUser}) (InterfaceUser);