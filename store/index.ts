import { EventDetailsFull } from "~/common/models/interfaces";
import { AppState, AuthUser, StoreMutations } from "~/common/storeHelpers"

export const state = (): AppState => ({
  currentUser: new AuthUser,
  events: [],
  editEvent: false,
})

export const mutations = {
  [StoreMutations.setUser](state: AppState, authUser: AuthUser | null) {
    state.currentUser = authUser;
  },

  [StoreMutations.setEvents](state: AppState, events: EventDetailsFull[]) {
    state.events = events;
  },

  [StoreMutations.setEditMode](state: AppState, mode: boolean){
    state.editEvent = mode;
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