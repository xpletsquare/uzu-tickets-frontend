import { createAxiosInstance, getAuthHeaders } from '.'
import { catchAsync } from '~/common/utilities'

const wallet = createAxiosInstance('/wallet')

export const WalletApi = {
  listWallets() {
    return catchAsync(() => wallet.get('', getAuthHeaders()))
  },

  getWalletDetails(userid: string) {
    return catchAsync(() => wallet.get(`/user/${userid}`, getAuthHeaders()))
  },
}
