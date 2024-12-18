import { API_ENDPOINTS, BASE_API_URL, Repo, RepoResponse } from '@/utils';
import CoreAPIService from './CoreAPIService';

const {
  AUTH: { SIGN_UP, LOGIN },
} = API_ENDPOINTS;
// ******  TODO: 'AUTH API SERVICES'********
class AuthAPIService {
  private services: CoreAPIService;

  constructor(baseURL?: string) {
    this.services = new CoreAPIService(baseURL as string);
  }

  SingUp = async (data: any) => {
    const endpoint = `${SIGN_UP}`;
    return await this.services.post(endpoint, data);
  };

  userDetails = async () => {
    const endpoint = `${LOGIN}`;
    return this.services.get<any>(endpoint);
  };
}

const AuthAPIServices = new AuthAPIService(BASE_API_URL);
export default AuthAPIServices;
