import { api } from '../api'

const totalPosts = 95;
const pageSize = 20;

const pageArray = (total, size) => {
  const totalPages = total / size;
  const fullPages = Math.floor(totalPages);
  const partialPage = total % size;
  return [... new Array(fullPages).fill(size), partialPage].filter(Boolean)
}

export const fetchPosts = pageArray(totalPosts, pageSize)
  .map(
    (pageSize, index) => () => {
    return api.get(`/posts`, {
      params: {
        _start: index * pageSize,
        _limit: pageSize,
      },
    })
    .then((res) => res.data);
    })
  .reduce((chain, listPostFn) => chain.then((acc) => listPostFn().then((res) => [...acc, ...res])),
    Promise.resolve([]))