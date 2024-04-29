import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5001';

export const generateIdeas = (data) => {
  console.log("sending data to generate ideas", data)
  return axios.post(`${BASE_URL}/generateIdeas`, data)
};

export const generateImage = (data) => {
  console.log("Generating images with data...", data)
  return axios.post(`${BASE_URL}/generateImage`, data)
};
