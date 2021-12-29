import { AppState, AuthUser, StoreMutations } from "~/common/storeHelpers"

export const state = () => ({
  currentUser: new AuthUser
})

export const mutations = {
  [StoreMutations.setUser](state: AppState, authUser: AuthUser | null) {
    state.currentUser = authUser;
  }
}

export const getters = {
  currentUser(state: AppState) {
    return state.currentUser
  },

  isLoggedIn({ currentUser }: AppState) {
    return currentUser?.token ? true : false;
  }
}