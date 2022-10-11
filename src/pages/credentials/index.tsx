import React from 'react'
// import { useLinkClickHandler } from 'react-router-dom'
import { SaveCredentialsForm } from '../../components/SaveCredentialsForm'
// import { useNavigate } from 'react-router-dom'

export default function Credentials (): JSX.Element {
  // const [isOpen, setIsOpen] = useState(false)
  // const navigate = useNavigate()
  // const onClick = useLinkClickHandler('/credentials')
  // useEffect(() => {
  //     setIsOpen(true)
  // }, [onClick, setIsOpen])

  // const handleClose = () => {
  //     setIsOpen(false)
  //     navigate('/')
  // }

  return (
    <>
      <SaveCredentialsForm />
    </>
  )
}
