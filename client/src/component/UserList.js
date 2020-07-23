import React,{Component} from 'react';
import {Container,ListGroupItem,Button, ListGroup} from 'reactstrap';
import {CSSTransition,TransitionGroup} from 'react-transition-group';
import {connect} from 'react-redux';
import {getUsers,deleteUser}from '../actions/userActions';
import PropTypes from 'prop-types'




class UserList extends Component{


componentDidMount(){
    this.props.getUsers();
}
onDeleteClick=(id)=>{
    this.props.deleteUser(id);
}

render(){
    
    const {users}=this.props.user;
    return (
        <Container>
            
<ListGroup>
    <TransitionGroup className="User-List">
        {users.map(({_id,name,solde})=>(
           <CSSTransition key={_id} timeout={500} classNames="fade">
            <ListGroupItem >
                <Button className="remove-btn"
                color="danger"
                size="sm"
                onClick={this.onDeleteClick.bind(this,_id)}>&times;</Button>
                
                
                <h5>Name:</h5>{name}<h5 >Solde:</h5>{solde}</ListGroupItem></CSSTransition>
            ))}
    </TransitionGroup>
</ListGroup>
</Container>
    );

}
}
UserList.propTypes = {
    getUsers :PropTypes.func.isRequired,
    user:PropTypes.object.isRequired
}

const mapStateToProps =(state)=>({
    user:state.user
})




export default connect(mapStateToProps,{getUsers,deleteUser}) (UserList);