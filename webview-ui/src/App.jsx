import TasksContainer from "./components/TasksContainer.tsx";
import TasksList from "./components/TasksContainer.tsx";

const App = () => {

    
  return (
    <div className="max-w-7xl mx-auto px-6 ">
      <header className="text-2xl font-bold uppercase py-6">
        Project Todos
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TasksContainer />
      </main>
    </div>
  );
};

export default App;
