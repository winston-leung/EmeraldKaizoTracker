import styled from "styled-components";
import { nuzlocke_rules } from "../data/text";

const NuzlockPage = () => {

  return (

    <Wrapper>
      <TextWrapper>
        <TextTitle>What is a Nuzlocke Run?</TextTitle>
        <Text>{nuzlocke_rules.text}</Text>
        {nuzlocke_rules.main.map((para, index) => {
          return <Text key={index}>{`${index + 1}. ${para}`}</Text>
        })}
      </TextWrapper>
      <TextWrapper>
        <TextTitle>Optional Rules</TextTitle>
        {nuzlocke_rules.optional.map((para, index) => {
          return <Text key={index}>{`- ${para}`}</Text>
        })}
      </TextWrapper>
      <TextWrapper>
        <TextTitle>{`Source: More information on ${nuzlocke_rules.source}`}</TextTitle>
      </TextWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: var(--page-padding);
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const TextWrapper = styled.div`
  padding: 10px 4px;
  width: 80%;
  align-self: center;
`

const TextTitle = styled.h2`
  font-size: 18px;
  padding: 4px 0;
  border-bottom: 2px solid black;
`

const Text = styled.div`
  padding: 6px 0;
  font-size: 14px;
  line-height: 1.35;
`

export default NuzlockPage;