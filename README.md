## Test description:
Covered tests-cases, described in task doc.

## Steps description:
1. Clone the repository `git clone -b sergey-k git@github.com:SergeyKuryatnick/interview_test_task.git`
2. Switch to repository `cd interview_test_task/`
3. Install dependencies `npm i`

for linux:
4. Update webdriver 'npm run pree2e'
5. Run tests 'npm run e2e'

for windows
4. Install webdriver-manager globally 'npm install -g webdriver-manager'
5. Update webdriver 'webdriver-manager update'
6. Start webdriver `webdriver-manager start`
7. Install protractor globally 'npm install -g protractor'
8. Run tests 'protractor protractor.conf.js'