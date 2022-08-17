import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { GuideContext } from "../../Context/GuideContext";
import { FaCheck } from "react-icons/fa";
import { smallbutton } from "../../helpers/buttoncss";

const RouteListPage = () => {

  const { state } = useContext(GuideContext)

  return (

    <Wrapper>
      {state.routes.map(route => {
        return (
          <RouteNav to={`/route/${route}`} key={route}>
            {route}
            {state.user.progression[route]?.pokemon && (
              <Image src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" />
            )}
            {state.user.progression[route]?.isChecked && (<Check />)}
          </RouteNav>
        )
      })}
    </Wrapper>
  )
}

const Check = styled(FaCheck)`
  padding: 0 8px;
`

const Wrapper = styled.div`
  padding: var(--page-padding);
  height: calc(100vh - var(--header-height));
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
`

const RouteNav = styled(NavLink)`
  ${smallbutton}
  padding: 4px 8px;
  margin: 4px 0;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black
`

const Image = styled.img`
  width: 30px;
  height: 30px;
`

export default RouteListPage;