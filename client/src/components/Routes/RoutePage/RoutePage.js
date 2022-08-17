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

  //get fetch route details
  useEffect(() => {
    const timeout = setTimeout(() => handleLoad(true), 1000);
    fetch(`/api/route/${routeName}`)
      .then(res => res.json())
      .then(data => {

        //store route name, encounters and trainers in route context
        if (data.status === 200) {
          handleRouteLoad(routeName)
          handleEncountersLoad(data.encounters[0]);
          handleTrainersLoad(data.trainers);

        }
      })
      .catch(err => console.log(err))

    //clear all data stored
    return (() => {
      clearTimeout(timeout);
      handleEncountersLoad([]);
      handleTrainersLoad([]);
      handleLoad(false);
      window.scrollTo(0, 0);
    })
    // eslint-disable-next-line
  }, [useParams().route])

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

        {/* show pokeball if user has caught a pokemon for this route */}
        {state.user?.progression[routeName].pokemon && (
          <Image src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" />
        )}

        {/* show pokeball if user has completed this route */}
        {state.user?.progression[routeName].isChecked && <Check />}
      </RouteName>

      {/* show user's caught pokemon or this route */}
      {state.user?.progression[routeName].pokemon && (
        <Caught>
          {`Caught ${state.user.progression[routeName].pokemon.name}`}
          <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/${state.user.progression[routeName].pokemon.id}.png`} />
        </Caught>
      )
      }

      {/* show route image if available */}
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

            {/* checking if route has any encounters */}
            {(stateRoute.encounters?._id) ? (

              //checking if route has floors 
              Object.keys(stateRoute.encounters[stateRoute.encounters._id]).includes("Grass") ?
                (
                  <PokemonListHelper encounters={stateRoute.encounters[stateRoute.encounters._id]} floor={stateRoute.selectedPokemon.floor} />
                ) : (
                  Object.keys(stateRoute.encounters[stateRoute.encounters._id]).map(floor => {

                    //check route has a hint
                    if (floor === "Hint") return (
                      <Hint key={floor}>
                        {`(Hint: ${stateRoute.encounters[stateRoute.encounters._id][floor]})`}
                      </Hint>)

                    return (
                      <FloorWrapper
                        key={floor}
                      >
                        <Floor>{floor}</Floor>
                        <PokemonListHelper encounters={stateRoute.encounters[stateRoute.encounters._id][floor]} floor={floor} />
                      </FloorWrapper>
                    )

                  })
                )


            ) : (
              <Warning>NO ENCOUNTERS</Warning>
            )}
            {/* check submit error  */}
            {stateRoute.error === "select" && (<Warning>Select A Pokemon!</Warning>)}
            {stateRoute.error === "caught" && (<Warning>Already Caught A Pokemon</Warning>)}

            {/* only show if user is signed in */}
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

      {/* check submit error  */}
      {stateRoute.error === "route" && (<Warning>Route Already Completed</Warning>)}

      {/* only show if user is signed in */}
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