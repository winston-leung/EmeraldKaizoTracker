import styled, { keyframes } from "styled-components"


const LoadingScreen = () => {

  return (
    <Wrapper />
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

const Wrapper = styled.div`
  border: 8px solid #00A267;
  border-top: 8px solid #105E26;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  animation: ${circleSpin} 1s linear infinite;
`

export default LoadingScreen;