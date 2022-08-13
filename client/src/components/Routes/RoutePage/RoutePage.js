import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PokemonListHelper from "./PokemonListHelper";
import TrainerListHelper from "./TrainerListHelper";

const RoutePage = () => {
  const routeName = useParams().route;
  const [encounters, setEncounters] = useState(null);
  const [trainers, setTrainers] = useState(null);
  const [activeTab, setActiveTab] = useState("encounters")
  const [load, setLoad] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setLoad(true), 500);
    fetch(`/api/route/${routeName}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        if (data.status === 200) {
          setEncounters(data.encounters);
          setTrainers(data.trainers);
        }
      })
      .catch(err => console.log(err))

    return (() => {
      clearTimeout(timeout);
      setLoad(false);
    })
    // eslint-disable-next-line
  }, [useParams().route])

  const handleTabClick = (e) => {
    if (activeTab !== e.target.id) {
      setActiveTab(e.target.id)
    }
  }

  if (load && encounters) {
    return (
      <Wrapper>
        <RouteName>
          {routeName}
        </RouteName>
        <TabBar>
          <TabButton id="encounters" onClick={handleTabClick}>Encounters</TabButton>
          <TabButton id="trainers" onClick={handleTabClick}>Trainers</TabButton>
        </TabBar>
        <Content>
          {activeTab === "encounters" && (
            encounters.length > 0 ? (
              (Object.keys(encounters[0][routeName]).includes("Grass") ?
                (
                  <PokemonListHelper encounters={encounters[0][routeName]} />
                ) : (
                  Object.keys(encounters[0][routeName]).map(floor => {
                    if (floor !== "Hint") {
                      return (
                        <FloorWrapper key={floor}>
                          <Floor>{floor}</Floor>
                          <PokemonListHelper encounters={encounters[0][routeName][floor]} />
                        </FloorWrapper>
                      )
                    }
                    else {
                      return (
                        <Hint key={floor}>
                          {`(Hint: ${encounters[0][routeName][floor]})`}
                        </Hint>
                      )
                    }
                  })
                )
              )
            ) : (
              <div>no encounters</div>
            )

          )

          }
          {activeTab === "trainers" &&
            <TrainerListHelper trainers={trainers} />
          }
        </Content>
      </Wrapper >
    )
  }
  else {
    <div>HELP</div>
  }

}

const RouteName = styled.div`
  font-size: 24px;
  text-decoration: underline;
`

const Wrapper = styled.div`
  font-family: var(--font);
  padding: var(--page-padding);
  `

const TabBar = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  `

const TabButton = styled.div`
  width: 50%;
  height: 60px;
  text-align: center;
  line-height: 60px;
  font-weight: bold;  
  border-bottom: 1px solid rgb(128, 128, 128, 0.5);
  cursor: pointer;
  `

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  
  `

const FloorWrapper = styled.div`
  padding: 8px 16px;
  order: 2;
  `

const Floor = styled.div`
  text-decoration: underline;
  font-size: 20px;
  padding: 8px;
  `

const Hint = styled(FloorWrapper)`
  order: 1;
`

export default RoutePage;