import { useEffect } from "react"
import { useState, useContext } from "react"
import styled from "styled-components"
import { GuideContext } from "../../Context/GuideContext"
import { smallbutton } from "../../helpers/buttoncss"


const RouteImage = ({ routeIndex }) => {
  const [visibility, setVisibilty] = useState(false);
  const { state } = useContext(GuideContext);

  //close image when changing url
  useEffect(() => {
    setVisibilty(false)
  }, [routeIndex])

  //handle toggle of image visibily
  const handleImageButtonClick = (e) => {
    e.preventDefault();
    setVisibilty(!visibility)
  }

  return (
    <Wrapper>
      <Button onClick={handleImageButtonClick}>{visibility ? "Hide Map" : "Show Map"}</Button>
      <Image src={state.routeSrcs[routeIndex]} className={visibility ? "visible" : ""} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 4px 0;
`

const Image = styled.img`
  display: none;
&.visible {
  display: block;
}
`

const Button = styled.button`
  font-family: var(--font);
  ${smallbutton}
  padding: 4px 8px;
  margin-bottom: 8px;
`

export default RouteImage;