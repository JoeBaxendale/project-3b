const Workspace = require('structurizr-typescript').Workspace;
const CreateImpliedRelationshipsUnlessAnyRelationshipExistsStrategy = require('structurizr-typescript')
  .CreateImpliedRelationshipsUnlessAnyRelationshipExistsStrategy;
const Location = require('structurizr-typescript').Location;
const ElementStyle = require('structurizr-typescript').ElementStyle;
const Tags = require('structurizr-typescript').Tags;
const Shape = require('structurizr-typescript').Shape;
const Format = require('structurizr-typescript').Format;

const WEB_BROWSER_TAG = 'Web Browser';
const DATABASE_TAG = 'Database';
const DIRECTORY_TAG = 'Directory';

const workspace = new Workspace(
  'Workforce Planning Architecture',
  'The architecture of the Workforce Planning application.'
);
const model = workspace.model;
model.impliedRelationshipsStrategy = new CreateImpliedRelationshipsUnlessAnyRelationshipExistsStrategy();
const viewSet = workspace.views;

// Create the context diagram...

// Create the system.
const workforcePlanning = model.addSoftwareSystem(
  'Workforce Planning',
  'Application to visualise booking systems for any domain in the form of Gantt charts.',
  Location.Internal
);

// The consuming developer persona.
const consumingDeveloper = model.addPerson(
  'Consuming Developer',
  'The developer actually using the Gantt component provided by this project in their application.',
  Location.External
);

// The extending developer persona.
const extendingDeveloper = model.addPerson(
  'Extending Developer',
  'The developer in BT extending on this project.',
  Location.External
);

consumingDeveloper.uses(workforcePlanning, 'Uses');
extendingDeveloper.uses(workforcePlanning, 'Uses');

// Create external dependencies.
const contextView = viewSet.createSystemContextView(
  workforcePlanning,
  'context',
  'The System Context diagram for the Workforce Planning Data Visualisation project.'
);
contextView.addAllSoftwareSystems();
contextView.addAllPeople();
// contextView.setAutomaticLayout(true);

// Create the container diagram...

const webApplication = workforcePlanning.addContainer(
  'Web Application',
  'Delivers the static content and the data visualisation single page application.',
  'MERN Stack'
);

const architectureModel = workforcePlanning.addContainer(
  'C4 Model',
  'All of the diagrams created to show the architecture of the application and its contributors.',
  'Structurizr'
);

const workingAgreement = workforcePlanning.addContainer(
  'Working Agreement',
  'Guidelines developed as to how the team must work together to create a positive, productive process.',
  'Agile'
);

const pipeline = workforcePlanning.addContainer(
  'CI/CD Pipeline',
  'Pipeline to build, test, and deploy the application.',
  'GitLab CI/CD'
);

const documentation = workforcePlanning.addContainer(
  'Documentation',
  'The documentation of the application.',
  'README'
);

const testing = workforcePlanning.addContainer(
  'Automated Tests',
  'Tests to prove the system works as expected, and to find faults and/or risks within it.',
  'Frontend: Jest, Enzyme || Backend: Mocha, Chai, Sinon'
);

const singlePageApplication = workforcePlanning.addContainer(
  'Single-Page Application',
  'Displays the Gantt chart component being used for two different domains.',
  'JavaScript and React'
);
singlePageApplication.tags.add(WEB_BROWSER_TAG);

const apiApplication = workforcePlanning.addContainer(
  'API Application',
  'Provides data to render the Gantt chart as JSON, and also handles other HTTP request methods.',
  'JavaScript and Node.js/Express'
);

const database = workforcePlanning.addContainer(
  'Database',
  'Stores the Gantt chart for the two different domains (field engineers and tennis courts).',
  'MongoDB Atlas'
);
database.tags.add(DATABASE_TAG);

consumingDeveloper.uses(
  singlePageApplication,
  'Views the Gantt chart and can demo its functionalities using by visiting workforce-planning.herokuapp.com',
  'HTTPS'
);
consumingDeveloper.uses(documentation, 'Uses');
extendingDeveloper.uses(testing, 'Reviews');
extendingDeveloper.uses(architectureModel, 'Reviews');
extendingDeveloper.uses(pipeline, 'Reviews');
extendingDeveloper.uses(documentation, 'Reviews');

webApplication.uses(architectureModel, 'Has artifact');
webApplication.uses(workingAgreement, 'Has artifact');
webApplication.uses(pipeline, 'Has artifact');
webApplication.uses(documentation, 'Has artifact');
webApplication.uses(testing, 'Has artifact');
webApplication.uses(singlePageApplication, "Delivers to the users's web browser", '');
singlePageApplication.uses(apiApplication, 'Makes API calls to', 'JSON/HTTPS');
apiApplication.uses(database, 'Reads from and writes to', 'Mongoose');

// Create the view.
const containerView = viewSet.createContainerView(
  workforcePlanning,
  'Containers',
  'The containers diagram for the Workforce Planning application.'
);
containerView.addAllPeople();
containerView.addAllContainers();
// containerView.setAutomaticLayout(true);

// Add components...

const backendAppJs = apiApplication.addComponent(
  'app.js',
  'Sets the body parser to extract body portion of an incoming request. Sets the appropriate headers to avoid CORS issues. Handles routes. Error handling middleware. Connects to the MongoDB database in MongoDB Atlas.',
  'Express Middleware'
);
const ganttRoute = apiApplication.addComponent(
  'routes/gantt.js',
  'Maps the routes to the appropriate method in the controller.'
);
const ganttController = apiApplication.addComponent(
  'controllers/gantt.js',
  'Handles the different HTTP request methods.'
);
const rowModel = apiApplication.addComponent(
  'models/row.js',
  'Database schema for the row in the Gantt chart.'
);
const taskModel = apiApplication.addComponent(
  'models/task.js',
  'Database schema for a task (bar) in the Gantt chart.'
);
backendAppJs.uses(ganttRoute, 'Makes calls to');
ganttRoute.uses(ganttController, 'Makes calls to');
ganttController.uses(rowModel, 'Uses');
ganttController.uses(taskModel, 'Uses');

const publicDirectory = singlePageApplication.addComponent(
  'public directory',
  'Includes index.html and favicon.ico files which were modified.',
  '',
  'HTML/CSS'
);
publicDirectory.tags.add(DIRECTORY_TAG);
const frontendIndex = singlePageApplication.addComponent(
  'index.js & index.css',
  'Initialises the app along with using Redux.',
  '',
  'React.js & CSS'
);
const frontendAppJs = singlePageApplication.addComponent(
  'App.js',
  'Sets the routing.',
  '',
  'React.js'
);
const frontendLayoutDirectory = singlePageApplication.addComponent(
  'hoc/Layout',
  'Higher-order component which sets the layout i.e. the design/structure of the application.',
  '',
  'React.js & CSS'
);
frontendLayoutDirectory.tags.add(DIRECTORY_TAG);
const logoDirectory = singlePageApplication.addComponent(
  'components/Logo',
  'Logo component used for the BT logo.',
  '',
  'React.js & CSS'
);
logoDirectory.tags.add(DIRECTORY_TAG);
const navigationDirectory = singlePageApplication.addComponent(
  'components/Navigation',
  'Navigation bar, and the side drawer.',
  '',
  'React.js & CSS'
);
navigationDirectory.tags.add(DIRECTORY_TAG);
const uiDirectory = singlePageApplication.addComponent(
  'components/UI',
  'UI components such as Backdrop and Spinner.',
  '',
  'React.js & CSS'
);
uiDirectory.tags.add(DIRECTORY_TAG);
const ganttChartTypes = singlePageApplication.addComponent(
  'containers/GanttChartTypes',
  'The component for the user to select which Gantt chart to view.',
  '',
  'React.js & CSS'
);
ganttChartTypes.tags.add(DIRECTORY_TAG);
const svelteGanttReact = singlePageApplication.addComponent(
  'containers/SvelteGanttReact',
  'The Gantt chart component.',
  '',
  'React.js & CSS'
);
svelteGanttReact.tags.add(DIRECTORY_TAG);
const svelteGanttAddBar = singlePageApplication.addComponent(
  'containers/SvelteGanttAddBar',
  'The component to add a new bar to the Gantt chart.',
  '',
  'React.js & CSS'
);
svelteGanttAddBar.tags.add(DIRECTORY_TAG);
const demoNewChart = singlePageApplication.addComponent(
  'containers/DemoNewChart',
  'The component to enter custom JSON data to be rendered for the Gantt chart.',
  '',
  'React.js & CSS'
);
demoNewChart.tags.add(DIRECTORY_TAG);
const reduxStore = singlePageApplication.addComponent(
  'store directory',
  'Includes the action creators and the reducers.',
  '',
  'Redux'
);
reduxStore.tags.add(DIRECTORY_TAG);
const utilityJs = singlePageApplication.addComponent(
  'shared/utility.js',
  'Helper functions and constants.',
  '',
  'JavaScript'
);

publicDirectory.uses(frontendIndex, 'Uses');
frontendIndex.uses(frontendAppJs, 'Renders');
frontendAppJs.uses(frontendLayoutDirectory, 'Uses');
frontendLayoutDirectory.uses(navigationDirectory, 'Uses');
navigationDirectory.uses(logoDirectory, 'Uses');
navigationDirectory.uses(uiDirectory, 'Uses Backdrop component in');
frontendAppJs.uses(ganttChartTypes, 'Contains route to');
frontendAppJs.uses(demoNewChart, 'Contains route to');
ganttChartTypes.uses(svelteGanttReact, 'On click of a Gantt chart option, it renders');
demoNewChart.uses(svelteGanttReact, 'Upon user input of JSON data, it renders');
svelteGanttReact.uses(svelteGanttAddBar, 'Calls');
svelteGanttReact.uses(reduxStore, 'Uses');
svelteGanttReact.uses(uiDirectory, 'Uses Spinner component in');
demoNewChart.uses(reduxStore, 'Uses');
reduxStore.uses(utilityJs, 'Calls');

const lb = singlePageApplication.addComponent(
  'LB',
  'Initial setup and displaying of chart. Editing of bars being saved.'
);
const lc = singlePageApplication.addComponent('LC', 'Link it with SvelteGanttAddBar component.');
const jb = singlePageApplication.addComponent(
  'JB',
  'Show JSON code that makes the chart. Reflect JSON code changes by the user onto the chart.'
);
const ga = singlePageApplication.addComponent(
  'GA',
  'Custom title of chart depending on which Gantt chart is being viewed. Logging.'
);

svelteGanttReact.uses(lb, 'Had contribution by');
svelteGanttReact.uses(lc, 'Had contribution by');
svelteGanttReact.uses(jb, 'Had contribution by');
svelteGanttReact.uses(ga, 'Had contribution by');

// Create the component diagram...

const backendComponentView = viewSet.createComponentView(
  apiApplication,
  'Backend Components',
  'The component diagram for the backend/API application.'
);
backendComponentView.addAllComponents();
// backendComponentView.setAutomaticLayout(true);
const frontendComponentView = viewSet.createComponentView(
  singlePageApplication,
  'Frontend Components',
  'The component diagram for the frontend/single-page application.'
);
frontendComponentView.addAllComponents();
// frontendComponentView.setAutomaticLayout(true);

// Link the backend/API architecture model with the code.
apiApplication.components.map(component => {
  component.codeElements.map(codeElement => {
    const sourcePath = codeElement.url;
    if (sourcePath !== null) {
      codeElement.url =
        'https://git.cardiff.ac.uk/c1888037/project-3b/-/tree/master/project-3b-backend';
    }
  });
});

const style1 = new ElementStyle(Tags.SoftwareSystem);
style1.background = '#1168bd';
style1.color = '#ffffff';
const style2 = new ElementStyle(Tags.Container);
style2.background = '#438dd5';
style2.color = '#ffffff';
const style3 = new ElementStyle(Tags.Component);
style3.background = '#85bbf0';
style3.color = '#000000';
const style4 = new ElementStyle(Tags.Person);
style4.background = '#08427b';
style4.color = '#ffffff';
style4.shape = Shape.Person;
style4.fontSize = 22;
const style5 = new ElementStyle(WEB_BROWSER_TAG);
style5.shape = Shape.WebBrowser;
const style6 = new ElementStyle(DATABASE_TAG);
style6.shape = Shape.Cylinder;
const style7 = new ElementStyle(DIRECTORY_TAG);
style7.shape = Shape.Folder;

const styles = viewSet.configuration.styles;

styles.addElementStyle(style1);
styles.addElementStyle(style2);
styles.addElementStyle(style3);
styles.addElementStyle(style4);
styles.addElementStyle(style5);
styles.addElementStyle(style6);
styles.addElementStyle(style7);

// Add some documentation to the model...

workspace.documentation.addSection(
  workforcePlanning,
  'Context Diagram Documentation',
  Format.Markdown,
  'Here is some context about the Workforce Planning application...\n' +
    '![](embed:context)\n' +
    '### Consuming Developer\n...\n' +
    '### Extending Developer\n...\n'
);

module.exports = workspace;
