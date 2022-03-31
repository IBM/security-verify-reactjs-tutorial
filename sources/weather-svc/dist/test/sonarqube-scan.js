"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sonarqubeScanner = (0, tslib_1.__importStar)(require("sonarqube-scanner"));
const serverUrl = process.env.SONARQUBE_URL;
function sonarScanner() {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!serverUrl) {
            console.log('SonarQube url not set. Nothing to do...');
            return;
        }
        sonarqubeScanner({
            serverUrl,
            options: {
                'sonar.login': process.env.SONARQUBE_USER,
                'sonar.password': process.env.SONARQUBE_PASSWORD,
                'sonar.sources': 'src',
                'sonar.coverage.exclusions': 'src/logger/*',
                'sonar.tests': 'test',
                'sonar.language': 'ts',
                'sonar.typescript.lcov.reportPaths': 'coverage/lcov.info',
                'sonar.testExecutionReportPaths': 'test-report.xml',
                'sonar.sourceEncoding': 'UTF-8',
            }
        }, result => {
            console.log('Sonarqube scanner result:', result);
        });
    });
}
sonarScanner()
    .catch(err => {
    console.error('Error during sonar scan', err);
    process.exit(1);
});
