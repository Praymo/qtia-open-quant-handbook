const rank = { D1: 1, D2: 2, D3: 3, D4: 4, D5: 5, Optional: 6 };
/** @param {Array<{id: string, category: string, difficulty: string, week: number, date: string, tags: string[]}>} records @param {Record<string, string>} filters */
export function filterAndSort(records, filters) {
  const byId = (a, b) => a.week - b.week || a.id.localeCompare(b.id, undefined, { numeric: true });
  return records.filter(q => (!filters.week || q.week === Number(filters.week)) && (!filters.category || q.category === filters.category) && (!filters.difficulty || q.difficulty === filters.difficulty) && (!filters.tag || q.tags.includes(filters.tag))).sort((a, b) => {
    if (filters.sort === 'week') return byId(a, b);
    if (filters.sort === 'difficulty') return rank[a.difficulty] - rank[b.difficulty] || byId(a, b);
    return b.date.localeCompare(a.date) || -byId(a, b);
  });
}
