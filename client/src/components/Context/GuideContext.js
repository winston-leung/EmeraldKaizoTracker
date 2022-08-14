import { createContext, useReducer } from "react";



export const GuideContext = createContext(null);

const initialState = {
  load: "load",
  routes: [],
  user: null,
}

const reducer = (state, action) => {
  // console.log(action)
  switch (action.type) {
    case "receive-routes":
      return {
        ...state,
        routes: action.routes,
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
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
}

export const GuideContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleRoutesLoad = (data) => {
    dispatch({
      type: "receive-routes",
      routes: data,
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

  return (
    <GuideContext.Provider
      value={{
        state,
        actions: {
          handleRoutesLoad,
          handleUserLoad,
          handleLoad,
        }
      }}>
      {children}
    </GuideContext.Provider>
  )
}