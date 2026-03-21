import z from 'zod';

type ErrorFieldsType<T> = Partial<Record<keyof z.input<T>, string>>;

export type RawFieldsType<T> = Record<keyof z.input<T>, FormDataEntryValue>;

interface IValidateFailureResult<T> {
  errorResponse: {
    error: null;
    errorFields: ErrorFieldsType<T>;
    fields: RawFieldsType<T>;
    success: false;
  };
  success: false;
}

interface IValidateSuccessResult<T> {
  data: z.infer<T>;
  successResponse: {
    error: null;
    fields: RawFieldsType<T>;
    success: true;
  };
  success: true;
}

export const validateSchema = <T extends z.ZodObject<z.ZodRawShape>>(
  schema: T,
  formData: FormData,
): IValidateFailureResult<T> | IValidateSuccessResult<T> => {
  const formFields = Object.fromEntries(formData) as RawFieldsType<T>;
  const parsedFormFields = schema.safeParse(formFields);

  if (!parsedFormFields.success) {
    const errorsTree = z.treeifyError(parsedFormFields.error);
    const errorFields: ErrorFieldsType<T> = {};

    if (errorsTree.properties) {
      for (const key in errorsTree.properties) {
        const fieldError = errorsTree.properties[key];
        const fieldErrorMessage = fieldError?.errors?.[0];

        if (fieldErrorMessage) {
          errorFields[key as keyof z.input<T>] = fieldErrorMessage;
        }
      }
    }

    return {
      errorResponse: {
        error: null,
        errorFields,
        fields: formFields,
        success: false,
      },
      success: parsedFormFields.success,
    };
  }

  return {
    data: parsedFormFields.data,
    successResponse: {
      error: null,
      fields: formFields,
      success: true,
    },
    success: parsedFormFields.success,
  };
};
