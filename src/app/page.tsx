import { trackView } from "~/server/actions/track";
import HomePageClient from "./clientPage";

export default async function HomePage() {
  const numFailed = await trackView();

  return (
    <HomePageClient 
      numFailed={numFailed}
    />
  );
}
