import express from 'express';
import { validationResult, ValidationChain } from 'express-validator';

export const validate = (validations: ValidationChain[]) => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    await Promise.all(validations.map(validation => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(400);
    const errorList = [];
    for await (const iterator of errors.array()) {
      errorList.push(`${iterator.msg}: ${iterator.param}`);
    }
    next({ message: errorList.toString() });
  };
};
