//Sort Function
export const sort_employees = (data, key) => {
  let tmp = [...data];
  if (key === 'name') {
    tmp.sort(function (a, b) {
      if (a.employee_name < b.employee_name) {
        return -1;
      }
      if (a.employee_name > b.employee_name) {
        return 1;
      }
      return 0;
    });
  } else if (key === 'age') {
    tmp.sort(function (a, b) {
      if (a.employee_age < b.employee_age) {
        return -1;
      }
      if (a.employee_age > b.employee_age) {
        return 1;
      }
      return 0;
    });
  } else if (key === 'salary') {
    tmp.sort(function (a, b) {
      if (a.employee_salary < b.employee_salary) {
        return -1;
      }
      if (a.employee_salary > b.employee_salary) {
        return 1;
      }
      return 0;
    });
  }

  return tmp;
};

//Filter function
export const filter_employees = (data, ageFilter, salaryFilter, idFilter) => {
  if (!ageFilter.max) return [];

  let tmp = [...data];
  //Apply Age
  tmp = tmp.filter(
    el => el.employee_age >= ageFilter.min && el.employee_age <= ageFilter.max,
  );
  //Apply Salary
  tmp = tmp.filter(
    el =>
      el.employee_salary >= salaryFilter.min &&
      el.employee_salary <= salaryFilter.max,
  );
  //Apply ID
  if (idFilter.trim() !== '') {
    tmp = tmp.filter(el => el.id == idFilter);
  }
  return tmp;
};

//Validate on update or delete
export const validate = (name, age, salary) => {
  let error = '';
  if (name.trim().length < 3) error += 'name length must be more than 3!\n';
  if (age.trim().length === 0 || isNaN(+age.trim()))
    error += 'Age is not valid!\n';
  if (salary.trim().length === 0 || isNaN(+salary.trim()))
    error += 'Salary is not valid!\n';

  return error;
};
