// src/Redux/slices/moviesSlice.js
import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  idFilter: '',
  ageFilter: {
    max: null,
    min: null,
  },
  salaryFilter: {
    max: null,
    min: null,
  },
  applied: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    initFilters: (state, action) => {
      state.ageFilter = {
        ...state.ageFilter,
        min: !state.ageFilter.min
          ? Math.min(...action.payload.map(o => o.employee_age))
          : state.ageFilter.min,
        max: !state.ageFilter.max
          ? Math.max(...action.payload.map(o => o.employee_age))
          : state.ageFilter.max,
      };
      state.salaryFilter = {
        ...state.salaryFilter,
        min: Math.min(...action.payload.map(o => o.employee_salary)),
        max: Math.max(...action.payload.map(o => o.employee_salary)),
      };
    },
    applyFilter: state => {
      state.applied = true;
    },
    resetFilter: () => initialState,
    updateIdFilter: (state, action) => {
      state.idFilter = action.payload;
    },
    updateAgeFilter: (state, action) => {
      state.ageFilter = action.payload;
    },
    updateSalaryFilter: (state, action) => {
      state.salaryFilter = action.payload;
    },
  },
});
export const {
  initFilters,
  updateAgeFilter,
  updateSalaryFilter,
  applyFilter,
  resetFilter,
  updateIdFilter,
} = filterSlice.actions;
export default filterSlice.reducer;
