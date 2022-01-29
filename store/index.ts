import { EventDetailsFull } from "~/common/models/interfaces";
import { AppState, AuthUser, StoreMutations } from "~/common/storeHelpers"

export const state = (): AppState => ({
  currentUser: new AuthUser,
  events: []
})

export const mutations = {
  [StoreMutations.setUser](state: AppState, authUser: AuthUser | null) {
    state.currentUser = authUser;
  },

  [StoreMutations.setEvents](state: AppState, events: EventDetailsFull[]) {
    state.events = events;
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