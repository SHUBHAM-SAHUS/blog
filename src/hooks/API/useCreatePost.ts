'use client';
import { CommentAPIService, PostAPIServices } from '@/api-services';
import { RootState } from '@/lib/redux/store';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { login as setLogin } from '@/lib/redux/slices/authSlice';

const useCreatePost = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const { mutate: createPost, isLoading: createPostIsLoading } = useMutation(
    (payload: any) => PostAPIServices.createPost(payload),
    {
      onSuccess: (data: any) => {
        router.push(`/dashboard/${user?.username}`);
      },
      onError: (error: any) => {
        toast.error(error);
      },
    },
  );

  const { mutate: updatePost, isLoading: updatePostIsLoading } = useMutation(
    (payload: any) => PostAPIServices.updatePost(user?.id, payload),
    {
      onSuccess: (data: any) => {
        dispatch(setLogin(data));
        Cookies.set('user', JSON.stringify(data));
        router.push(`/dashboard/${user?.username}`);
      },
      onError: (error: any) => {
        toast.error(error);
      },
    },
  );

  return {
    createPost,
    createPostIsLoading,
    updatePost,
    updatePostIsLoading,
  };
};

export default useCreatePost;
