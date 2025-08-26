"use server";
import * as v from "valibot";
import { db } from "./db";
import { withValidate } from "./decorators";
import { type User, userSchema } from "./domain";
import { failure, type ResultAsync, success } from "./result";

export const updateUser = withValidate(
  v.string(),
  userSchema(),
)(async (id, user): ResultAsync<User, string> => {
  // ^? (id: string, user: User)
  try {
    const updatedUser = await db.user.update({
      where: { id },
      data: user,
    });
    return success(updatedUser);
  } catch {
    return failure("Failed to update user");
  }
});
