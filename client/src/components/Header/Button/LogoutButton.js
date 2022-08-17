import { useAuth0 } from '@auth0/auth0-react'
import styled from 'styled-components';
import { smallbutton } from "../../helpers/buttoncss"

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
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