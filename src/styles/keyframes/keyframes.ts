import { keyframes } from 'styled-components';

export const autoRunFreela = keyframes`
  0% {
    transform: translateX(0);  
  }
  100% {
    transform: translateX(-100%);
  }
`;

export const autoRunStack = keyframes`
  100% {
    left: -200px;
  }
`;

export const showDown = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, -30px, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

export const hideDown = keyframes`
  0% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  100% {
    opacity: 0;
    transform: translate3d(0, 40px, 0);
  }
`;

export const next = keyframes`
  0% {
    opacity: 0;
    transform: rotate(45deg) translate(-5px, -5px);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(45deg) translate(20px, 20px);
  }
`;

export const scrolling = keyframes`
  0% {
    transform: translateY(-10px);
    opacity: 1;
  }
  50% {
    transform: translateY(8px);
    opacity: 0.5;
  }
  100% {
    transform: translateY(14px);
    opacity: 0;
  }
`;

export const snake = keyframes`
  0%,
  100% {
    transform: rotate(0deg);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: rotate(-10deg);
  }
  20%,
  40%,
  60%,
  80% {
    transform: rotate(10deg);
  }
`;

export const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

export const flight = keyframes`
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-1000px);
  }
`;

export const spinner = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

export const dash = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
`;

export const color = keyframes`
100%,
  0% {
    stroke: #122442;
  }
  40% {
    stroke: #225E84;
  }
  66% {
    stroke: #122442;
  }
  80%,
  90% {
    stroke: #225E84;
  }
`;

export const loader = keyframes`
  0% {
    transform: rotate(0deg);
  }
  
  25% {
    transform: rotate(180deg);
  }
  
  50% {
    transform: rotate(180deg);
  }
  
  75% {
    transform: rotate(360deg);
  }
  
  100% {
    transform: rotate(360deg);
  }
`;

export const loaderInner = keyframes`
  0% {
    height: 0%;
  }
  
  25% {
    height: 0%;
  }
  
  50% {
    height: 100%;
  }
  
  75% {
    height: 100%;
  }
  
  100% {
    height: 0%;
  }
`;
