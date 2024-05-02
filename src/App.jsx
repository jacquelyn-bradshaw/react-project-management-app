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

  function handleAddProject(projectData) {
    setProjectsState(prevProjectsState => {
      const newProject = {
        ...projectData,
        id: Math.random()
      }

      return {
        ...prevProjectsState,
        selectedProjectId: undefined,
        projects: [...prevProjectsState.projects, newProject]
      }
    })
  }

  console.log(projectsState);

  let pageContent;

  if (projectsState.selectedProjectId === null) {
    pageContent = <NewProject onAddProject={handleAddProject}/>
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
