import { useMemo, useState } from 'react'
import { ApplicationState } from '../contexts/application/ApplicationContext'
import { getApplicationStateLS } from '../services/localstorage'

interface ApplicationStateHookReturn {
  data: ApplicationState | undefined
  isLoaded: boolean
}

export const useGetApplicationStateFromLs = (initialData: ApplicationState | undefined): ApplicationStateHookReturn => {
  const [d, setD] = useState<ApplicationState | undefined>(initialData)
  const [isLoaded, setIsLoaded] = useState(false)
  useMemo(() => {
    getApplicationStateLS(
      JSON.stringify(initialData)
    ).then(data => {
      setD(data)
      setIsLoaded(true)
    })
      .catch(() => {
        console.log('[useGetApplicationStateFromLs] Promise failure getApplicationStateLS')
      })
  }, [initialData])

  return { data: d, isLoaded }
}
