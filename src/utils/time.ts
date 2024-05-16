const getTime = () => {
  const hour = new Date().getHours()
  if (hour <= 6) {
    return '凌晨好'
  } else if (hour <= 12) {
    return '上午好'
  } else if (hour <= 18) {
    return '下午好'
  } else if (hour <= 24) {
    return '晚上好'
  }
}

export default getTime
