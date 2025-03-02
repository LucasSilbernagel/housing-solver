import { Button, Text } from '@radix-ui/themes'
import type { ComponentPropsWithoutRef } from 'react'
import React, { ReactNode, useState } from 'react'

// Create a type that extends both the Radix Button props and our custom props
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
  const [showAnimation, setShowAnimation] = useState(false)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Show the animation
    setShowAnimation(true)

    // Remove after 1 second
    setTimeout(() => {
      setShowAnimation(false)
    }, 1000)

    // Call the original onClick handler if it exists
    if (onClick) {
      onClick(event)
    }
  }

  return (
    <div className="relative">
      <Button
        {...buttonProperties} // Spread all other button props
        onClick={handleClick}
      >
        {children}
      </Button>

      {/* Fixed position test animation - should be visible in the center of screen */}
      {showAnimation && (
        <Text className="floating-text" color="green">
          {floatingText}
        </Text>
      )}
    </div>
  )
}

export default FloatingTextButton
