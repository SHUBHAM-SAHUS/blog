'use client';
import { CommentAPIService } from '@/api-services';
import { SUCCESS_STATUS_MESSAGE } from '@/utils';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

const useCreateComments = () => {
  const { mutate: createComment, isLoading: createCommentIsLoading } =
    useMutation((payload: any) => CommentAPIService.createComment(payload), {
      onSuccess: (data: any) => {
        if (data.status === SUCCESS_STATUS_MESSAGE) {
        } else {
        }
      },
      onError: (error: any) => {
        toast.error(error);
      },
    });

  return {
    createComment,
    createCommentIsLoading,
  };
};

export default useCreateComments;
