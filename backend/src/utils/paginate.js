// Shared list helper for admin endpoints: pagination + optional filter.
export async function paginate(Model, { query = {}, page = 1, limit = 20, sort = '-createdAt' }) {
  const p = Math.max(1, Number(page) || 1)
  const l = Math.min(100, Math.max(1, Number(limit) || 20))

  const [items, total] = await Promise.all([
    Model.find(query)
      .sort(sort)
      .skip((p - 1) * l)
      .limit(l),
    Model.countDocuments(query),
  ])

  return {
    items,
    pagination: { page: p, limit: l, total, pages: Math.ceil(total / l) || 1 },
  }
}
