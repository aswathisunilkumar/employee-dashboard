export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    department: string;
    role: string;
    joinDate: string; // ISO date string
    skills: string[];
    leaveBalance: {
        annual: number;
        sick: number;
        used: number;
    };
}
