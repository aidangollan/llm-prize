import { track } from "~/server/actions/track";
import HomePageClient from "./clientPage";

export default async function HomePage() {
  const numFailed = await track({name: "message"});

  return (
    <HomePageClient 
      numFailed={numFailed}
    />
  );
}
