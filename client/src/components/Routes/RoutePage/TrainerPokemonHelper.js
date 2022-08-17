import { useEffect, useState } from "react";
import styled from "styled-components";

const TrainerPokemonHelper = ({ mon, pokeName }) => {
  const [imageSrc, setImageSrc] = useState(null);

  //fetch pokemon id with name 
  //store id inside sprite url
  useEffect(() => {
    if (pokeName) {
      let pokemon = pokeName.toLowerCase();

      switch (pokemon) {
        case "nidoran (f)":
          pokemon = "nidoran-f"
          break;
        case "nidoran (m)":
          pokemon = "nidoran-m"
          break;
        case "mr. mime":
          pokemon = "mr-mime"
          break;
        case "null":
          return;
        default:
          break;
      }

      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(res => res.json())
        .then(data => {
          setImageSrc(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/${data.id}.png`)
        })
        .catch(err => console.log(err))
    } else {
      console.log(mon)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Wrapper>
      <Image src={imageSrc} />
      <Pokemon >
        <PokeText>{`${pokeName} - Level: ${mon.Lvl}`}</PokeText>
        <PokeText>{`Nature: ${mon.Nature} - IV: ${mon.IV}`}</PokeText>
        <PokeText>{`Held Item: ${mon.Item}`}</PokeText>

        <MoveList>
          <Move>{`Move 1: ${mon["Move 1"]}`}</Move>
          <Move>{`Move 2: ${mon["Move 2"]}`}</Move>
          <Move>{`Move 3: ${mon["Move 3"]}`}</Move>
          <Move>{`Move 4: ${mon["Move 4"]}`}</Move>
        </MoveList>
      </Pokemon>
    </Wrapper>

  )
}

const Image = styled.img`
  width: 70px;
  height: 70px;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 550px;
  margin: 10px 24px;
  padding: 4px;
  border: 1px solid black;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
`

const Pokemon = styled.li`
  padding: 8px;

`

const PokeText = styled.div`
  padding: 2px 0;
  font-size: 14px;
  &:first-of-type {
    font-size: 16px;

  }
`

const MoveList = styled.ul`

`

const Move = styled.li`
  font-size: 14px;
  padding: 2px 0;
`

export default TrainerPokemonHelper;