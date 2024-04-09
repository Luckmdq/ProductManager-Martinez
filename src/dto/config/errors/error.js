import { ErrorEnum } from "./error.enum";

export const ErrorHandler = (error, req, res, next) => {
  console.log(error.cause);
  switch (error.code) {
    case ErrorEnum.INVALID_TYPE_ERROR:
        return res.status(400).send({error:error.name})
    case ErrorEnum.INVALID_PARAM_ERROR:
        return res.status(400).send({error:error.name})
    case ErrorEnum.USER_NOT_FOUND_ERROR:
        return res.status(400).send({error:error.name})
    default:
        return res.status(400).send({error:"error no contemplado"})
  }
};
