const workspace = require('./workspace');
const pushWorkspace = require('./pushWorkspace');

const main = async () => {
  // Write the workspace to the Structurizr backend.
  const response = await pushWorkspace(workspace);
  if (response) {
    console.log('Workspace pushed to Structurizr backend', response);
  }
};

main().catch(error => console.log(error));
