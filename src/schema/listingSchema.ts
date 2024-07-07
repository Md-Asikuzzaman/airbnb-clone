import { z } from "zod";

const listingSchema = z.object({
  title: z.string(),
  description: z.string().min(3).max(20),
  category: z.string(),
  location: z.any(),
  guestCount: z.number(),
  roomCount: z.number(),
  bathroomCount: z.number(),
  imageSrc: z.string(),
  price: z.string(),
});

export default listingSchema;
