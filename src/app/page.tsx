import { track } from "~/server/actions/track";
import HomePageClient from "./clientPage";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const numFailedUsers = await track({name: "views"});
  const numFailedMessages = await track({name: "message"});

  return (
    <HomePageClient 
      numFailedUsers={numFailedUsers}
      numFailedMessages={numFailedMessages}
    />
  );
}
