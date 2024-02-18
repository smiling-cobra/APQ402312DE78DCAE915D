import { Main } from './views/Main'
import './App.css'

function App() {

  return (
    <div className="app-container">
      <header>
        <h1>Git Observer</h1>
      </header>
      
      <main>
        <Main />
      </main>
      
      <footer>
        {/* Footer content goes here */}
        <p>&copy; {new Date().getFullYear()} Company Name. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
