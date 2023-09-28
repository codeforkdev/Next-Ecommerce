import Server from "next/server";
import S3 from "aws-sdk/clients/s3";
import {
  S3Client,
  AbortMultipartUploadCommand,
  ListBucketsCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

import { Upload } from "@aws-sdk/lib-storage";
// const s3 = new S3({
//   apiVersion: '2006-03-01',
//   accessKeyId:
// })

export async function POST(req: Request, res: Server.NextResponse) {
  // console.log(await req.json());
  const form = await req.formData();
  const data = Object.fromEntries(form);

  console.log(data.file);
  const file: File = data.file as File;

  console.log(file);
  const client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.ACCESS_KEY as string,
      secretAccessKey: process.env.SECRET_KEY as string,
    },
  });

  const upload = new Upload({
    client,
    params: {
      Bucket: "codefork-ecommerce",
      Key: "folder/" + file.name,
      Body: file.stream(),
    },
  });

  await upload.done();
  return Server.NextResponse.json({ message: "upload to s3" });
}
