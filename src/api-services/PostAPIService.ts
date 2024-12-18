import { API_ENDPOINTS, BASE_API_URL, Repo, RepoResponse } from '@/utils';
import CoreAPIService from './CoreAPIService';

const {
  POST: {
    GET_ALL_POSTS,
    CREATE_POST,
    DELETE_POST,
    GET_USER_POSTS,
    UPDATE_USER,
  },
} = API_ENDPOINTS;
// ******  TODO: 'AUTH API SERVICES'********
class PostAPIService {
  private services: CoreAPIService;

  constructor(baseURL?: string) {
    this.services = new CoreAPIService(baseURL as string);
  }

  userPost = async (id: string) => {
    const endpoint = `${GET_USER_POSTS}?user_id=${id}`;
    return this.services.get<any>(endpoint);
  };

  createPost = async (data: any) => {
    const endpoint = `${CREATE_POST}`;
    return this.services.post(endpoint, data);
  };

  updatePost = async (id: any, data: any) => {
    const endpoint = `${UPDATE_USER}/${id}`;
    return this.services.put(endpoint, data);
  };
}

const PostAPIServices = new PostAPIService(BASE_API_URL);
export default PostAPIServices;
