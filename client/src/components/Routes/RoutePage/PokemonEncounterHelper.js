import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { RouteContext } from "./RouteContext";



const PokemonEncounterHelper = ({ mon, floor, type }) => {
  const [pokeId, setPokeId] = useState(null);
  const floorData = floor;
  const typeData = type;

  const { stateRoute, actions: { handlePokeSelect } } = useContext(RouteContext);

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
        case "":
          return;
        default:
          break;
      }

      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(res => res.json())
        .then(data => {
          setPokeId(data.id)

        })
        .catch(err => console.log(err))
    } else {
      console.log(mon)
    }
    // eslint-disable-next-line
  }, [])

  const handlePokeClick = (e) => {
    const selectedPokemon = {
      id: e.currentTarget.id,
      type: typeData,
      floor: floorData,
      name: e.currentTarget.getAttribute("name")
    }
    handlePokeSelect(selectedPokemon);
  }

  return (
    <Wrapper
      id={pokeId}
      name={mon.Pokemon}
      onClick={handlePokeClick}
      className={
        (pokeId === Number(stateRoute.selectedPokemon.id)
          && floorData === stateRoute.selectedPokemon.floor
          && typeData === stateRoute.selectedPokemon.type)
        && "active"}>
      <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/${pokeId}.png`} />
      <TextWrapper>
        <Name>{`${mon.Pokemon}`}</Name>
        <Text>{`Level: ${mon.Level}`}</Text>
        <Text>{`Encounter Rate: ${mon["Encounter Rate"]}`}</Text>
        {mon?.Warning && (<Warning>{`Warning: ${mon.Warning}`}</Warning>)}
      </TextWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  border: 1px solid black;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  width: 90%;
  margin: 8px auto;
  transition: all 125ms ease-in-out;
  cursor: pointer;
  border-radius: 8px;
  &:hover {
    transform: scale(1.05);
  }
  &.active {
    outline: 8px solid var(--color-dark-emerald);
  }
`

const Image = styled.img`
  background-color: none; 
  width: 70px;
  height: 70px ;
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 4px;
  flex-wrap: nowrap;
`

const Name = styled.label`
  padding: 4px 0;
  font-size: 16px;
`

const Text = styled.div`
  padding: 4px 0;
  font-size: 14px;
`

const Warning = styled(Text)`
  color: red;
`

export default PokemonEncounterHelper;