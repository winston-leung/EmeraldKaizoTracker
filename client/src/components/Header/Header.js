import styled from "styled-components"
import Sidebar from "./Sidebar";



const Header = () => {


  return (
    <Wrapper>
      <Sidebar />
      <Title>
        <Logo src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg" />
        <TitleText>
          Emerald Kaizo
        </TitleText>
      </Title>
      <Button>Sign In</Button>
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
`

const Title = styled.div`
  position: relative;
  left: 1%;
  display: flex;
  align-items: center;
`

const Logo = styled.img`
  margin-right: 10px;
`
const TitleText = styled.h1`
    font-size: 24px;
    text-shadow: 2px 2px 6px #105E26;
    position: relative;
    top: 10px;
`

const Button = styled.button`

`

export default Header;