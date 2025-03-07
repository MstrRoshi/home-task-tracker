import NextAuth from "next-auth";
import { authOptions } from "../../../../src/lib/auth";

// Log environment variables for debugging (redacted for security)
console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
console.log("GOOGLE_CLIENT_ID exists:", !!process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_SECRET exists:", !!process.env.GOOGLE_CLIENT_SECRET);

// Create the handler using NextAuth
const handler = NextAuth(authOptions);

// Export the handler as GET and POST
export { handler as GET, handler as POST }; 