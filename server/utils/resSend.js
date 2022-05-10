class ResSend {
  constructor(res, code, data) {
    this.res = res
    this.code = code
    // this.message = message
    this.data = data
  }
  send() {
    this.res.send({
      code: this.code,
      data: this.data
    })
  }
}

module.exports = ResSend
