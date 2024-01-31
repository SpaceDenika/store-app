import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export interface IErrorMessage {
  message: FetchBaseQueryError | SerializedError;
}