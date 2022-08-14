import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { GuideContext } from "../../Context/GuideContext";
import PokemonListHelper from "./PokemonListHelper";
import TrainerListHelper from "./TrainerListHelper";

const RoutePage = () => {
  const routeName = useParams().route;
  const [encounters, setEncounters] = useState(null);
  const [trainers, setTrainers] = useState(null);
  const [activeTab, setActiveTab] = useState("encounters")
  const [load, setLoad] = useState(false)
  const { state } = useContext(GuideContext);

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
      setEncounters([]);
      setTrainers([]);
    })
    // eslint-disable-next-line
  }, [useParams().route])

  const handleTabClick = (e) => {
    if (activeTab !== e.currentTarget.id) {
      setActiveTab(e.currentTarget.id)
    }
  }

  if (load && encounters) {
    return (
      <Wrapper>
        <RouteName>
          {routeName}
          {state.user?.progression && state.user.progression[routeName].isChecked && (
            <Image src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" />
          )}
        </RouteName>
        <TabBar>
          <TabButton
            id="encounters"
            onClick={handleTabClick}
            className={activeTab === "encounters" ? "active" : ""}
          >
            <div>
              Encounters
            </div>
          </TabButton>
          <TabButton
            id="trainers"
            onClick={handleTabClick}
            className={activeTab === "trainers" ? "active" : ""}
          >
            <div>
              Trainers
            </div>
          </TabButton>
        </TabBar>
        <Content>
          {activeTab === "encounters" && (
            (encounters[0]?._id) ? (

              (Object.keys(encounters[0][encounters[0]._id]).includes("Grass") ?
                (
                  <PokemonListHelper encounters={encounters[0][encounters[0]._id]} />
                ) : (
                  Object.keys(encounters[0][encounters[0]._id]).map(floor => {
                    if (floor !== "Hint") {
                      return (
                        <FloorWrapper key={floor}>
                          <Floor>{floor}</Floor>
                          <PokemonListHelper encounters={encounters[0][encounters[0]._id][floor]} />
                        </FloorWrapper>
                      )
                    }
                    else {
                      return (
                        <Hint key={floor}>
                          {`(Hint: ${encounters[0][encounters[0]._id][floor]})`}
                        </Hint>
                      )
                    }
                  })
                )
              )
            ) : (
              <Warning>NO ENCOUNTERS</Warning>
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

const Image = styled.img`
  width: 40px;
  height: 40px;
`

const RouteName = styled.div`
  font-size: 24px;
  text-decoration: underline;
  padding: 10px 0;
  display: flex;  
  align-items: center;
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
  text-shadow: 2px 2px 6px #105E26;
  transition: all 0.2s ease-in-out;
  &.active {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
  &:hover {
    font-size: 18px;
    text-shadow: 4px 4px 12px #105E26;
  }
  `

const Warning = styled.div`
  height: 100%;
  align-self: center;
  padding: 24px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  min-height: 500px;
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