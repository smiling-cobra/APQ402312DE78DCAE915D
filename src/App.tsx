import { Main } from './views/Main'
import './App.css'

function App() {

  return (
    <div className="app-container">
      <header>
        <h1>Git observer</h1>
      </header>
      <Main />
      <footer>
        <p>&copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}

export default App
