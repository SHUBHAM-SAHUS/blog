import { API_ENDPOINTS, BASE_API_URL, Repo, RepoResponse } from '@/utils';
import CoreAPIService from './CoreAPIService';

const {
  COMMENT: {
    GET_ALL_COMMENTS,
    GET_COMMENT,
    CREATE_COMMENT,
    UPDATE_COMMENT,
    DELETE_COMMENT,
    GET_COMMENTS_FOR_POST,
  },
} = API_ENDPOINTS;
// ******  TODO: 'AUTH API SERVICES'********
class CommentAPIService {
  private services: CoreAPIService;

  constructor(baseURL?: string) {
    this.services = new CoreAPIService(baseURL as string);
  }

  createComment = async (data: any) => {
    const endpoint = `${CREATE_COMMENT}`;
    return this.services.post(endpoint, data);
  };

  commentForPost = async (id: string) => {
    const endpoint = `${GET_COMMENTS_FOR_POST}/${id}`;
    return this.services.get<any>(endpoint);
  };
}

const CommentAPIServices = new CommentAPIService(BASE_API_URL);
export default CommentAPIServices;
