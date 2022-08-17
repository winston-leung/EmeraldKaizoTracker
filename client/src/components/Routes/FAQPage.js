import styled from "styled-components";
import { faq } from '../data/text'

const FAQPage = () => {
  return (
    <Wrapper>
      <Title>FAQ</Title>
      {faq.map((question, index) => {
        return (
          <TextWrapper key={index}>
            <TextTitle>{question.title}</TextTitle>
            {question.text.map((para, index) => {
              return <Text dangerouslySetInnerHTML={{ __html: para }} key={index}></Text>
            })}

          </TextWrapper>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: var(--page-padding);
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Title = styled.h1`
  font-size: 24px;
  text-decoration: underline;
  padding: 4px 0;
  align-self: flex-start;
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
export default FAQPage;