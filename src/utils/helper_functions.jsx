export const getPageArray = (current, last) => {
  const arr = []
  if (last < 6) {
    for (let i = 1; i <= last; i += 1) {
      arr.push(i)
    }
    return arr
  } else {
    switch (current) {
      case 1 || 2 || 3:
        return [1, 2, 3]

      case last || last - 1 || last - 2:
        return [last - 2, last - 1, last]

      default:
        return [current - 1, current, current + 1]
    }
  }
}
