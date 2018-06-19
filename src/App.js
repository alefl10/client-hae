import React, { Component } from 'react';
import _ from 'lodash';

import * as api from './js/api';
import CandidateList from './components/Candidates/CandidateList';
import SearchCandidates from './components/Candidates/SearchCandidates';

class App extends Component {
  constructor(props) {
    super(props);
    this.order = this.order.bind(this);
    this.reOrder = this.reOrder.bind(this);
    this.searchCandidates = this.searchCandidates.bind(this);
    this.reviewClick = this.reviewClick.bind(this);
  }

  componentWillMount() {
    this.setState({
      orderBy: 'name',
      orderDir: 'asc',
      queryText: '',
      reviewed: false,
      updateStatus: true,
    });
  }
  componentDidMount() {
    api.fetchCandidateList()
      .then((candidateList) => {
        this.setState({
          candidateList,
        });
      });
  }

  order(candidates) {
    const {
      orderBy,
      orderDir,
    } = this.state;
    if (orderBy === 'date' && orderDir === 'asc') {
      return candidates.sort((a, b) => new Date(b.date_applied) - new Date(a.date_applied));
    } else if (orderBy === 'date' && orderDir === 'desc') {
      return candidates.sort((a, b) => new Date(a.date_applied).getTime() - new Date(b.date_applied).getTime());
    }
    return _.orderBy(candidates, item => item[orderBy].toLowerCase(), orderDir);
  }

  reOrder(orderBy, orderDir) {
    this.setState({
      orderBy,
      orderDir,
    });
  }

  searchCandidates(q) {
    this.setState({
      queryText: q,
    });
  }

  reviewClick() {
    this.setState({
      reviewed: !this.state.reviewed,
    });
  }

  render() {
    if (this.state.candidateList !== undefined) {
      let candidateList = [];
      const {
        queryText,
      } = this.state;

      this.state.candidateList.forEach((candidate) => {
        if (candidate.name.toLowerCase().indexOf(queryText) !== -1) {
          candidateList.push(candidate);
        }
      });

      if (candidateList.length !== 0) {
        candidateList = this.order(candidateList);
      }

      return (
        <div className="App">
          <SearchCandidates
            orderBy={this.state.orderBy}
            orderDir={this.state.orderDir}
            onReOrder={this.reOrder}
            onSearch={this.searchCandidates}
            onReview={this.reviewClick}
            reviewed={this.state.reviewed}
            updateStatus={this.state.updateStatus}
          />
          <ul className="item-list media-list">
            {
              candidateList.map(candidate =>
              (
                <CandidateList
                  key={candidate.id}
                  candidate={candidate}
                  reviewed={this.state.reviewed}
                />
            ))
          }
          </ul>
        </div>
      );
    } return null;
  }
}

export default App;
