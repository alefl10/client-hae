import React, { Component } from 'react';
import _ from 'lodash';

import * as api from './js/api';
import CandidateList from './components/Candidates/CandidateList';
import SearchCandidates from './components/Candidates/SearchCandidates';
import SubmitButton from './components/Submissions/SubmitButton';

class App extends Component {
  constructor(props) {
    super(props);
    this.order = this.order.bind(this);
    this.reOrder = this.reOrder.bind(this);
    this.searchCandidates = this.searchCandidates.bind(this);
    this.reviewClick = this.reviewClick.bind(this);
    this.updateClick = this.updateClick.bind(this);
    this.showInfoP = this.showInfoP.bind(this);
    this.showSubmitButton = this.showSubmitButton.bind(this);
    this.updateRequest = this.updateRequest.bind(this);
  }

  componentWillMount() {
    this.setState({
      orderBy: 'name',
      orderDir: 'asc',
      queryText: '',
      reviewed: false,
      updateStatus: false,
      submit: [],
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
      return candidates.sort((a, b) =>
        new Date(a.date_applied).getTime() - new Date(b.date_applied).getTime());
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
      updateStatus: false,
      submit: [],
    });
  }

  updateClick() {
    this.setState({
      reviewed: false,
      updateStatus: !this.state.updateStatus,
      submit: [],
    });
  }

  showInfoP() {
    if (this.state.updateStatus === undefined) {
      return '';
    } else if (this.state.updateStatus) {
      return '';
    }
    return 'd-none';
  }

  showSubmitButton(candidate) {
    const {
      submit,
    } = this.state;
    let push = true;

    submit.forEach((item) => {
      if (item.id === candidate.id) {
        push = false;
      }
    });
    if (push) {
      submit.push(candidate);
      this.setState({
        submit,
      });
    } else {
      submit.forEach((item, index) => {
        if (item.id === candidate.id) {
          submit[index].status = item.status;
          this.setState({
            submit,
          });
        }
      });
    }
  }

  updateRequest() {
    const updateCandidate = [];
    const candidateList = this.state.candidateList;
    let errorFlag = false;

    this.state.candidateList.forEach((candidate, index) => {
      const tempCandidate = candidate;
      this.state.submit.forEach((item) => {
        if (item.id === candidate.id) {
          tempCandidate.status = item.status;
          tempCandidate.reviewed = true;
          candidateList[index] = tempCandidate;
          updateCandidate.push(tempCandidate);
        }
      });
    });
    this.state.submit.forEach(({ id, status }) => {
      api.updateCandidate(id, { status, reviewed: true })
        .then(updatedCandidate => console.log(updatedCandidate)) // For testing purposes
        .catch((err) => {
          errorFlag = true;
          console.log(err);
        });
    });
    if (!errorFlag) {
      this.setState({
        candidateList,
        orderBy: 'name',
        orderDir: 'asc',
        queryText: '',
        reviewed: false,
        updateStatus: false,
        submit: [],
      });
    } else {
      this.setState({
        orderBy: 'name',
        orderDir: 'asc',
        queryText: '',
        reviewed: false,
        updateStatus: false,
        submit: [],
      });
    }
  }
  render() {
    if (this.state.candidateList !== undefined) {
      let candidateList = [];
      const {
        queryText,
      } = this.state;

      this.state.candidateList.forEach((candidate) => {
        if (candidate.name.toLowerCase().indexOf(queryText.toLowerCase()) !== -1) {
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
            onUpdate={this.updateClick}
            updateStatus={this.state.updateStatus}
          />
          <div className="update-info center text-center">
            <h3 className={this.showInfoP()}>
              The following candidates are marked as pending. Update their status.
            </h3>
            <div>
              <SubmitButton
                submit={this.state.submit}
                updateRequest={this.updateRequest}
              />
            </div>
          </div>
          <ul className="item-list media-list">
            {
              candidateList.map(candidate =>
              (
                <CandidateList
                  key={candidate.id}
                  candidate={candidate}
                  reviewed={this.state.reviewed}
                  updateStatus={this.state.updateStatus}
                  onCheck={this.showSubmitButton}
                  submit={this.state.submit}
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
