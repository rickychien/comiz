export function filterQuery(query) {
  return {
    type: 'FILTER_QUERY',
    payload: {
      query,
    },
  }
}
