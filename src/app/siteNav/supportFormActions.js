import fetchEndpoint from 'app/utils/fetchEndpoint'

export const FORM_RESPONSE = 'FORM_RESPONSE'
export const SET_SUPPORT_MODAL_VISIBILITY = 'SET_SUPPORT_MODAL_VISIBILITY'

export function submitForm(data, endpoint) {
  return (dispatch) => {
    fetchEndpoint(endpoint, { method: 'POST', body: data })
      .then(() => {
        dispatch({
          type: FORM_RESPONSE,
          payload: {
            status: 200,
          },
        })
      })
      .catch((e) => {
        console.warn(e)
        dispatch({
          type: FORM_RESPONSE,
          payload: {
            status: e.status || 500,
          },
        })
      })
  }
}

export function setSupportModalVisibility(visibility) {
  return {
    type: SET_SUPPORT_MODAL_VISIBILITY,
    payload: visibility,
  }
}

export { submitForm as default }
