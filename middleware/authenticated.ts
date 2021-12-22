

export default function ({ store, redirect }: any) {
  const { authUser } = store.state.auth
  const authUserInSession = sessionStorage.getItem('auth')

  // if (authUserInSession) {
  //   const data = JSON.parse(authUserInSession)
  //   store.commit(MUTATIONS.auth.saveAuthData, data)
  // }

  // if (!authUser && !authUserInSession) {
  //   return redirect('/login')
  // }
}
