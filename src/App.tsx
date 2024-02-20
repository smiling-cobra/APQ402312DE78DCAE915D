import { Main } from "./views/MainView";
import "./App.css";

const App = () => (
  <div className="app">
    <header>
      <h1>Git retriever</h1>
    </header>
    <Main />
    <footer>
      <p>&copy; {new Date().getFullYear()}</p>
    </footer>
  </div>
);

export default App;
