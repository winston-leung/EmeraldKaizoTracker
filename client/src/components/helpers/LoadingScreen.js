import styled, { keyframes } from "styled-components"


const LoadingScreen = ({ hidden }) => {

  return (
    <Wrapper className={hidden ? "hidden" : ""}>
      <Circle />
    </Wrapper>
  )
}

const circleSpin = keyframes`
    0% { 
      transform: rotate(0deg) scale(1); 
      
    }
    50%{
      transform: rotate(180deg) scale(1.1)
    }
    100% { 
      transform: rotate(360deg) scale(1); 
      }
`

const Circle = styled.div`
  border: 8px solid #00A267;
  border-top: 8px solid #105E26;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  animation: ${circleSpin} 1s linear infinite;
`

const Wrapper = styled.div`
  height: calc(100% - var(--header-height));
  width: calc(100% - 24px);
  display: flex;
  align-items: center;
  justify-content: center;  
  z-index: 500;
  position: absolute;
  background-color: white;
  &.hidden {
    display: none;
  }
`

export default LoadingScreen;