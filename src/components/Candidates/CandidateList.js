import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SubmissionDropbox from '../Submissions/SubmissionDropbox';

class CandidateList extends Component {
  constructor(props) {
    super(props);
    this.checkReviewed = this.checkReviewed.bind(this);
    this.showDropbox = this.showDropbox.bind(this);
    this.displayCandidate = this.displayCandidate.bind(this);
  }
  checkReviewed() {
    if (!this.props.reviewed && !this.props.updateStatus) {
      return true;
    } else if (this.props.reviewed && !this.props.updateStatus && this.props.candidate.reviewed) {
      return true;
    } else if (!this.props.reviewed && this.props.updateStatus && !this.props.candidate.reviewed) {
      return true;
    }
    return false;
  }

  displayCandidate() {
    return `candidate-item media ${this.checkReviewed() ? '' : 'd-none'}`;
  }
  showDropbox() {
    if (!this.props.candidate.reviewed && this.props.updateStatus) {
      return (
        <SubmissionDropbox
          candidate={this.props.candidate}
          onCheck={this.props.onCheck}
          submit={this.props.submit}
        />
      );
    }
    return this.props.candidate.status;
  }

  render() {
    return (
      <li className={this.displayCandidate()}>
        <div className="candidate-info media-body">
          <div className="candidate-head">
            <span className="candidate-name">{this.props.candidate.name} </span>
            <span className="cand-date pull-right">Applied on {this.props.candidate.date_applied}</span>
          </div>
          <div className="years-exp"><span className="label-item">Years of Experience: </span>
            {this.props.candidate.years_exp}
          </div>
          <div className="status"><span className="label-item">status: </span>
            {this.showDropbox()}
          </div>
          <div className="years-exp"><span className="label-item">Reviewed: </span>
            {this.props.candidate.reviewed ? 'YES' : 'NO'}
          </div>
          <div className="years-exp"><span className="label-item">Description: </span>
            <div className="cand-description">
              {this.props.candidate.description}
            </div>
          </div>
        </div>
      </li>
    );
  }
}

CandidateList.propTypes = {
  candidate: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    years_exp: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    date_applied: PropTypes.string.isRequired,
    reviewed: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  reviewed: PropTypes.bool.isRequired,
  updateStatus: PropTypes.bool.isRequired,
  onCheck: PropTypes.func.isRequired,
  submit: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  })).isRequired,
};

export default CandidateList;
