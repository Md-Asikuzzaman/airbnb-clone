import { z } from "zod";

const rentSchema = z.object({
  title: z.string(),
  description: z.string().min(3).max(20),
  category: z.string(),
  location: z.null(),
  guestCount: z.number(),
  roomCount: z.number(),
  bathroomCount: z.number(),
  imageSrc: z.string(),
  price: z.number(),
});

export default rentSchema;
