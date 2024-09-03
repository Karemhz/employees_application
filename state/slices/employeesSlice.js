// src/Redux/slices/moviesSlice.js
import {createSlice} from '@reduxjs/toolkit';
import {
  CREATED,
  DELETED,
  FAILED,
  LOADING,
  SUCCEEDED,
  UPDATED,
} from '../../util/status';
import {
  createEmployee,
  deleteEmployee,
  fetchEmployees,
  updateEmployee,
} from './employees_thunk';

const initialState = {
  employees: [],
  all: [],
  status: 'idle',
  error: null,
  employee_status: 'idle',
  employee_loading: false,
  employee_error: null,
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    updateEmployees: (state, action) => {
      state.employees = action.payload;
    },
    updateAllEmployees: (state, action) => {
      state.all = action.payload;
    },
    resetEmployeeStatus: state => {
      state.employee_status = 'idle';
      state.employee_error = null;
    },
  },
  extraReducers: builder => {
    function loadingSharedReducer(state) {
      state.status = LOADING;
    }
    function pendingEmployee(state) {
      state.employee_loading = true;
    }
    function update_reducer(state, action) {
      let newData = state.all.filter(e => e.id !== action.payload.id);
      state.all = [action.payload, ...newData];
      state.employees = [action.payload, ...newData];
      state.employee_status = UPDATED;
      state.employee_loading = false;
    }
    function create_Reducer(state, action) {
      let newID = Math.max(...state.all.map(o => o.id));
      console.warn(newID);
      state.all = [{...action.payload, id: newID + 1}, ...state.all];
      state.employees = state.all;
      state.employee_status = CREATED;
      state.employee_loading = false;
    }
    function Read_Reducer(state, action) {
      state.status = SUCCEEDED;
      state.employees = action.payload;
      state.all = action.payload;
    }
    function reject_Reducer(state, action) {
      state.status = FAILED;
      state.error = action.error.message;
    }
    function rejectEmployee(state, action) {
      state.employee_status = FAILED;
      state.employee_loading = false;
      state.employee_error = action.error.message;
    }
    function delete_Reducer(state, action) {
      state.all = state.all.filter(e => action.payload !== e.id);
      state.employees = state.all;
      state.employee_loading = false;
      state.employee_status = DELETED;
    }

    builder
      .addCase(fetchEmployees.pending, loadingSharedReducer)
      .addCase(createEmployee.pending, pendingEmployee)
      .addCase(updateEmployee.pending, pendingEmployee)
      .addCase(deleteEmployee.pending, pendingEmployee)

      .addCase(fetchEmployees.rejected, reject_Reducer)
      .addCase(updateEmployee.rejected, rejectEmployee)
      .addCase(createEmployee.rejected, rejectEmployee)
      .addCase(deleteEmployee.rejected, rejectEmployee)

      .addCase(fetchEmployees.fulfilled, Read_Reducer)
      .addCase(createEmployee.fulfilled, create_Reducer)
      .addCase(updateEmployee.fulfilled, update_reducer)
      .addCase(deleteEmployee.fulfilled, delete_Reducer);
  },
});
export const {updateAllEmployees, updateEmployees, resetEmployeeStatus} =
  employeesSlice.actions;
export default employeesSlice.reducer;
