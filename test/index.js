import fetch from 'node-fetch'

const colors = {
    FG_RED: '\x1b[31m',
    FG_GREEN: '\x1b[32m',
    FG_CYAN: '\x1b[36m',
    FG_BLUE: '\x1b[34m'
}

let passed = 0
let notPassed = 0

const host = 'localhost'
const port = process.env.PORT || 3000
let server = 'undefined'

let runAfterEach = () => { }

function testResults() {
    console.log(colors.FG_CYAN, `-------------------TEST RESULTS-------------------`)
    if (notPassed > 0) {
        console.log(colors.FG_GREEN, `${passed} tests is success in total`)
        console.log(colors.FG_RED, `${notPassed} tests is failed in total`)
    } else {
        console.log(colors.FG_GREEN, `All test is success ✔`)
    }
    console.log(colors.FG_CYAN)
    console.log('\x1b[0m', 'Tests finished')
    console.log('Bye! 🖐')
    process.exit(0)
}


export const describe = (title, functions, { afterEnd, afterEach, app, syncEnd = true }) => {

    if (app != undefined) {
        server = app
        console.log('✔ Server is running');
    }
    if (typeof afterEach === 'function') {
        runAfterEach = afterEach
    }

    console.log(colors.FG_CYAN, `-------------------${title}-------------------`)
    functions()
    if (syncEnd) {
        testResults()
    }
}

export const it = (title, control) => {
    console.log(colors.FG_BLUE, `it: ${title}`)
    control()
}

export const equalTo = (received, excepted) => {
    if (received === excepted) {
        passed++
        console.log(colors.FG_GREEN, `📃  ✔ ${received} equal to ${excepted}`)
    } else {
        notPassed++
        console.error(colors.FG_RED, `📃 ❌ Error: ${received} is not equal to ${excepted}`)
    }
    runAfterEach()
}

export const typeIs = (received, excepted) => {
    if (typeof received === excepted) {
        passed++
        console.log(colors.FG_GREEN, `📃  ✔ ${received} typeof is ${excepted}`)
    } else {
        notPassed++
        console.error(colors.FG_RED, `📃 ❌ Error: ${received} is ${typeof received} excepted ${excepted}`)
    }
    runAfterEach()
}

class Service {
    constructor() {
        if (typeof server === 'string') return
    }
    async sendGetRequest(endpoint) {
        const response = await fetch(`http://${host}:${port}/${endpoint}`)
        const data = await response.text()
        this.statusCode = response.status
        this.data = data
        return this
    }
    excepted(exceptedStatusCode, { finishHere = false }) {
        if (exceptedStatusCode == this.statusCode) {
            passed++
            console.log(colors.FG_GREEN, `✔ Status Code is ${this.statusCode}`)
        } else {
            notPassed++
            console.error(colors.FG_RED, `❌ Status is code is not ${exceptedStatusCode}`)
            console.log(colors.FG_RED, this.data)
        }
        runAfterEach()
        if (finishHere) {
            testResults()
        }
        return this
    }
    returnedData() {
        console.log(`- Received Data ${this.data}`)
        runAfterEach()
    }
}

export const service = new Service()

Function.prototype.skip = function () {
    return false
}

