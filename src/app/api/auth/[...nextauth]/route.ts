import authOptions from "@/lib/authOptions";
import NextAuth, { AuthOptions } from "next-auth";

const handler: AuthOptions = NextAuth(authOptions);

export { handler as GET, handler as POST };
