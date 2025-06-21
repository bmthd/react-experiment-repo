"use server";

import type { Subject } from "./employees";
import employees from "./employees.json";

export const getSubjects = async () => {
  const subjects = Object.keys(employees[0]!).filter((key) => key !== "id" && key !== "name");
  return subjects;
};

/**
 *
 * @param subject
 * @returns
 */
export const getObjects = async (subject: Subject) => {
  const objects = new Set<string>();
  for (const employee of employees) {
    objects.add(employee[subject]);
  }
  return Array.from(objects).sort((a, b) => a.localeCompare(b));
};
