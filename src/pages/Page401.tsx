import { Link } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import useLocalStore from '../store/local-store'
import useUserStore from '../store/user-store'

const NotFound = () => {
  const resetUser = useUserStore(state => state.reset)
  const resetLocalStore = useLocalStore(state => state.reset)
  const navigate = useNavigate()

  const onLogout = () => {

    resetLocalStore()
    resetUser()


    return navigate('/login');
  }

  return (<div>
    401 no permission
    <Link href='/' isBlock> back to Home</Link>
    <Link isBlock onClick={onLogout}>Logout</Link>
  </div>

  )
}

export default NotFound