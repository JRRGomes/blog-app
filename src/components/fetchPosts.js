import { api } from '../api'

const pageArray = (total, size) => {
  const totalPages = total / size;
  const fullPages = Math.floor(totalPages);
  const partialPage = total % size;
  return [... new Array(fullPages).fill(size), partialPage].filter(Boolean)
}

export const fetchPosts = (totalPosts, pageSize) => pageArray(totalPosts, pageSize)
  .map(
    (currentPageSize, index) => () => {
    return api.get('/posts', {
      params: {
        _start: index * pageSize,
        _limit: currentPageSize,
      },
    })
    .then((res) => res.data)
    .then((res) => 
      res.map((postObj) => 
        api.get(`/posts/${postObj.id}/comments`)
        .then((commentsObj) => {
          postObj.comment = commentsObj.data
          return postObj
        })
      )
    ).then((res) => Promise.all(res))
  })
  .reduce((chain, listPostFn) => chain.then((acc) => listPostFn().then((res) => [...acc, ...res])),
    Promise.resolve([]))
