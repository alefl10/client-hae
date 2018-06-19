import React, { Component } from 'react';


class CandidateList extends Component {
  constructor(props) {
    super(props);
    this.checkReviewed = this.checkReviewed.bind(this);
  }
  checkReviewed() {
    if (!this.props.reviewed || (this.props.reviewed && this.props.candidate.reviewed)) {
      return true;
    }
    console.log('Bye');
    return false;
  }
  render() {
    return (
      <li className="candidate-item media" className={this.checkReviewed() ? '' : 'd-none'}>
        <div className="candidate-info media-body">
          <div className="candidate-head">
            <span className="candidate-name">{this.props.candidate.name} </span>
            <span className="cand-date pull-right">Applied on {this.props.candidate.date_applied}</span>
          </div>
          <div className="years-exp"><span className="label-item">Years of Experience: </span>
            {this.props.candidate.years_exp}
          </div>
          <div className="status"><span className="label-item">status: </span>
            {this.props.candidate.status}
          </div>
          <div className="years-exp"><span className="label-item">Reviewed: </span>
            {this.props.candidate.reviewed ? 'YES' : 'NO'}
          </div>
          <div className="years-exp"><span className="label-item">Description: </span>
            <div className="cand-notes">
              {this.props.candidate.description}
            </div>
          </div>
        </div>
      </li>
    );
  }
}


export default CandidateList;
