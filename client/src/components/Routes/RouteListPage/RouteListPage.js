import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { GuideContext } from "../../Context/GuideContext";

const RouteListPage = () => {

  const { state } = useContext(GuideContext)

  return (

    <Wrapper>
      {state.routes.map(route => {
        return (
          <RouteNav to={`/route/${route}`} key={route}>
            {route}
          </RouteNav>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: var(--page-padding);
  height: calc(100vh - var(--header-height));
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  /* justify-content: center; */
  align-items: center;
`

const RouteNav = styled(NavLink)`

`

export default RouteListPage;