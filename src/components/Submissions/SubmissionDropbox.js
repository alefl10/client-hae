import React from 'react';
import PropTypes from 'prop-types';

const SubmissionDropbox = ({ candidate, onCheck }) => (
  <div>
    <span className="submission-drop-box">
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          onClick={() => onCheck({ id: candidate.id, status: 'accepted' })}
          type="radio"
          name={candidate.id}
          id={`${candidate.id}accepted`}
          value="accepted"
        />
        <label className="form-check-label" htmlFor={`${candidate.id}accepted`}>accepted</label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          onClick={() => onCheck({ id: candidate.id, status: 'rejected' })}
          type="radio"
          name={candidate.id}
          id={`${candidate.id}rejected`}
          value="rejected"
        />
        <label className="form-check-label" htmlFor={`${candidate.id}rejected`}>rejected</label>
      </div>
    </span>
  </div>
);

SubmissionDropbox.propTypes = {
  onCheck: PropTypes.func.isRequired,
  candidate: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    years_exp: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    date_applied: PropTypes.string.isRequired,
    reviewed: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default SubmissionDropbox;
