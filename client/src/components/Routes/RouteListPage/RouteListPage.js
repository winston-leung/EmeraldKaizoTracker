import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { GuideContext } from "../../Context/GuideContext";

const RouteListPage = () => {

  const { state } = useContext(GuideContext)

  return (

    <Wrapper>
      {state.routes.map(route => {
        console.log(state.user.progression[route].isChecked)
        return (
          <RouteNav to={`/route/${route}`} key={route}>
            {route}
            {state.user.progression[route].isChecked === "true" && (
              <Image src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" />
            )}
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
  align-items: center;
`

const RouteNav = styled(NavLink)`
  padding: 4px 0;
  display: flex;
  align-items: center;
  height: 30px;
`

const Image = styled.img`
  width: 30px;
  height: 30px;
`

export default RouteListPage;