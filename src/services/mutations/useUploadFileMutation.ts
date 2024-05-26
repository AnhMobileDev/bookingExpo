import { useMutation, UseMutationOptions } from 'react-query';
import { AxiosError } from 'axios';

import { request } from '../request';

export const UPLOAD_ENDPOINT = '/api/media/upload/image';

export type UploadImageMutationResponse = {
  id: string;
  fileSize: number;
  name: string;
  originalUrl: string;
  thumbUrl: string;
  mimeType: string;
  isDeleted: false;
  ownerId: null;
  type: string;
  fullThumbUrl: string;
  fullOriginalUrl: string;
};
export type UploadImageMutationInput = FormData;

export type UploadImageMutationOptions = UseMutationOptions<
  UploadImageMutationResponse,
  AxiosError,
  UploadImageMutationInput
>;

export function useUploadImageMutation(options?: UploadImageMutationOptions, onProgress?: (percent: number) => void) {
  return useMutation(
    (values) =>
      request
        .post(UPLOAD_ENDPOINT, values, {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 1));
            onProgress && onProgress(percentCompleted);
          },
        })
        .then((res) => res.data),
    options,
  );
}
