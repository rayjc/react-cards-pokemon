import { useState } from 'react';
import axios from 'axios';
import uuid from "uuid";
import axiosErrorHandler from './util';


const useFlip = (initialBool = true) => {
  const [state, setState] = useState(initialBool);

  const flip = () => setState(state => !state);

  return [state, flip];
}


const useAxios = (baseUrl) => {
  const [data, setData] = useState([]);

  // make sure to wrap calls to exclude the event object
  const addData = async (endpoint = '') => {
    try {
      const res = await axios.get(baseUrl + endpoint);
      setData(d => [...d, { data: res.data, error: null, id: uuid() }]);
    } catch (error) {
      axiosErrorHandler(error);
      setData(d => [...d, { data: null, error, id: uuid() }]);
    }
  }

  return [data, addData];
}

export { useAxios, useFlip };