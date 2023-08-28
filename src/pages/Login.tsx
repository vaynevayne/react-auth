import { Button, ButtonGroup } from '@nextui-org/react';
import {
  useLocation, useNavigate
} from 'react-router-dom';


const Login = () => {
  let location = useLocation();
  const navigate = useNavigate()
  let params = new URLSearchParams(location.search);
  let from = params.get('from') || '/';


  const onLogin = () => {
    localStorage.setItem('token', '1')
    console.log('from', from);

    return navigate(from || '/', { replace: true });
  }

  const onLogin2 = () => {
    localStorage.setItem('token', '2')
    console.log('from', from);
    return navigate(from || '/', { replace: true });
  }

  const onLogin3 = () => {
    localStorage.setItem('token', '3')
    console.log('from', from);
    return navigate(from || '/', { replace: true });
  }

  return (<div>
    Login
    <ButtonGroup>
      <Button onClick={onLogin} color='primary'>Login(Custom)</Button>
      <Button onClick={onLogin2} color='secondary'>Login(Admin) </Button>
      <Button onClick={onLogin3}>Login(no permission) </Button>
    </ButtonGroup>

  </div>

  )
}

export default Login