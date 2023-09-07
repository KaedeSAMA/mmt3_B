import { _axios } from '@/server/http';
import { GetAllDepartment } from './types/getAllDepartment';
import { BeforeNumData } from './types/beforeNumData';
import { BeforeNumDataArg } from './types/beforeNumData';
import { BeforeOrgPieChart } from './types/beforeOrgPieChart';
import { BeforeOrgLineChart } from './types/beforeOrgLineChart';
import { BeforeDepPieChart } from './types/beforeDepPieChart';
import { BeforeDepPieChartArg } from './types/beforeDepPieChart';
import { BeforeDepLineChart } from './types/beforeDepLineChart';
import { BeforeDepLineChartArg } from './types/beforeDepLineChart';

const getAllDepartment = async () => {
  const data = await _axios.get<GetAllDepartment, null>(
    '/local/b/interview/departments'
  );
  if (data.code !== '00000') {
    ElMessage.error(data.message);
    return;
  }
  return data.data;
};

const beforeNumData = async (departmentId: number) => {
  const data = await _axios.get<BeforeNumData, BeforeNumDataArg>(
    '/local/b/interview/before/numData',
    departmentId ? { departmentId } : undefined
  );
  if (data.code !== '00000') {
    ElMessage.error(data.message);
    return;
  }
  return data.data;
};

const beforeOrgPieChart = async () => {
  const data = await _axios.get<BeforeOrgPieChart, null>(
    '/local/b/interview/before/orgPieChart'
  );
  if (data.code !== '00000') {
    ElMessage.error(data.message);
    return;
  }
  return data.data;
};

const beforeOrgLineChart = async () => {
  const data = await _axios.get<BeforeOrgLineChart, null>(
    '/local/b/interview/before/orgLineChart'
  );
  if (data.code !== '00000') {
    ElMessage.error(data.message);
    return;
  }
  return data.data;
};

const beforeDepPieChart = async (departmentId: number) => {
  const data = await _axios.get<BeforeDepPieChart, BeforeDepPieChartArg>(
    '/local/b/interview/before/depPieChart',
    { departmentId }
  );
  if (data.code !== '00000') {
    ElMessage.error(data.message);
    return;
  }
  return data.data;
};

const beforeDepLineChart = async (departmentId: number) => {
  const data = await _axios.get<BeforeDepLineChart, BeforeDepLineChartArg>(
    '/local/b/interview/before/depLineChart',
    { departmentId }
  );
  if (data.code !== '00000') {
    ElMessage.error(data.message);
    return;
  }
  return data.data;
};

export {
  getAllDepartment,
  beforeNumData,
  beforeOrgPieChart,
  beforeOrgLineChart,
  beforeDepPieChart,
  beforeDepLineChart
};
