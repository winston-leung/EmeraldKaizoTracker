import { createContext, useContext, useReducer } from "react";
import { GuideContext } from "../../Context/GuideContext";

export const RouteContext = createContext(null);

const initialState = {
  load: false,
  route: null,
  selectedPokemon: {
    id: null,
    type: null,
    floor: null,
    name: null
  },
  encounters: {},
  trainers: [],
  activeTab: "encounters",
  error: null,
  snackbarOpen: false,
  snackbarMessage: ""
}

const reducer = (state, action) => {
  // console.log(action)
  switch (action.type) {
    case "receive-encounters":
      return {
        ...state,
        encounters: action.encounters,
      };
    case "receive-trainers":
      return {
        ...state,
        trainers: action.trainers,
      }
    case "load-route":
      return {
        ...state,
        load: action.load,
      }
    case "receive-route":
      return {
        ...state,
        route: action.route,
      }
    case "select-tab":
      return {
        ...state,
        activeTab: action.tab,
      }
    case "select-pokemon":
      return {
        ...state,
        selectedPokemon: action.selectedPokemon,
      }
    case "select-error":
      return {
        ...state,
        error: action.error,
      }
    case "open-close-snackbar":
      return {
        ...state,
        snackbarOpen: action.snackbarOpen,
        snackbarMessage: action.snackbarMessage
      }
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
}

export const RouteContextProvider = ({ children }) => {
  const [stateRoute, dispatch] = useReducer(reducer, initialState);

  const { state, actions: { handleReload } } = useContext(GuideContext)

  const handleLoad = (boolean) => {
    dispatch({
      type: "load-route",
      load: boolean
    })


  }

  const handleRouteLoad = (name) => {
    dispatch({
      type: "receive-route",
      route: name,
    })
  }

  const handleTrainersLoad = (data) => {
    dispatch({
      type: "receive-trainers",
      trainers: data,
    })
  }

  const handleEncountersLoad = (data) => {
    dispatch({
      type: "receive-encounters",
      encounters: data,
    })
  }

  const handleTabClick = (e) => {
    if (stateRoute.activeTab !== e.currentTarget.id) {
      dispatch({
        type: "select-tab",
        tab: e.currentTarget.id,
      })
    }
  }

  const handlePokeSelect = (data) => {
    dispatch({
      type: "select-pokemon",
      selectedPokemon: data
    })
  }

  const handleSelectError = (error) => {
    dispatch({
      type: "select-error",
      error: error
    })
  }

  const handleSnackbarOpen = (boolean, message) => {
    dispatch({
      type: "open-close-snackbar",
      snackbarOpen: boolean,
      snackbarMessage: message
    })

  }

  const handleSelectSubmit = (e) => {
    e.preventDefault();

    if (stateRoute.error) {
      handleSelectError(null);
    }
    const newProgression = {
      ...state.user.progression,
    }

    switch (e.target.id) {
      case "pokemon":
        if (stateRoute.selectedPokemon.id) {
          newProgression[stateRoute.route].pokemon = stateRoute.selectedPokemon;
        }
        else {
          handleSelectError("select");
        }
        break;
      case "route":
        newProgression[stateRoute.route].isChecked = true;
        break;
      default:
        break;
    }

    fetch(`/api/progression/${state.user.email}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ progression: newProgression, changed: e.target.id }),
    })
      .then(res => res.json())
      .then(data => {

        switch (data.message) {
          case "updated":
            if (e.target.id === "route") {
              handleSnackbarOpen(true, "Route Completed")
            }
            else {
              handleSnackbarOpen(true, "Pokemon Caught")
            }
            handleReload();
            break;
          case "pokemon":
            handleSelectError("caught")
            break;
          case "route":
            handleSelectError("route")
            break;
          default:
            break;
        }
      })
  }

  return (
    <RouteContext.Provider
      value={{
        stateRoute,
        actions: {
          handleLoad,
          handleRouteLoad,
          handleTrainersLoad,
          handleEncountersLoad,
          handleTabClick,
          handlePokeSelect,
          handleSelectSubmit,
          handleSnackbarOpen,
        }
      }} >
      {children}
    </RouteContext.Provider >
  )
}