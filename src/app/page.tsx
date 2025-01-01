import { track } from "~/server/actions/track";
import HomePageClient from "./clientPage";
import { MESSAGE, VIEWS } from "~/constants/track";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [numFailedUsers, numFailedMessages] = await Promise.all([
    track({name: VIEWS}),
    track({name: MESSAGE})
  ]);

  return (
    <HomePageClient 
      numFailedUsers={numFailedUsers}
      numFailedMessages={numFailedMessages}
    />
  );
}
