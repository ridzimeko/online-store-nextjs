import { retrieveDataById, updateData } from "@/lib/firebase/service";
import {
  responseApiFailed,
  responseApiMethodNotAllowed,
  responseApiNotFound,
  responseApiSuccess,
} from "@/utils/responseApi";
import { verify } from "@/utils/verifyToken";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    verify(req, res, false, async (decoded: any) => {
      const user: any = await retrieveDataById("users", decoded.id);

      if (user) {
        user.id = decoded.id;
        responseApiSuccess(res, user.carts);
      } else {
        responseApiNotFound(res);
      }
    });
  } else if (req.method === "PUT") {
    const { data } = req.body;
    verify(req, res, false, async (decoded: any) => {
      await updateData("users", decoded.id, data, (result: boolean) => {
        if (result) {
          responseApiSuccess(res);
        } else {
          responseApiFailed(res);
        }
      });
    });
  } else {
    responseApiMethodNotAllowed(res);
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
