import { NextApiResponse } from "next";

export const responseApi = (
  res: NextApiResponse,
  status: boolean,
  statusCode: number,
  message: string,
  data: any = {}
) => {
  res.status(statusCode).json({
    status: status,
    statusCode: statusCode,
    message: message,
    data: data,
  });
};

export const responseApiSuccess = (res: NextApiResponse, data: any = {}) => {
  responseApi(res, true, 200, "success", data);
};

export const responseApiFailed = (res: NextApiResponse) => {
  responseApi(res, false, 400, "failed");
};

export const responseApiNotFound = (res: NextApiResponse) => {
  responseApi(res, true, 404, "Not found");
};

export const responseApiAccessDenied = (res: NextApiResponse) => {
  responseApi(res, true, 403, "Access denied");
};

export const responseApiMethodNotAllowed = (res: NextApiResponse) => {
  responseApi(res, true, 405, "Method not allowed");
};
