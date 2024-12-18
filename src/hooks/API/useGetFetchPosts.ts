'use client';
import { AuthAPIServices, PostAPIServices } from '@/api-services';
import { SUCCESS_STATUS_CODE } from '@/utils';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';

const useGetFetchPosts = (userId: string) => {
  const router = useRouter();

  const {
    data: userPosts,
    isLoading: isAllPostLoading,
    refetch: refetchUserList,
  } = useQuery<any>(['userlist'], () => PostAPIServices.userPost(userId));

  return {
    posts: userPosts,
    isLoading: isAllPostLoading,
  };
};

export default useGetFetchPosts;
