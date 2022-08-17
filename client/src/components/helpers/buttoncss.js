import { css } from "styled-components";

const button = css`
	font-size: 14px;
	/* outline: 2px solid black; */
	font-family: var(--font);
	cursor: pointer;
	background-color: rgb(192, 192, 192, 0.4);
	border-radius: 8px;
	position: relative;
	line-height: 1.5;
	transition: all 0.2s ease-in-out;
	&:after {
		border-radius: 8px;
		position: absolute;
		top: -2px;
		right: -2px;
		bottom: -2px;
		left: -2px;
		content: "";
	}
	&:hover {
		background-color: rgb(192, 192, 192, 0.8);
	}
`

export const smallbutton = css`
		${button}
		&:after {
			box-shadow: inset -2px -2px 3px #696969;
		}
		&:hover:after {
			box-shadow: inset -4px -4px 3px #696969;
		}
		
		&:active:after{
			box-shadow: inset 4px 4px 3px #696969;
		}

`

export const tabbutton = css`
	${button}
	font-size: 16px;
	margin: 0 auto;
  width: 30%;
  text-align: center;
  line-height: 60px;
  font-weight: bold; 
	transition: all 0.2s ease-in-out;
	&:hover {
    font-size: 17px;
  }
	&:after {
		box-shadow: inset -4px -4px 3px #696969;
		}
	&:hover:after {
		box-shadow: inset -4px -4px 3px #696969;
	}
	&:active:after{
		box-shadow: inset 6px 6px 3px #696969;
	}
	&.active:after {
    box-shadow: inset 6px 6px 3px #696969;
  }
`