import styled from "styled-components";
import { maintext, sitetext } from "../data/text";

const HomePage = () => {

  return (

    <Wrapper>
      <Image src="/assets/b9cc5z21wvx51.png" />
      <TextWrapper>
        <TextTitle>{maintext.title}</TextTitle>
        {maintext.text.map((para, index) => {
          return <Text dangerouslySetInnerHTML={{ __html: para }} key={index}></Text>
        })}
      </TextWrapper>
      <TextWrapper>
        <TextTitle>{sitetext.title}</TextTitle>
        <Text>{sitetext.text}</Text>
      </TextWrapper>
    </Wrapper>
  )
}

const Image = styled.img`
  width: 20%;
  height: 20%;
`

const Wrapper = styled.div`
  padding: var(--page-padding);
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
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

export default HomePage;