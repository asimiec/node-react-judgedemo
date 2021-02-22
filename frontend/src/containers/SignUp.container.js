import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom'
import * as signupActions from '../actions/SignUp.actions';
import { Form, Button, Card } from "react-bootstrap";
import { FormErrors } from './FormErrors';
export class SignUp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      email: "",
      phone: "",
      formErrors: { username: "",email: '', password: '', phone: "",},
      nameValid : false,
      phoneValid : false,
      emailValid: false,
      passwordValid: false,
      formValid: false
    };
    this.register = this.register.bind(this);
  }

  componentWillMount() {
    this.props.reinitializeState();
  }

  register(e) {
    this.props.registerRequest(this.state);
    e.preventDefault();
  }

  // validateForm() {
  //   return this.state.username.length > 0 && this.state.password.length > 0;
  // }

  // handleChange = event => {
  //   this.setState({
  //     [event.target.id]: event.target.value
  //   });
  // }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let nameValid = this.state.nameValid;
    let phoneValid = this.state.phoneValid;
    let passwordValid = this.state.passwordValid;
    let setPassword = []
    switch(fieldName) {
      case 'name':
        nameValid = !(value.length === 0);
        fieldValidationErrors.name = nameValid ? '' : ' should not be empty';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'phone':
        phoneValid = value.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
        fieldValidationErrors.phone = phoneValid ? '' : ' is invalid';
        break;
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
        if(value===this.state.username){
          setPassword.push('and not same as username') 
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
                    emailValid: emailValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  render() {
  	return (
  		<Card style={{ width: '18rem', margin: '0 auto', marginTop:'30px' }}>
        <Card.Body>
          <Card.Title>Register</Card.Title>
          <Form onSubmit={(e) => this.register(e)}>
          <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleUserInput}
              />
            </Form.Group>
            <Form.Group controlId="email">
            <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                value={this.state.email}
                name="email"
                onChange={this.handleUserInput}
                type="email"
              />
              </div>
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Phone No.</Form.Label>
              <Form.Control
                value={this.state.phone}
                onChange={this.handleUserInput}
                type="text"
                name="phone"
              />
               </Form.Group>
            <Form.Group controlId="password">
            <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={this.state.password}
                onChange={this.handleUserInput}
                type="password"
                name="password"
                minLength={8}
              />
              </div>
            </Form.Group>
            <Button
              block
              disabled={!this.state.formValid}
              type="submit"
              variant="primary"
            >
              Register
            </Button>
            {this.props.state.loading && <div><br/>Registering you...</div>}
            {this.props.state.error && <div><br/>{JSON.stringify(this.props.state.errorMessage.message)}</div>}
            {this.props.state.success && <div><br/>Success! You can now log in.</div>}
          </Form>
        </Card.Body>
      </Card>
  	);
  }
}

// map state from store to props
const mapStateToProps = (state) => {
  return {
    state: state.signup
  }
}
// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    registerRequest: (registerData) => dispatch(signupActions.register(registerData)),
    reinitializeState: () => dispatch(signupActions.reinitializeState()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp))
