import PokemonEncounterHelper from "./PokemonEncounterHelper";
import styled from "styled-components";
import { useState } from "react";

const PokemonListHelper = ({ encounters }) => {

  return (
    <Wrapper>
      {
        Object.keys(encounters).map((type) => {
          if (type !== "Hint") {
            if (encounters[type].length > 0) {
              return (
                <LocationWrapper key={type}>

                  <Location>{type}</Location>
                  <PokemonList>
                    {encounters[type].map((mon) => {
                      return (
                        <Pokemon key={mon.Pokemon}>
                          <PokemonEncounterHelper mon={mon} />
                        </Pokemon>
                      )
                    })}
                  </PokemonList>
                </LocationWrapper >
              )
            } else return

          }
          else {
            return (
              <Hint key={type}>
                {`(Hint: ${encounters[type]})`}
              </Hint>
            )
          }
        })
      }
    </Wrapper>
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
`

const Location = styled.div`
  text-decoration: underline;
  font-size: 20px;
  padding: 4px;
`

const PokemonList = styled.ul`
  display: block;
  width: 100%;
  column-count: 2;
  column-gap: 0;
`

const Pokemon = styled.li`
overflow: hidden;
`

const Hint = styled(LocationWrapper)`
  order: 0;
`

export default PokemonListHelper;