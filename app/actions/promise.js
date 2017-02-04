export const SELECT_PROMISE = 'SELECT_PROMISE'
export function selectPromise(promise) {
  return (dispatch, getState) => {
    return {
      type: SELECT_PROMISE,
      promise
    }
  }
}
