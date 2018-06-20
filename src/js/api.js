import axios from 'axios';
import config from '../config.json';

const dateCleanUp = (date) => {
  let newDate = date.replace('T', ' ');
  newDate = newDate.replace('Z', '');
  const year = newDate.substring(0, 4);
  const month = newDate.substring(5, 7);
  const day = newDate.substring(8, 10);
  const time = newDate.substring(10);
  newDate = `${month}/${day}/${year} ${time}`;
  return newDate;
};

const filterDate = (data) => {
  const candidateList = data;
  if (data.length !== undefined) {
    candidateList.forEach((candidate, index) => {
      const date = dateCleanUp(candidate.date_applied);
      candidateList[index].date_applied = date;
    });
  } else {
    candidateList.date_applied = dateCleanUp(candidateList);
  }
  return candidateList;
};


export const fetchCandidate = candidateId =>
  axios.get(`${config.url}/candidates/${candidateId}`)
    .then(resp => filterDate(resp.data))
    .catch((err) => {
      console.log(err);
    });

export const fetchCandidateList = () =>
  axios.get(`${config.url}/candidates`)
    .then(resp => filterDate(resp.data))
    .catch((err) => {
      console.log(err);
    });

export const updateCandidate = (candidateId, status) =>
  axios.patch(`${config.url}/candidates/${candidateId}`, status)
    .then(resp => filterDate(resp.data))
    .catch((err) => {
      console.log(err);
    });
