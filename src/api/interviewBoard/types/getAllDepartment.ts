export interface GetAllDepartment {
  code: string;
  data: Data;
  message: string;
}

export interface Data {
  departments: Department[];
  num: number;
}

export interface Department {
  departmentId?: number;
  departmentName?: string;
}
