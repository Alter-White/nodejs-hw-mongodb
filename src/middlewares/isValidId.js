import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId))
    next(createHttpError(400, `id=${contactId} not valid`));

  next();
};
