'use client';
import { AuthAPIServices } from '@/api-services';
import { SUCCESS_STATUS_CODE } from '@/utils';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';

const useAuthService = () => {
  const router = useRouter();

  const login = async (username: string, password: string) => {
    try {
      const users = await AuthAPIServices.userDetails();
      // debugger

      // const user = users.find(
      //   (user: any) => user.username === username && user.password === password,
      // );
      // debugger

      const validUsers = users.filter((user: any) => user.password);

      // Find the user with the matching username and password
      const user = validUsers.find(
        (user: any) => user.username === username && user.password === password,
      );

      debugger;
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
        // If no matching user found, set error state
        // setLoading(false); // Stop loading
        // setError('Invalid username or password');
        return null;
      }
    } catch (error) {
      // setError(`Internal Server Error: ${error}`);
      return null;
    } finally {
      // setLoading(false);
    }
  };

  const signUp = async (
    username,
    password,
    email,
    fullName,
    status = 'Busy',
    profile_image = 'https://via.placeholder.com/150',
  ) => {
    debugger;
    //  setLoading(true);
    //  setError(''); // Reset error on each call
    //  setSuccess(false);

    try {
      const data = await AuthAPIServices.userDetails();
      //  const userConnection = await fetch(api.auth.signUp);
      //  const userConnetionData = await userConnection.json();

      const user = data.map((item: any) => item?.id);

      // Send the new user data to the API (via POST request)

      const payload = {
        username,
        password,
        email,
        fullName,
        status,
        profile_image,
        connections: [...user],
      };

      const response = AuthAPIServices.SingUp(payload);
      router.push('/login');
      //  const response = await fetch(api.auth.signUp, {
      //    method: 'POST',
      //    headers: { 'Content-Type': 'application/json' },
      //    body: JSON.stringify({
      //      username,
      //      password,
      //      email,
      //      fullname,
      //      status,
      //      profile_image,
      //      connections: [...user],
      //    }),
      //  });

      //  const data = await response.json();
    } catch (error) {}

    return {
      login,
      signUp,
    };
  };

  return {
    signUp,
    login,
  };
};

export default useAuthService;
