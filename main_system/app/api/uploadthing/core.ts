import { currentProfile } from "@/lib/current-profile";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
  const user = await currentProfile();
  console.log("error image failed uploaded");
  if (!user) throw new Error("Unauthorized");
  return { userId: user.userId };
}

export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "1MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => { }),
  messageFile: f(["image", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => { })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;