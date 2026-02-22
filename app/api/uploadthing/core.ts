import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getSession } from "@/hooks/get-session";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Product images uploader
  productImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const session = await getSession();

      if (!session?.user) {
        throw new UploadThingError("Anda harus login untuk mengupload gambar");
      }

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { url: file.ufsUrl, uploadedBy: metadata.userId };
    }),

  // Multiple product images uploader
  productImages: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 5,
    },
  })
    .middleware(async () => {
      const session = await getSession();

      if (!session?.user) {
        throw new UploadThingError("Anda harus login untuk mengupload gambar");
      }

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { url: file.ufsUrl, uploadedBy: metadata.userId };
    }),

  // PDF Uploader for CVs
  pdfUploader: f({
    pdf: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const session = await getSession();

      if (!session?.user) {
        throw new UploadThingError("Anda harus login untuk mengupload file");
      }

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { url: file.ufsUrl, uploadedBy: metadata.userId };
    }),

  // Public Image Uploader for Reviews
  publicImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      // No auth required for public reviews
      return { uploadedBy: "anonymous" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { url: file.ufsUrl, uploadedBy: metadata.uploadedBy };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
