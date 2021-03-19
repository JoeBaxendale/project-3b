const StructurizrClient = require('structurizr-typescript').StructurizrClient;

module.exports = pushWorkspace = workspace => {
  const WORKSPACE_ID = 64366;
  const API_KEY = 'a10e9264-7323-483d-a105-628bf0797c7e';
  const API_SECRET = '5e5b9fb8-8c66-4096-9c23-28d9b4ae0c89';

  const client = new StructurizrClient(API_KEY, API_SECRET);

  return client.putWorkspace(WORKSPACE_ID, workspace);
};
