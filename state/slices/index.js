import {combineReducers} from 'redux';
// Import your slices here
import employeesSlice from './employeesSlice';
import filterSlice from './filterSlice';

const rootReducer = combineReducers({
  employees_data: employeesSlice,
  filters: filterSlice,
});

export default rootReducer;
