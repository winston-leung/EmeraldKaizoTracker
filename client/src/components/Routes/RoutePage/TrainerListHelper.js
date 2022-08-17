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
                {trainer["Double?"] === "TRUE" && <Text>**Double Battle**</Text>}
                <PokemonList>
                  {Object.keys(trainer.Pokemon).map((pokeName) => {
                    if (!pokeName) return null;

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
        <Warning>NO TRAINERS</Warning>
      )}
    </Wrapper>
  )
}

const Warning = styled.div`
  height: 100%;
  align-self: center;
  padding: 24px;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  padding: 4px 0;
  color: red;
`

const PokemonList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`


export default TrainerListHelper;