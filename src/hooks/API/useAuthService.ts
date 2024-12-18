'use client';
import { AuthAPIServices } from '@/api-services';
import { useRouter } from 'next/navigation';

const useAuthService = () => {
  const router = useRouter();

  const login = async (username: string, password: string) => {
    try {
      const users = await AuthAPIServices.userDetails();
      const validUsers = users.filter((user: any) => user.password);
      const user = validUsers.find(
        (user: any) => user.username === username && user.password === password,
      );

      if (user) {
        return {
          id: user.id,
          username: user.username,
          fullname: user.fullname,
          email: user.email,
          status: user.status,
          profile_image: user.profile_image,
          posts: user.posts,
          connections: user.connections,
        };
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  const signUp = async (
    username: string,
    password: string,
    email: string,
    fullName: string,
    status: string = 'Busy',
    profile_image: string = 'https://via.placeholder.com/150',
  ) => {
    try {
      const data = await AuthAPIServices.userDetails();
      const user = data.map((item: any) => item?.id);

      const payload = {
        username,
        password,
        email,
        fullName,
        status,
        profile_image,
        connections: [...user],
      };

      await AuthAPIServices.SingUp(payload);
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return {
    signUp,
    login,
  };
};

export default useAuthService;
