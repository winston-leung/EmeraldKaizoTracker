import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import DownloadPage from "./Routes/DownloadPage";
import HomePage from "./Routes/HomePage";
import MapPage from "./Routes/MapPage";
import PokemonPage from "./Routes/PokemonPage";
import RouteListPage from "./Routes/RouteListPage";
import RoutePage from "./Routes/RoutePage";
import TrainerPage from "./Routes/TrainerPage";


const App = () => {

  return (

    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Main>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/download" element={<DownloadPage />} />
          <Route exact path="/map" element={<MapPage />} />
          <Route exact path="/routes" element={<RouteListPage />} />
          <Route path="/route/:route" element={<RoutePage />} />
          <Route path="/route/:route/:trainer" element={<TrainerPage />} />
          <Route path="/pokemon/:pokemon" element={<PokemonPage />} />
        </Routes>
      </Main>

    </BrowserRouter>


  );
}

const Main = styled.div`
  font-family: var(--font);
`

export default App;
