declare const allure: any
import { takeScreenshot } from './screenshot'

export const step = function (msg: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const method = descriptor.value
        const reporter = allure._allure
        descriptor.value = async function (...args) {
            let result
            const objectArgs = args.filter((arg) => typeof arg === 'object')
            const notObjects = args.filter((arg) => typeof arg !== 'object')
            const params = notObjects.map((arg) => {
                if (arg != null) {
                    return JSON.stringify(arg)
                }
            }).join()
            const stepName = params.length ? `${msg}(${params})` : msg
            reporter.startStep(stepName, Date.now())
            objectArgs.forEach((arg, index) => {
                const param = JSON.stringify(arg, null, '\t')
                if (param !== 'null') {
                    allure.createAttachment(`arg${index}`, param, 'application/json')
                }
            })
            try {
                result = await method.apply(this, args)
                reporter.endStep('passed', Date.now())
                return result
            } catch (e) {
                await takeScreenshot('Error')
                if (e.toString().includes('AssertionError')) {
                    reporter.endStep('failed', Date.now())
                } else {
                    reporter.endStep('broken', Date.now())
                }
                throw e
            }
        }
        return descriptor
    }
}
