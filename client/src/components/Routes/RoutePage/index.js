import { RouteContextProvider } from "./RouteContext";
import RoutePage from "./RoutePage";

const index = () => {


  return (
    <RouteContextProvider>
      <RoutePage />
    </RouteContextProvider>
  )
}

export default index;