'use client';
import {  CommentAPIService } from '@/api-services';
import { SUCCESS_STATUS_CODE, SUCCESS_STATUS_MESSAGE } from '@/utils';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';

const useCreateComments = () => {
//   const {
//     data: users,
//     isLoading: isAllProfileTagsLoading,
//     refetch: refetchUserList,
//   } = useQuery<any>(['userlist'], () => .userDetails());
    
    
    const { mutate: createComment, isLoading: createCommentIsLoading } = useMutation(
      (payload: any) => CommentAPIService.createComment(payload),
      {
        onSuccess: (data: any) => {
          if (data.status === SUCCESS_STATUS_MESSAGE) {
          } else {
          }
        },
        onError: (error: any) => {
          toast.error(error);
        },
      },
    );

  return {
    createComment,
    createCommentIsLoading,
  };
};

export default useCreateComments;


