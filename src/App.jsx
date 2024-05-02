import {useState} from "react";

import Sidebar from "./components/Sidebar.jsx";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSeleted.jsx";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: []
  })

  function handleAddProjectButton () {
    setProjectsState(prevProjectsState => {
      return {
      ...prevProjectsState,
      selectedProjectId: null
    }})
  }

  let pageContent;

  if (projectsState.selectedProjectId === null) {
    pageContent = <NewProject />
  } else if (projectsState.selectedProjectId === undefined) {
    pageContent = <NoProjectSelected onClickAddProjectButton={handleAddProjectButton}/>
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar onClickAddProjectButton={handleAddProjectButton}/>
      {pageContent}
    </main>
  );
}

export default App;
