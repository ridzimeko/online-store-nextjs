import { retrieveDataById, updateData } from "@/lib/firebase/service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      jwt.verify(
        token,
        process.env.NEXTAUTH_SECRET || "",
        async (err: any, decoded: any) => {
          if (decoded) {
            const profile: any = await retrieveDataById("users", decoded.id);
            if (profile) {
              profile.id = decoded.id;
              res.status(200).json({
                status: true,
                statusCode: 200,
                message: "success",
                data: profile,
              });
            } else {
              res.status(404).json({
                status: true,
                statusCode: 404,
                message: "Not found",
                data: profile,
              });
            }
          } else {
            res.status(403).json({
              status: true,
              statusCode: 403,
              message: "Access denied",
              data: {},
            });
          }
        }
      );
    }
  } else if (req.method === "PUT") {
    const { data } = req.body;
    const { user }: any = req.query;
    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (error: any, decoded: any) => {
        if (decoded) {
          if (data.password) {
            const passwordConfirm = await bcrypt.compare(
              data.oldPassword,
              data.encryptedPassword
            );

            if (!passwordConfirm) {
              res.status(400).json({
                status: true,
                statusCode: 400,
                message: "failed",
              });
            }

            delete data.oldPassword;
            delete data.encryptedPassword;
            data.password = await bcrypt.hash(data.password, 10);
          }

          await updateData("users", user[0], data, (result: boolean) => {
            if (result) {
              res.status(200).json({
                status: true,
                statusCode: 200,
                message: "success",
              });
            } else {
              res.status(400).json({
                status: false,
                statusCode: 400,
                message: "failed",
              });
            }
          });
        } else {
          res.status(403).json({
            status: false,
            statusCode: 403,
            message: "Access denied",
          });
        }
      }
    );
  }
}
