import styled from "styled-components"


const Footer = () => {

  return (
    <Wrapper>
      <Text>Emerald Kaizo information compiled and curated by the PokemonChallenges community can be found in this <a href='https://drive.google.com/drive/folders/1_isyb2s0e8GStgzBplm9ivwYOm9sU9fA'>Google Drive</a>.</Text>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Text = styled.div`
  font-family: var(--font);
  font-size: 14px;
  max-width: 1000px;
  line-height: 1.4;
`
export default Footer;