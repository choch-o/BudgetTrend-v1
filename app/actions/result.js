import request from 'superagent'

export const GET_POPULAR_TAGS = 'GET_POPULAR_TAGS'

function returnPopularTags(tags) {
  return {
    type: GET_POPULAR_TAGS,
    popularTags: tags
  }
}

export function getPopularTags(tags) {
  return dispatch => {
    request
    .get('/api/popular_tags')
    .end(function (err, res) {
      if (err || !res.ok) {
        console.log("error in popular tags") 
      } else {
        dispatch(returnPopularTags(res.body));
      }
    })
  }
}


