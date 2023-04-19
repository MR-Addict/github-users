import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default function pageSession() {
  return getServerSession(authOptions);
}
