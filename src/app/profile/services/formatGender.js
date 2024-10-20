export function formatGenderFromApi(gender) {
  const variants = ['Мужчина', 'Женщина']
  return variants[gender]
}
