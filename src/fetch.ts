import useInitDataStore from './store/initData'
import useUserStore from './store/user'

const sleep = (delay:number) => new Promise(resolve => {
  setTimeout(resolve, delay)
})


export const tokenInvalid = async () => {
  await sleep(2000)
  localStorage.removeItem('token')
   const resetUser = useUserStore.getState().reset
  const resetInitData = useInitDataStore.getState().reset

    resetUser()
    resetInitData()
  return {

  }
}