import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { InitialModal } from "@/components/modals/initial-modal";




const SetupPage = async () => {
  const profile = await initialProfile();

  if (!profile) {
    return redirect('http://localhost:3000/dashboard');
  }
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });
  console.log("passing through setup page");
  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return <InitialModal />;
}
 
export default SetupPage;