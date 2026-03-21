import z from 'zod';
import { isErrorWithMessage, isFetchBaseQueryError } from './errorsTypeGuards';
import { RawFieldsType } from './validateSchema';

export const handleErrorAction = <T extends z.ZodObject<z.ZodRawShape>>(
  error: unknown,
  fields: RawFieldsType<T>,
): { error: string; fields: RawFieldsType<T>; success: false } => {
  if (isFetchBaseQueryError(error)) {
    if (isErrorWithMessage(error)) {
      return {
        error: error.message,
        fields,
        success: false,
      };
    } else {
      return {
        error: `Ошибка сервера ${error.status}`,
        fields: fields,
        success: false,
      };
    }
  }

  if (error instanceof Error) {
    return {
      error: error.message,
      fields,
      success: false,
    };
  }

  return {
    error: 'Неизвестная ошибка',
    fields,
    success: false,
  };
};
