import Link from 'next/link';

import { BrowserRouter, Route, Routes } from "react-router-dom";


const Home = () => {
  return (
      <BrowserRouter>                 
        <Routes>              
          <Route path="/table">
            {/* Componente que se renderiza cuando la ruta coincide */}
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default Home;