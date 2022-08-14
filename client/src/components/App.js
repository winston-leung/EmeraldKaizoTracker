import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import LoadingScreen from "../helpers/LoadingScreen";
import { GuideContext } from "./Context/GuideContext";
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
  const { state, actions: { handleRoutesLoad, handleUserLoad, handleLoad } } = useContext(GuideContext)

  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {

    let email = user?.email || "1234567890987654321";
    console.log(email)

    Promise.all([
      fetch(`/api/user/${email}`).then(res => res.json()),
      fetch("/api/all-routes").then(res => res.json())
    ])
      .then(data => {
        console.log(data)
        handleUserLoad(data[0].data);
        if (data[1].status === 200) {
          handleRoutesLoad(data[1].data);
        }
        handleLoad();
      })
      .catch((err) => {
        console.log(err)
      })
    // eslint-disable-next-line
  }, [isLoading])

  return (

    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Main className={state.load === "load" && !isLoading ? "load" : ""}>
        {
          state.load === "idle" && !isLoading ? (
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/download" element={<DownloadPage />} />
              <Route exact path="/map" element={<MapPage />} />
              <Route exact path="/routes" element={<RouteListPage />} />
              <Route path="/route/:route" element={<RoutePage />} />
              <Route path="/route/:route/:trainer" element={<TrainerPage />} />
              <Route path="/pokemon/:pokemon" element={<PokemonPage />} />
            </Routes>
          ) : (
            <LoadingScreen />
          )}
      </Main>

    </BrowserRouter>


  );
}

const Main = styled.div`
  font-family: var(--font);
  &.load {
    height: calc(100vh - var(--header-height));
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export default App;
