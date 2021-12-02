import logo from "./logo.svg";
import "./App.css";
import { ProjectListScreen } from "screens/project-list";
import { LoginScreen } from "screens/login";
// import {TsReactTest} from './try-use-array';

function App() {
  return (
    <div className="App">
      {/* <ProjectListScreen /> */}
      {/* <TsReactTest /> */}
      <LoginScreen />
    </div>
  );
}

export default App;
