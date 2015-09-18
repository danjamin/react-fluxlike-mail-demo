import {API} from 'fluxlike';

export default function (_isServerSide) {
  // Configure the API service
  API.config.setDomain('http://localhost:5001');
  API.config.setEndpoint('/api');
}
