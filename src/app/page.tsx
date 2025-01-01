import { track } from "~/server/actions/track";
import HomePageClient from "./clientPage";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const numFailed = await track({name: "views"});

  return (
    <HomePageClient 
      numFailed={numFailed}
    />
  );
}
