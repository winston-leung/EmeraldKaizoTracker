import { createContext, useReducer } from "react";
import { userData } from "../helpers/userConstructer";



export const GuideContext = createContext(null);

const initialState = {
  load: "load",
  routes: [],
  routeSrcs: [],
  user: new userData(""),
  reload: false
}

const reducer = (state, action) => {
  // console.log(action)
  switch (action.type) {
    case "receive-routes-&-src":
      return {
        ...state,
        routes: action.routes,
        routeSrcs: action.routeSrcs
      };
    case "receive-user-data":
      return {
        ...state,
        user: action.user,
      }
    case "load-app":
      return {
        ...state,
        load: "idle",
      }
    case "update-progression":
      return {
        ...state,
        user: {
          ...state.user,
          progression: action.progression
        }
      }
    case "reload":
      return {
        ...state,
        reload: !state.reload
      }
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
}

export const GuideContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleRoutesLoad = (data) => {
    dispatch({
      type: "receive-routes-&-src",
      routes: data.data,
      routeSrcs: data.src
    })
  }

  const handleUserLoad = (data) => {
    dispatch({
      type: "receive-user-data",
      user: data,
    })
  }

  const handleLoad = () => {
    dispatch({
      type: "load-app",
    })
  }


  const handleReload = () => {
    dispatch({
      type: "reload",
    })
  }

  return (
    <GuideContext.Provider
      value={{
        state,
        actions: {
          handleRoutesLoad,
          handleUserLoad,
          handleLoad,
          handleReload,
        }
      }}>
      {children}
    </GuideContext.Provider>
  )
}