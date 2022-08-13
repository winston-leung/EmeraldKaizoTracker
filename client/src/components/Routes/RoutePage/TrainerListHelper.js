import styled from "styled-components";
import TrainerPokemonHelper from "./TrainerPokemonHelper";


const TrainerListHelper = ({ trainers }) => {

  return (
    <Wrapper>
      {trainers.length > 0 ? (
        <List>
          {trainers.map((trainer) => {
            return (
              <TrainerWrapper key={trainer._id}>
                <Name>{`Trainer: ${trainer.Trainer}`}</Name>
                {trainer["Double?"] === "TRUE" && <Text>Double Battle</Text>}
                <PokemonList>
                  {Object.keys(trainer.Pokemon).map((pokeName) => {
                    return (
                      <TrainerPokemonHelper mon={trainer.Pokemon[pokeName]} key={pokeName} pokeName={pokeName} />
                    )
                  })}
                </PokemonList>
              </TrainerWrapper>
            )
          })}
        </List>
      ) : (
        <Name>No trainers</Name>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
`

const List = styled.ul`

`

const TrainerWrapper = styled.div`
  border: 1px solid black;
  padding: 10px;
`

const Name = styled.div`
  text-decoration: underline;
  font-size: 18px;
  padding: 8px 0;
`

const Text = styled.div`

`

const PokemonList = styled.ul`
  display: grid;
  grid-template-columns: 50% 50%;
`


export default TrainerListHelper;