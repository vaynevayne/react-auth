import { Button, Link } from '@nextui-org/react';
import { Suspense } from 'react';
import {
  Outlet, useLocation, useNavigate
} from 'react-router-dom';
import { tokenInvalid } from '../fetch';
import useInitDataStore from '../store/initData';
import useUserStore from '../store/user';

const Layout = () => {
  const resetUser = useUserStore(state => state.reset)
  const resetInitData = useInitDataStore(state => state.reset)
  const navigate = useNavigate()
  const location = useLocation()

  const onLogout = () => {
    localStorage.removeItem('token')
    // 因为zustand 的 set 是状态合并,切换到覆盖模式,会导致函数丢失, 比较难处理, 因此每次退出登录时,都需要清空 state
    resetUser()
    resetInitData()

    let params = new URLSearchParams();
    params.set('from', location.pathname);
    return navigate('/login?' + params.toString());
  }

  const onTokenInvalid = () => {
    tokenInvalid()
  }
  return (<div>
    Layout Page
    <div className="flex gap-2">
      <Link href="/admin" color="foreground">
        Admin
      </Link>
      <Link href="/custom" color="primary">
        custom
      </Link>
      <Link href="/login" color="secondary">
        login
      </Link>

    </div>

    <Suspense fallback={<div>loading...</div>}>
      <Outlet></Outlet>
    </Suspense>
    <div>
      <Button onClick={onLogout}>Logout</Button>
      <Button onClick={onTokenInvalid}>mock token Invalid</Button>
    </div>

  </div>

  )
}

export default Layout