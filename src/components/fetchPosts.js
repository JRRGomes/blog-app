import { api } from '../api'

const pageArray = (total, size) => {
  const totalPages = total / size;
  const fullPages = Math.floor(totalPages);
  const partialPage = total % size;
  return [... new Array(fullPages).fill(size), partialPage].filter(Boolean)
}

const requestUser = (userId) => {
  return api.get(`/users/${userId}`)
  .then((userRes) => {
    return userRes.data
  })
}

const fetchUsers = (posts) => {
  const uniqueUsers = new Set (posts.map((post) => {
    return post.userId
  }))
  const promises = Array.from(uniqueUsers).map((userId) => {
    return requestUser(userId)
  })
  return Promise.all(promises)
  .then((users) => {
    return posts.map((post) => {
      const user = users.find(user => user.id === post.userId)
      return {...post, user}
    })
  })
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
        .then(({ data: comments }) => {
          return {...postObj, comments}
        })
      )
    ).then((res) => Promise.all(res))
  })
  .reduce((chain, listPostFn) => chain.then((acc) => listPostFn().then((res) => [...acc, ...res])),
    Promise.resolve([]))
    .then((posts) => fetchUsers(posts))
    