import { Button } from '@nextui-org/react'

const Home = () => {

  const onCreateError = () => {
    throw new Error('sasa')
  }

  return (<div>
    Home
    <Button onClick={onCreateError}>触发错误</Button>
  </div>

  )
}

export default Home