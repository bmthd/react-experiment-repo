export type Employee = {
  id: string;
  name: string;
  jobTitle: string;
  department: string;
  position: string;
  office: string;
  employmentType: string;
};

export type Subject = keyof Omit<Employee, "id" | "name">;
