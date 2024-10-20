export function formatDateFromApi(date) {
  var tmp = date

  tmp = tmp.split('T')[0].split('-').reverse().join('.')
  return tmp
}

export function formatDateForInputFromApi(date) {
  var tmp = date

  tmp = tmp.split('T')[0]
  return tmp
}

export function formatDateForApi(date) {
  var tmp = date

  return tmp
}
//2004-01-08T00:00:00
