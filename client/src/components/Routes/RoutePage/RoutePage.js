import { useContext, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
import { GuideContext } from "../../Context/GuideContext";
import PokemonListHelper from "./PokemonListHelper";
import { RouteContext } from "./RouteContext";
import TrainerListHelper from "./TrainerListHelper";
import { FaCheck } from "react-icons/fa";
import SnackbarComponent from "../../helpers/SnackBarComponent";
import LoadingScreen from "../../helpers/LoadingScreen";
import { smallbutton, tabbutton } from "../../helpers/buttoncss";
import RouteImage from "./RouteImage";

const RoutePage = () => {
  const routeName = useParams().route;
  const { state } = useContext(GuideContext);
  const routeIndex = state.routes.indexOf(routeName)
  const {
    stateRoute,
    actions: {
      handleLoad,
      handleRouteLoad,
      handleTrainersLoad,
      handleEncountersLoad,
      handleTabClick,
      handleSelectSubmit,
      handleSnackbarOpen,
    }
  } = useContext(RouteContext);

  useEffect(() => {
    const timeout = setTimeout(() => handleLoad(true), 1000);
    fetch(`/api/route/${routeName}`)
      .then(res => res.json())
      .then(data => {

        if (data.status === 200) {
          handleRouteLoad(routeName)
          handleEncountersLoad(data.encounters[0]);
          handleTrainersLoad(data.trainers);

        }
      })
      .catch(err => console.log(err))

    return (() => {
      clearTimeout(timeout);
      handleEncountersLoad([]);
      handleTrainersLoad([]);
      handleLoad(false);
      window.scrollTo(0, 0);
    })
    // eslint-disable-next-line
  }, [useParams().route])

  console.log(state.routeSrcs[routeIndex])
  return (
    <Wrapper>
      <LoadingScreen hidden={stateRoute.load} />
      <SnackbarComponent
        message={stateRoute.snackbarMessage}
        snackbarOpen={stateRoute.snackbarOpen}
        setSnackbarOpen={handleSnackbarOpen}
      />
      <RouteName>
        {routeName}
        {state.user?.progression[routeName].pokemon && (
          <Image src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" />
        )}
        {state.user?.progression[routeName].isChecked && <Check />}
      </RouteName>
      {state.user?.progression[routeName].pokemon && (
        <Caught>
          {`Caught ${state.user.progression[routeName].pokemon.name}`}
          <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/${state.user.progression[routeName].pokemon.id}.png`} />
        </Caught>
      )
      }
      {state.routeSrcs[routeIndex] && <RouteImage routeIndex={routeIndex} />}
      <TabBar>
        <TabButton
          id="encounters"
          onClick={handleTabClick}
          className={stateRoute.activeTab === "encounters" ? "active" : ""}
        >
          <div>
            Encounters
          </div>
        </TabButton>
        <TabButton
          id="trainers"
          onClick={handleTabClick}
          className={stateRoute.activeTab === "trainers" ? "active" : ""}
        >
          <div>
            Trainers
          </div>
        </TabButton>
      </TabBar>
      <Content>
        {stateRoute.activeTab === "encounters" && (
          <WrapperTab className={stateRoute.activeTab === "encounters" ? "visible" : ""}>
            {(stateRoute.encounters?._id) ? (
              Object.keys(stateRoute.encounters[stateRoute.encounters._id]).includes("Grass") ?
                (
                  <PokemonListHelper encounters={stateRoute.encounters[stateRoute.encounters._id]} floor={stateRoute.selectedPokemon.floor} />
                ) : (
                  Object.keys(stateRoute.encounters[stateRoute.encounters._id]).map(floor => {
                    if (floor !== "Hint") {
                      return (
                        <FloorWrapper
                          key={floor}
                        >
                          <Floor>{floor}</Floor>
                          <PokemonListHelper encounters={stateRoute.encounters[stateRoute.encounters._id][floor]} floor={floor} />
                        </FloorWrapper>
                      )
                    }
                    else {
                      return (
                        <Hint key={floor}>
                          {`(Hint: ${stateRoute.encounters[stateRoute.encounters._id][floor]})`}
                        </Hint>
                      )
                    }
                  })
                )


            ) : (
              <Warning>NO ENCOUNTERS</Warning>
            )}
            {stateRoute.error === "select" && (<Warning>Select A Pokemon!</Warning>)}
            {stateRoute.error === "caught" && (<Warning>Already Caught A Pokemon</Warning>)}
            {state.user?.email ? (
              stateRoute.encounters?._id && <Button type="button" onClick={handleSelectSubmit} id="pokemon">Submit Pokemon</Button>
            ) : (
              <Warning>Sign in to submit caught Pokemon</Warning>
            )}
          </WrapperTab>

        )
        }
        <WrapperTab className={stateRoute.activeTab === "trainers" ? "visible" : ""}>
          <TrainerListHelper trainers={stateRoute.trainers} />
        </WrapperTab>

      </Content>
      {stateRoute.error === "route" && (<Warning>Route Already Completed</Warning>)}
      {state.user?.email ? (
        <Button type="button" onClick={handleSelectSubmit} id="route">Complete Route</Button>
      ) : (
        <Warning> Sign in to complete route</Warning>
      )
      }
      <ArrowWrapper>
        <Arrow to={`/route/${state.routes[(routeIndex - 1)]}`} className={routeIndex > 0 ? "" : "hidden"}>Previous Route</Arrow>
        <Arrow to={`/route/${state.routes[(routeIndex + 1)]}`} className={routeIndex < state.routes.length ? "" : "hidden"}>Next Route</Arrow>
      </ArrowWrapper>
    </Wrapper >
  )
}

const ArrowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  order: 10;
`

const Arrow = styled(NavLink)`
  ${smallbutton};
  padding: 4px 8px;
  text-decoration: none;
  color: black;
  &.hidden {
    visibility: hidden;
  }
`

const Check = styled(FaCheck)`
  padding: 0 8px;
`

const WrapperTab = styled.div`
  display: none;
  &.visible {
    display: flex;
    flex-direction: column;
  }
`

const Caught = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Image = styled.img`
  width: 40px;
  height: 40px;
`

const RouteName = styled.div`
  font-size: 24px;
  text-decoration: underline;
  padding: 10px 0;
  display: flex;  
  align-items: center;
`

const Wrapper = styled.div`
  font-family: var(--font);
  padding: var(--page-padding);
  display: flex;
  flex-direction: column;
  `

const TabBar = styled.div`
  display: flex;
  width: calc(100% - var(--page-padding));
  justify-content: center;
  padding: 8px 0;
  `

const TabButton = styled.div`
  ${tabbutton}
  `

const Warning = styled.div`
  height: 100%;
  align-self: center;
  padding: 24px;
  order: 5;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  min-height: 500px;
  width: calc(100% - var(--page-padding));
  `

const FloorWrapper = styled.div`
  padding: 8px 16px;
  order: 2;
  `

const Floor = styled.div`
  text-decoration: underline;
  font-size: 20px;
  padding: 8px;
  `

const Hint = styled(FloorWrapper)`
  order: 1;
`

const Button = styled.button`
  order: 6;
  ${smallbutton}
  align-self: center;
  padding: 8px 16px;
  margin: 10px 0;

`

export default RoutePage;