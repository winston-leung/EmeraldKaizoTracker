import { useAuth0 } from '@auth0/auth0-react'
import styled from 'styled-components';
import { smallbutton } from "../../helpers/buttoncss"

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <Button onClick={() => loginWithRedirect()}>
        Sign In
      </Button>
    )
  )
}

const Button = styled.button`
  ${smallbutton}
  padding: 5px 8px;
`

export default LoginButton;