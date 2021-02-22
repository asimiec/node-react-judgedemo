import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom'
import { Form, Button, Card } from "react-bootstrap";
import * as profileActions from "../actions/Profile.actions";
import { FormErrors } from './FormErrors';
export class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      oldpassword: "",
      password: "",
      formErrors: { password: ''},
      passwordValid : false,
      formValid: false
    };
  }

  componentWillMount(){
    this.props.fetchUserData();
    this.props.reinitializeState();
  }

  // handleChange = event => {
  //   this.setState({
  //     [event.target.id]: event.target.value
  //   });
  // }
  
  // validateForm() {
  //   return this.state.oldpassword.length > 0 && this.state.password.length > 0 && this.state.oldpassword !== this.state.password;
  // }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let passwordValid = this.state.passwordValid;
    let setPassword = []
    switch(fieldName) {
       case 'password':
         if(!value.match(/(?=.*\d).+$/)){
          setPassword.push('one numeric digit') 
        }
        if(!value.match(/(?=.*[a-z]).+$/)){
          setPassword.push('at least one lowercase letter') 
        }
        if(!value.match(/^(?=.*[A-Z]).+$/)){
          setPassword.push('at least one uppercase letter') 
        }
        if(!value.match(/^(?=.*[^a-zA-Z0-9]).+$/)){
          setPassword.push('one special character') 
        }
        if(!value.match(/^(?!.*\s).{8,16}$/)){
          setPassword.push('8 to 16 characters') 
        }
        if(value===this.state.oldpassword){
          setPassword.push('not same as oldpassword') 
        }
        if(setPassword.length>0){
          passwordValid = false
          fieldValidationErrors.password =  ` should be \n ${setPassword.join('\n')}`;
          break;
        }else{
          passwordValid = true
          fieldValidationErrors.password = ''
          //break
        }
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.passwordValid});
  }

  changePassword(e) {
    this.props.changePassword(this.state);
    e.preventDefault();
  }

  render() {
  	return (
  		<Card style={{ width: '18rem', margin: '0 auto', marginTop:'30px' }}>
        <Card.Body>
          <Card.Title>Profile</Card.Title>
          <div>
            <div><strong>Username</strong> : {this.props.state.me.username}</div>
          </div>
          <br/>
          <div>
            <div><strong>Email</strong> : {this.props.state.me.email}</div>
          </div>
          <br/>
          <div>
            <div><strong>Phone</strong> : {this.props.state.me.phone}</div>
          </div>
          <br/>
          <Form onSubmit={(e) => {e.preventDefault(); this.changePassword(e)}}>
          <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
            <Form.Group controlId="oldpassword">
              <Form.Label>Old password</Form.Label>
              <Form.Control
                value={this.state.oldpassword}
                onChange={this.handleUserInput}
                type="password"
                name = "oldpassword"
                minLength={8}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>New password</Form.Label>
              <Form.Control
                value={this.state.password}
                onChange={this.handleUserInput}
                type="password"
                minLength={8}
                name = "password"
              />
            </Form.Group>
            <Button
              block
              disabled={!this.state.formValid}
              type="submit"
              variant="primary"
            >
              Change password
            </Button>
          </Form>
          {this.props.state.changePassError && <div><br/>{JSON.stringify(this.props.state.changePassErrorMessage.message)}</div>}
          {this.props.state.changePassSuccess && <div><br/>Success! You can now use your new password.</div>}
        </Card.Body>
      </Card>
  	);
  }
}

// map state from store to props
const mapStateToProps = (state) => {
  return {
    state: state.profile
  }
}
// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserData: () => dispatch(profileActions.fetchUserData()),
    changePassword: (data) => dispatch(profileActions.changePassword(data)),
    reinitializeState: () => dispatch(profileActions.reinitializeState()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))
