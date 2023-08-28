import { Link } from '@nextui-org/react'
import { useLocation, useNavigate } from 'react-router-dom'
import useInitDataStore from '../store/initData'
import useUserStore from '../store/user'

const NotFound = () => {
  const resetUser = useUserStore(state => state.reset)
  const resetInitData = useInitDataStore(state => state.reset)
  const navigate = useNavigate()
  const location = useLocation()

  const onLogout = () => {

    localStorage.removeItem('token')
    resetUser()
    resetInitData()

    let params = new URLSearchParams();
    params.set('from', location.pathname);
    return navigate('/login?' + params.toString());
  }

  return (<div>
    401 no permission
    <Link href='/' isBlock> back to Home</Link>
    <Link isBlock onClick={onLogout}>Logout</Link>
  </div>

  )
}

export default NotFound