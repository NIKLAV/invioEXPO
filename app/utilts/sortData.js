export function sortFunction(a, b) {
  let dateA = new Date(a.created_at).getTime();
  let dateB = new Date(b.created_at).getTime();
  return dateA < dateB ? 1 : -1;
}
