import { useEffect, useState } from "react";
import styled from "styled-components";



const PokemonEncounterHelper = ({ mon }) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (mon?.Pokemon) {
      let pokemon = mon.Pokemon.toLowerCase();

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
        case "farfetch'd":
          pokemon = "farfetchd"
          break;
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

  }, [])

  if (imageSrc) {
    return (
      <Wrapper>
        <Image src={imageSrc} />
        <TextWrapper>
          <Name>{`${mon.Pokemon}`}</Name>
          <Text>{`Level: ${mon.Level}`}</Text>
          <Text>{`Encounter Rate: ${mon["Encounter Rate"]}`}</Text>
          {mon?.Warning && (<Warning>{`Warning: ${mon.Warning}`}</Warning>)}
        </TextWrapper>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  border: 1px solid black;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  width: 80%;
  margin: 8px 0;
`

const Image = styled.img`
  background-color: none; 
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 4px;
`

const Name = styled.div`
  padding: 4px 0;
`

const Text = styled.div`
  padding: 4px 0;

`

const Warning = styled(Text)`
  color: red;
`

export default PokemonEncounterHelper;