const resMock = require('./mock.response.json')

module.exports = function (context, req) {
  context.log('"' + context.executionContext.functionName + '" is processed a request by ' + context.executionContext.invocationId)
  context.res = {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: resMock
  }
  context.done()
}
