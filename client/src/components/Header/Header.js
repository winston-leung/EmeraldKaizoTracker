import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import styled from "styled-components"
import LoginButton from "./Button/LoginButton";
import LogoutButton from "./Button/LogoutButton";
import Sidebar from "./Sidebar";



const Header = () => {
  const { error } = useAuth0();

  return (
    <Wrapper>
      <Sidebar />
      <Title to="/">
        <Logo src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg" />
        <TitleText>
          Emerald Kaizo
        </TitleText>
      </Title>
      <Button>
        {error && <p>Authentication Error</p>}
        {!error && (
          <>
            <LoginButton />
            <LogoutButton />
          </>
        )}
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: calc(100vw - 24px);
  height: var(--header-height);
  font-family: var(--font);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  z-index: 10;
`

const Title = styled(NavLink)`
  position: relative;
  left: 1%;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
`

const Logo = styled.img`
  margin-right: 10px;
`
const TitleText = styled.h1`
    font-size: 24px;
    text-shadow: 2px 2px 6px var(--color-dark-emerald);
    position: relative;
    top: 10px;
`

const Button = styled.div`

`

export default Header;