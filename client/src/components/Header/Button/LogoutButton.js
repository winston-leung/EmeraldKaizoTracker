import { useAuth0 } from '@auth0/auth0-react'
import styled from 'styled-components';
import { smallbutton } from "../../helpers/buttoncss"

//logout button using Auth0 
const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    //only show when Auth0 has authenticated user
    isAuthenticated && (
      <Button onClick={() => logout()}>
        Sign Out
      </Button>
    )
  )
}

const Button = styled.button`
  ${smallbutton}
  padding: 5px 8px;
`

export default LogoutButton;