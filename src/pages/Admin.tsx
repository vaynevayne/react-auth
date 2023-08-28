import { Button } from '@nextui-org/react'

const Admin = () => {

  const onCreateError = () => {
    throw new Error('sasa')
  }

  return (<div>
    Admin
    <Button onClick={onCreateError}>触发错误</Button>
  </div>

  )
}

export default Admin