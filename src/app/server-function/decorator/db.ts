import type { User } from "./domain";

/** Mock database */
export const db = {
  user: {
    update: async ({ where, data }: { where: { id: string }; data: User }) => {
      // Simulate a database update operation
      console.log(`Updating user with id ${where.id} with data`, data);
      return { id: where.id, ...data }; // Return the updated user object
    },
  },
};
