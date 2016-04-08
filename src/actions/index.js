export const filterCategory = (category) => {
  return {
    type: 'FILTER_CATEGORY',
    category
  }
}

export const filterQuery = (query) => {
  return {
    type: 'FILTER_QUERY',
    query
  }
}
