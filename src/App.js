import './App.css';
import CafeMain from './component/CafeMain';
import CafeList from './component/CafeList';
import CafeDetail from './component/CafeDetail';
import CafeAdd from './component/CafeAdd';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<CafeMain />} />
          <Route path='/cafeList' element={<CafeList />} />
          <Route path='/cafe/:id' element={<CafeDetail />} />
          <Route path='/cafeadd' element={<CafeAdd />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
