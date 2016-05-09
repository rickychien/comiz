export function filterCategory(category) {
  return {
    type: 'FILTER_CATEGORY',
    payload: {
      category,
    },
  }
}

export function filterQuery(query) {
  return {
    type: 'FILTER_QUERY',
    payload: {
      query,
    },
  }
}
