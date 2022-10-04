/**
 * This context will hold all of our application data like the current
 * user's api Keys, currently viewed directory, etc
 */

import { createContext } from 'react'

export const ApplicationContext = createContext(Object.create(null))
