import PokemonEncounterHelper from "./PokemonEncounterHelper";
import styled from "styled-components";

const PokemonListHelper = ({ encounters, floor }) => {

  return (
    <Wrapper>
      {Object.keys(encounters).map((type) => {

        //return if type key is a hint
        if (type === "Hint") {
          return (
            <Hint key={type}>
              {`(Hint: ${encounters[type]})`}
            </Hint>
          )
        }

        //return nothing if theres to enoucnter types
        if (!encounters[type].length > 0) return null;

        return (
          <LocationWrapper
            key={type}
          >
            <Location>{type}</Location>
            <PokemonList>
              {encounters[type].map((mon) => {
                return (
                  <Pokemon key={mon.Pokemon}>
                    <PokemonEncounterHelper
                      mon={mon}
                      floor={floor}
                      type={type}
                    />
                  </Pokemon>
                )
              })}
            </PokemonList>
          </LocationWrapper >
        )
      })
      }

    </Wrapper >
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding: 8px 16px;
`

const LocationWrapper = styled.div`
  padding: 4px 0;
  order: 3;
  /* border: 1px solid black; */
`

const Location = styled.div`
  text-decoration: underline;
  font-size: 20px;
  padding: 4px;
`

const PokemonList = styled.ul`
  display: flex;
  flex-wrap: wrap;

`

const Pokemon = styled.li`
  width: 600px;
  padding: 2px 0;
  flex-wrap: wrap;
  display: flex;
`

const Hint = styled(LocationWrapper)`
  order: 0;
`



export default PokemonListHelper;