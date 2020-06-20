import { useState, useEffect } from 'react';
import axios from 'axios';
import uuid from "uuid";
import axiosErrorHandler from './util';


const useFlip = (initialBool = true) => {
  const [state, setState] = useState(initialBool);

  const flip = () => setState(state => !state);

  return [state, flip];
}


const useAxios = (key, baseUrl) => {
  // const [data, setData] = useState([]);
  const [data, setData] = useSessionStorage(key, []);

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

  const clearAllData = () => setData([]);

  return [data, addData, clearAllData];
}


const useSessionStorage = (key, initialValue) => {
  const [state, setState] = useState(() => {
    try {
      const value = JSON.parse(window.sessionStorage.getItem(key) || JSON.stringify(initialValue));
      return value;
    } catch (error) {
      console.error(`Fail to parse ${key} in sessionStorage.`)
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof state == "object") {
      window.sessionStorage.setItem(key, JSON.stringify(state));
    } else {
      window.sessionStorage.setItem(key, state);
    }
  }, [state, key]);

  return [state, setState];
}


const useLocalStorage = (key, initialValue) => {
  const [state, setState] = useState(() => {
    try {
      const value = JSON.parse(window.localStorage.getItem(key) || JSON.stringify(initialValue));
      return value;
    } catch (error) {
      console.error(`Fail to parse ${key} in localStorage.`)
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof state == "object") {
      window.localStorage.setItem(key, JSON.stringify(state));
    } else {
      window.localStorage.setItem(key, state);
    }
  }, [state, key]);

  return [state, setState];
}

export { useAxios, useFlip, useSessionStorage, useLocalStorage };