export default {
  format(dateInput, format) {
      let Year = dateInput.getFullYear()
      let Month = dateInput.getMonth() +1
      let day = dateInput.getDate()
      let hour = dateInput.getHours()
      let min = dateInput.getMinutes()
      let second = dateInput.getSeconds();
      format = format.replace(/yyyy/,Year)
      format = format.replace(/MM/,Month)
      format = format.replace(/dd/,day)
      format = format.replace(/HH/,hour)
      format = format.replace(/mm/,min)
      format = format.replace(/ss/,second)
      return format
  },
  transformTime(time) {}
}