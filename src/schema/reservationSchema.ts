import { z } from "zod";

const reservationSchema = z.object({
  totalPrice: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  listingId: z.string(),
});

export default reservationSchema;
