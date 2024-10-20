import { Routes, Route} from 'react-router-dom'
import { Home, Login} from './containers/Public'
import { path } from './ultiles/constant'

function App() {
  return (
    <div className="h-screen w-screen bg-primary">
      <Routes>
        <Route path={path.HOME} element={<Home/>}  />

      </Routes>
    </div>
  );
}

export default App;
