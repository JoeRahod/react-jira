import { Link } from "react-router-dom";
import { Route, Routes } from "react-router";
import { ViewBoardScreen } from "screens/viewboard";
import { TasksPoolScreen } from "screens/taskspool";

export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={"viewboard"}>看板</Link>
      <Link to={"taskspool"}>任务组</Link>
      <Routes>
        <Route path={"/viewboard"} element={<ViewBoardScreen />} />
        <Route path={"/taskspool"} element={<TasksPoolScreen />} />
      </Routes>
    </div>
  );
};
