import { useAuth0 } from '@auth0/auth0-react'
import styled from 'styled-components';
import { smallbutton } from "../../helpers/buttoncss"

//login button using Auth0 
const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    //only show when Auth0 has not authenticated user
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