import { createContext, useReducer } from "react";



export const GuideContext = createContext(null);

const initialState = {
  load: false,
  routes: [],
}

const reducer = (state, action) => {
  // console.log(action)
  switch (action.type) {
    case "receive-routes":
      return {
        ...state,
        load: true,
        routes: action.routes,
      }
        ;

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


  return (
    <GuideContext.Provider
      value={{
        state,
        actions: {
          handleRoutesLoad,
        }
      }}>
      {children}
    </GuideContext.Provider>
  )
}