'use client';
import { CommentAPIService, PostAPIServices } from '@/api-services';
import { RootState } from '@/lib/redux/store';
import { SUCCESS_STATUS_CODE, SUCCESS_STATUS_MESSAGE } from '@/utils';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useCreatePost = () => {
    const router =  useRouter()
const user = useSelector((state: RootState) => state.auth.user);



  const { mutate: createPost, isLoading: createPostIsLoading } =
    useMutation((payload: any) => PostAPIServices.createPost(payload), {
        onSuccess: (data: any) => {
            debugger
       router.push(`/dashboard/${user.username}`);

      },
      onError: (error: any) => {
        toast.error(error);
      },
    });

  return {
    createPost,
    createPostIsLoading,
  };
};

export default useCreatePost;

