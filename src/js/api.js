import axios from 'axios';
import config from '../config.json';

const dateCleanUp = (date) => {
  let newDate = date.replace('T', ' ');
  newDate = newDate.replace('Z', '');
  const year = newDate.substring(0, 4);
  const month = newDate.substring(5, 7);
  const day = newDate.substring(8, 10);
  const time = newDate.substring(10, 20);
  newDate = `${day}/${month}/${year} ${time}`;
  return newDate;
};

const cleanUpId = (candidate) => {
  const tempCandidate = candidate;
  const id = tempCandidate._id;
  delete tempCandidate._id;
  tempCandidate.id = id;
  return tempCandidate;
};

const filterDate = (data) => {
  const candidateList = data;
  if (data.length !== undefined) {
    if (candidateList[0].date_applied.indexOf('/') !== -1) return data;
    candidateList.forEach((candidate, index) => {
      const date = dateCleanUp(candidate.date_applied);
      candidateList[index].date_applied = date;
    });
  } else {
    if (candidateList.date_applied.indexOf('/') !== -1) return data;
    candidateList.date_applied = dateCleanUp(candidateList);
  }
  return candidateList;
};

const filterId = (data) => {
  const candidateList = data;
  if (candidateList.length !== undefined) {
    candidateList.forEach((candidate, index) => {
      const tempCandidate = candidate;
      if (Object.prototype.hasOwnProperty.call(tempCandidate, '_id')) {
        candidateList[index] = cleanUpId(tempCandidate);
      }
    });
  }
  return candidateList;
};

export const fetchCandidate = candidateId =>
  axios.get(`${config.url}/candidates/${candidateId}`)
    .then(resp => cleanUpId(filterDate(resp.data)))
    .catch((err) => {
      console.log(err);
    });

export const fetchCandidateList = () =>
  axios.get(`${config.url}/candidates`)
    .then(resp => filterId(filterDate(resp.data)))
    .catch((err) => {
      console.log(err);
    });

export const updateCandidate = (candidateId, status) =>
  axios.put(`${config.url}/candidates/${candidateId}/`, status)
    .then(resp => cleanUpId(filterDate(resp.data)))
    .catch((err) => {
      console.log(err);
    });
