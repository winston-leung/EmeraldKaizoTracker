import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import LoadingScreen from "./helpers/LoadingScreen";
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
import { userData } from "./helpers/userConstructer";
import FAQPage from "./Routes/FAQPage";
import NuzlockPage from "./Routes/NuzlockPage";
import Footer from "./Footer";

const App = () => {
  const { state, actions: { handleRoutesLoad, handleUserLoad, handleLoad } } = useContext(GuideContext)

  const { user, isLoading } = useAuth0();

  //get fetch user data
  useEffect(() => {
    if (user?.email) {
      fetch(`/api/user/${user.email}`)
        .then(res => res.json())
        .then(data => {
          if (data.status === 200) {
            handleUserLoad(data.data);
          }
          else if (data.status === 307) {
            const newUser = new userData(user.email);
            fetch(`/api/user/${user.email}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ ...newUser }),
            })
              .then(data => {
                handleUserLoad(data.data);
              })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    };

    // eslint-disable-next-line
  }, [state.load, user])

  //get fetch route list & image src
  useEffect(() => {
    fetch("/api/all-routes")
      .then(res => res.json())
      .then(data => {
        handleRoutesLoad(data);
        handleLoad();
      })
    // eslint-disable-next-line
  }, [])
  return (

    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Main className={state.load === "load" && !isLoading ? "load" : ""}>
        {
          state.load === "idle" ? (
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/download" element={<DownloadPage />} />
              <Route exact path="/map" element={<MapPage />} />
              <Route exact path="/faq" element={<FAQPage />} />
              <Route exact path="/nuzlocke" element={<NuzlockPage />} />
              <Route exact path="/routes" element={<RouteListPage />} />
              <Route path="/route/:route" element={<RoutePage />} />
              <Route path="/route/:route/:trainer" element={<TrainerPage />} />
              <Route path="/pokemon/:pokemon" element={<PokemonPage />} />
              <Route path="">404: Oops!</Route>
            </Routes>
          ) : (
            <LoadingScreen />
          )}
      </Main>
      <Footer />
    </BrowserRouter>


  );
}

const Main = styled.div`
  font-family: var(--font);
  &.load {
    /* height: calc(100vh - var(--header-height)); */
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export default App;
