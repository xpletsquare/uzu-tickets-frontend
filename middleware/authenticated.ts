import { AppState, StoreMutations } from "~/common/storeHelpers"


export default function ({ store, redirect }: any) {
  const { currentUser } = store.state as AppState;
  const authUserInSession = sessionStorage.getItem('auth')

  if (authUserInSession) {
    const data = JSON.parse(authUserInSession)
    store.commit(StoreMutations.setUser, data)
  }

  // console.log({ authUserInSession, currentUser })

  if (!currentUser?.token && !authUserInSession) {
    return redirect('/login')
  }
}
