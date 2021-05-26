import React from 'react';
class SubmitButton extends React.Component {
  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary"type="submit" disabled={this.props.disabled}
        onClick={()=>this.props.onClick()}
        >{this.props.text}</button>
      </React.Fragment>
    )
  }
};

export default SubmitButton;