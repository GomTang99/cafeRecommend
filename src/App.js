import './App.css';
import CafeMain from './component/CafeMain';
import CafeList from './component/CafeList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<CafeMain />} />
          <Route path='/cafeList' element={<CafeList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
