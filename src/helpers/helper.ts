declare const allure: any
import { takeScreenshot } from './screenshot'

export const attachDataToReport = async function (title, params, screen = false) {
        const reporter = allure._allure
        reporter.startStep(title, Date.now())
        try {
            if (screen) {
                await takeScreenshot()
            }
            allure.createAttachment(`${title}`, JSON.stringify(params, null, '\t'), 'application/json')
            reporter.endStep('passed', Date.now())
        } catch (error) {
            reporter.endStep('broken', Date.now())
        }
    }
