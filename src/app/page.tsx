import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { Navbar } from "./_components/navbar";
import { SigninLink } from "./_components/signlink";

export default async function Home() {
  // const session = await auth();
  return <h1>Hello</h1>;
}
