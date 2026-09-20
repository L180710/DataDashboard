export const getLast7Days = () => {
  const result: string[] = []

  const today = new Date()

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today)

    date.setDate(today.getDate() - i)

    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    result.push(`${month}-${day}`)
  }
  return result
}
