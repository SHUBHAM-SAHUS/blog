'use client';

import { PostAPIServices } from '@/api-services';
import CommentAPIServices from '@/api-services/CommentAPIService';
import { SUCCESS_STATUS_CODE } from '@/utils';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

interface PostWithComments {
  id: string;
  title: string;
  content: string;
  comments?: Comment[];
}

interface Comment {
  id: string;
  postId: string;
  text: string;
}

const useGetFetchPosts = (userId: string) => {
  // Fetch posts
  const {
    data: postsData,
    isLoading: isPostsLoading,
    error: postsError,
    refetch: refetchPosts,
  } = useQuery(['userPosts', userId], () => PostAPIServices.userPost(userId), {
    enabled: !!userId, // Fetch only if userId exists
    onError: (error: any) => {
      toast.error(`Failed to fetch posts: ${error.message}`);
    },
  });

  // Combine posts with comments
  const fetchPostsWithComments = async (): Promise<PostWithComments[]> => {
    try {
      if (!postsData || !Array.isArray(postsData)) return [];

      // Attach comments to each post
      const postsWithComments = await Promise.all(
        postsData.map(async (post: any) => {
          try {
            const commentsResponse = await CommentAPIServices.commentForPost(
              post.id,
            );
            const comments: Comment[] = await commentsResponse.json();

            return { ...post, comments };
          } catch (error) {
            console.error(
              `Failed to fetch comments for post ${post.id}`,
              error,
            );
            return { ...post, comments: [] };
          }
        }),
      );

      return postsWithComments;
    } catch (error) {
      toast.error('An error occurred while fetching posts with comments.');
      return [];
    }
  };

  const { data: postsWithComments, isLoading: isCommentsLoading } = useQuery(
    ['postsWithComments', userId],
    fetchPostsWithComments,
    {
      enabled: !!postsData, // Fetch only after posts are fetched
    },
  );

  return {
    posts: postsWithComments || [],
    isLoading: isPostsLoading || isCommentsLoading,
    error: postsError,
    refetchPosts,
  };
};

export default useGetFetchPosts;


