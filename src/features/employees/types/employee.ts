/** ISO 8601 date string in YYYY-MM-DD format (e.g. "2021-03-15") */
export type ISODateString = string;

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  role: string;
  joinDate: ISODateString;
  skills: string[];
  leaveBalance: {
    annual: number;
    sick: number;
    used: number;
  };
}
