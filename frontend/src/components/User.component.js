import React from 'react';
export class User extends React.Component {
  
  // constructor(props) {
  //   super(props);
  // }
  isMe() {
    if (this.props.user.username === this.props.profileState.me.username) {
      return true;
    }
  }

  render() {
  	return (
  		<tr>
            <td>{this.props.user.username}</td>
            <td>{this.props.user.email}</td>
            <td>{this.props.user.phone}</td>
            <td>{formatDate(this.props.user.updated_at)}</td>
        </tr>
  	);
  }

}
function formatDate(string){
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(string).toLocaleDateString([],options);
}