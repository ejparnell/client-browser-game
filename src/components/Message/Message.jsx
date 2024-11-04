import { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

const messageTypeColors = {
    success: '#4CAF50',
    error: '#F44336',
}

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

const Box = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: ${({ $type }) => messageTypeColors[$type]};
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  animation: ${({ $isfading }) => ($isfading ? fadeOut : 'none')} 2s forwards;
`

const MessageText = styled.span`
  flex: 1;
`

const CloseButton = styled.div`
  cursor: pointer;
  margin-left: 1rem;
  position: relative;
  width: 20px;
  height: 20px;

  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 20px;
    height: 2px;
    background-color: white;
    top: 50%;
    left: 0;
    transform-origin: center;
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`

export function Message({ message, duration = 5000, onClose }) {
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setIsFading(true), duration - 2000)
    const fadeTimeout = setTimeout(() => onClose(), duration)

    return () => {
      clearTimeout(timeout)
      clearTimeout(fadeTimeout)
    }
  }, [duration, onClose])

  return (
    <Box $isfading={isFading} $type={message.type}>
      <MessageText>{message.message}</MessageText>
      <CloseButton onClick={onClose} />
    </Box>
  )
}
