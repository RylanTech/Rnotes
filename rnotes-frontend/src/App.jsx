import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Loginpage from './pages/Loginpage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage/>}/>
        <Route path='/login' element={<Loginpage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App