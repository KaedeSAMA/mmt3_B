/**
 * @description  单个问题的基本格式
 */

type TUnitProblem = {
  id: number;
  type: number;
  content: string;
  value: string[];
  isRequired: boolean;
};

/**
 * @description  部门类型
 */
type Tdepartment = {
  name: string;
  questionList: TUnitProblem[];
};

/**
 * @description  报名表类型
 */
type TRegFormType = {
  basic: TUnitProblem[];
  department: Tdepartment[];
  comprehensive: TUnitProblem[];
};

export type { TUnitProblem, TRegFormType, Tdepartment };
