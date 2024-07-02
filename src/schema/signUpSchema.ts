import { z } from "zod";

const signUpSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(3).max(20),
});

export default signUpSchema;
