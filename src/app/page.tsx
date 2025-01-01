import { track } from "~/server/actions/track";
import HomePageClient from "./clientPage";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [numFailedUsers, numFailedMessages] = await Promise.all([
    track({name: "views"}),
    track({name: "message"})
  ]);

  return (
    <HomePageClient 
      numFailedUsers={numFailedUsers}
      numFailedMessages={numFailedMessages}
    />
  );
}
