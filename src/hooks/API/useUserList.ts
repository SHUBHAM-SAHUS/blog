'use client';
import { AuthAPIServices } from '@/api-services';
import { SUCCESS_STATUS_CODE } from '@/utils';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';

const useUserList = () => {
  const {
    data: users,
    isLoading: isAllProfileTagsLoading,
    refetch: refetchUserList,
  } = useQuery<any>(['userlisttttt'], () => AuthAPIServices.userDetails());

  return {
    users,
    isAllProfileTagsLoading,
    refetchUserList,
  };
};

export default useUserList;
