/**
 * This context will hold all of our application data like the current
 * user's api Keys, currently viewed directory, etc
 */

import React, { createContext } from 'react'

export const initialData: Object = {}

export type ThemeContextType = [
  Object,
  React.Dispatch<React.SetStateAction<Object>>
]

export const ThemeContextInternal = createContext<ThemeContextType>(
  Object.create({})
)
