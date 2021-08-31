import { describe, it, equalTo, typeIs, service } from './test/index.js'
import app from './src/index.js'
describe('index.js', () => {
    it('should be equal to 2', () => {
        const total = 1 + 1
        equalTo(total, 2)
    })
    it('should be equal to 3', () => {
        const total = 1 + 2
        equalTo(total, 3)
    })
    it('should be equal to 4', () => {
        const total = 1 + 2
        equalTo(total, 4)
    })
    it('should be string', () => {
        const name = 'jfla'
        typeIs(name, 'string')
    })
    it('should return 200 status code', async () => {
        await service.sendGetRequest('').then(req => req.excepted(200, { finishHere: false }))
    })
    it('should return 404 status code', async () => {
        await service.sendGetRequest('asdfasdf').then(req => req.excepted(200, { finishHere: true }))
    })
}, {
    afterEnd: () => {
        console.log('after end worked!');
    },
    afterEach: () => {
        console.log('worked after a test finish');
    },
    app: app,
    syncEnd: false
})