import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchCandidates extends Component {
  constructor(props) {
    super(props);
    this.handleSort = this.handleSort.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSort(e) {
    this.props.onReOrder(e.target.id, this.props.orderDir);
  }

  handleOrder(e) {
    this.props.onReOrder(this.props.orderBy, e.target.id);
  }

  handleSearch(e) {
    this.props.onSearch(e.target.value);
  }

  render() {
    return (
      <div className="row search-candidates justify-content-center">
        <div className="col-md-10">
          <div className="input-group">
            <input id="SearchCand" onChange={this.handleSearch} placeholder="Search" type="text" className="form-control" aria-label="Search Candidates" />
            <div className="input-group-btn">
              <button
                type="button"
                className="btn btn-primary dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >Sort by: <span className="caret" />
              </button>
              <ul className="dropdown-menu dropdown-menu-right text-center align-middle">
                <li><span id="name" onClick={this.handleSort}>Name {(this.props.orderBy === 'name') ? <i className="fas fa-check" /> : null}</span></li>
                <li><span id="date" onClick={this.handleSort}>Date {(this.props.orderBy === 'date') ? <i className="fas fa-check" /> : null}</span></li>
                <li><span id="status" onClick={this.handleSort}>Status {(this.props.orderBy === 'status') ? <i className="fas fa-check" /> : null}</span></li>
                <li role="separator" className="divider" />
                <li><span id="asc" onClick={this.handleOrder}>Asc {(this.props.orderDir === 'asc') ? <i className="fas fa-check" /> : null}</span></li>
                <li><span id="desc" onClick={this.handleOrder}>Desc {(this.props.orderDir === 'desc') ? <i className="fas fa-check" /> : null}</span></li>
              </ul>
              <button
                type="button"
                className="btn btn-primary reviewed"
                onClick={() => this.props.onReview()}
                aria-haspopup="true"
                aria-expanded="false"
              >{this.props.reviewed ? 'All' : 'Reviewed'}<span className="caret" />
              </button>
              <button
                type="button"
                className="btn btn-primary update-status"
                onClick={() => this.props.onUpdate()}
                aria-haspopup="true"
                aria-expanded="false"
              >{this.props.updateStatus ? 'Go Back' : 'Update Status'}<span className="caret" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SearchCandidates.propTypes = {
  orderBy: PropTypes.string.isRequired,
  orderDir: PropTypes.string.isRequired,
  onReOrder: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onReview: PropTypes.func.isRequired,
  reviewed: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  updateStatus: PropTypes.bool.isRequired,
};

export default SearchCandidates;
