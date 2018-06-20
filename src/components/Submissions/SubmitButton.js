import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SubmitButton extends Component {
  constructor(props) {
    super(props);
    this.buttonDisplay = this.buttonDisplay.bind(this);
  }

  buttonDisplay() {
    if (this.props.submit.length !== 0) {
      return 'btn btn-primary submit';
    }
    return 'btn btn-primary d-none';
  }

  render() {
    return (
      <span>
        <button
          className={this.buttonDisplay()}
          onClick={() => this.props.updateRequest()}
        >Submit
        </button>
      </span>
    );
  }
}

SubmitButton.propTypes = {
  updateRequest: PropTypes.func.isRequired,
  submit: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired || PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  })).isRequired,
};

export default SubmitButton;
