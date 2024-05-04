import {useState} from "react";

import Sidebar from "./components/Sidebar.jsx";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSeleted.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  })

  function handleAddTask(taskText) {
    setProjectsState(prevProjectsState => {
      const taskId = Math.random()

      const newTask = {
        taskText: taskText,
        projectId: prevProjectsState.selectedProjectId,
        id: taskId
      }

      return {
        ...prevProjectsState,
        tasks: [...prevProjectsState.tasks, newTask]
      }
    })
  }

  function handleDeleteTask(id) {
    setProjectsState(prevProjectsState => {
      return {
      ...prevProjectsState,
      tasks: prevProjectsState.tasks.filter(
        (task) => task.id !== id
      )
    }})
  }

  function handleSelectProject(id) {
    setProjectsState(prevProjectsState => {
      return {
      ...prevProjectsState,
      selectedProjectId: id
    }})
  }

  function handleAddProjectButton() {
    setProjectsState(prevProjectsState => {
      return {
      ...prevProjectsState,
      selectedProjectId: null
    }})
  }

  function handleCancelAddProjectButton() {
    setProjectsState(prevProjectsState => {
      return {
      ...prevProjectsState,
      selectedProjectId: undefined
    }})
  }

  function handleAddProject(projectData) {
    setProjectsState(prevProjectsState => {
      const newProjectId = Math.random()

      const newProject = {
        ...projectData,
        id: newProjectId
      }

      return {
        ...prevProjectsState,
        selectedProjectId: newProjectId,
        projects: [...prevProjectsState.projects, newProject]
      }
    })
  }

  function handleDeleteProject() {
    setProjectsState(prevProjectsState => {
      return {
      ...prevProjectsState,
      selectedProjectId: undefined,
      projects: prevProjectsState.projects.filter(
        (project) => project.id !== prevProjectsState.selectedProjectId
      )
    }})
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId)

  let pageContent = <SelectedProject
    tasks={projectsState.tasks}
    project={selectedProject}
    onDeleteProject={handleDeleteProject}
    onAddTask={handleAddTask}
    onDeleteTask={handleDeleteTask}
  />;

  if (projectsState.selectedProjectId === null) {
    pageContent = <NewProject onAddProject={handleAddProject} onCancelAddProject={handleCancelAddProjectButton}/>
  } else if (projectsState.selectedProjectId === undefined) {
    pageContent = <NoProjectSelected onClickAddProjectButton={handleAddProjectButton}/>
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar
        projects={projectsState.projects}
        onClickAddProjectButton={handleAddProjectButton}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {pageContent}
    </main>
  );
}

export default App;
