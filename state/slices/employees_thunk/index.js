import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  CREATE_EMPLOYEE_URL,
  DELETE_EMPLOYEE_URL,
  GET_EMPLOYEES_URL,
  UPDATE_EMPLOYEE_URL,
} from '../../../util/api';
import axios from 'axios';

//GET EMPLOYEES
export const fetchEmployees = createAsyncThunk('fetchEmployees', async () => {
  const response = await axios.get(GET_EMPLOYEES_URL);
  return response.data.data;
});

//DELETE EMPLOYEE
export const deleteEmployee = createAsyncThunk('deleteEmployee', async id => {
  const response = await axios.delete(DELETE_EMPLOYEE_URL + id.toString());
  return id;
});

//UPDATE EMPLOYEE
export const updateEmployee = createAsyncThunk(
  'updateEmployee',
  async employee => {
    const response = await axios.put(
      UPDATE_EMPLOYEE_URL + employee.id.toString(),
    );
    return employee;
  },
);

//CREATE EMPLOYEE
export const createEmployee = createAsyncThunk(
  'createEmployee',
  async employee => {
    const {employee_name, employee_age, employee_salary} = employee;
    const response = await axios.post(CREATE_EMPLOYEE_URL, {
      employee_name,
      employee_age,
      employee_salary,
    });
    return employee;
  },
);
