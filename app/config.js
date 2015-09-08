import API from 'fl-api-service';

export default function (_isServerSide) {
  if (_isServerSide === true) {
    // set the domain
    API.config.setDomain('localhost:5000');
  }

  // Configure the API service
  API.config.setEndpoint('/api');
}
