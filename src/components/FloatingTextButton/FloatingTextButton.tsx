import { Button, Text } from '@radix-ui/themes'
import type { ComponentPropsWithoutRef } from 'react'
import React, { ReactNode, useRef, useState } from 'react'

interface FloatingTextButtonProperties
  extends ComponentPropsWithoutRef<typeof Button> {
  floatingText: string
  children?: ReactNode
}

const FloatingTextButton: React.FC<FloatingTextButtonProperties> = ({
  floatingText,
  onClick,
  children,
  ...buttonProperties // Collect all other props to pass to the Button
}) => {
  const [animations, setAnimations] = useState<{ id: number }[]>([])
  const animationIdReference = useRef(0)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Create a new animation
    const updatedAnimation = {
      id: animationIdReference.current,
    }

    // Increment the animation ID for the next click
    animationIdReference.current += 1

    // Add the new animation to the list
    setAnimations((previous) => [...previous, updatedAnimation])

    // Remove the animation after it completes
    setTimeout(() => {
      setAnimations((previous) =>
        previous.filter((animation) => animation.id !== updatedAnimation.id)
      )
    }, 1000)

    // Call the onClick handler passed from props if it exists
    if (onClick) {
      onClick(event)
    }
  }

  return (
    <div className="relative">
      <Button {...buttonProperties} onClick={handleClick}>
        {children}
      </Button>

      {animations.map((animation) => (
        <div
          key={animation.id}
          className="animate-float pointer-events-none absolute top-0 right-0 z-20"
        >
          <Text color="green" className="font-bold">
            {floatingText}
          </Text>
        </div>
      ))}
    </div>
  )
}

export default FloatingTextButton
