export type TGetlistEmployeesAsync = {
  type: 'employees/getList';
};

export type TGetEmployeeDataByIdAsync = {
  type: 'employees/getData';
  payload: string;
};
