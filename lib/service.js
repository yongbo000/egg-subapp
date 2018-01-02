'use strict';

const path = require('path');

module.exports = app => {
  const dirs = Array.from(app.subApps.values()).map(subApp => {
    return path.join(subApp.baseDir, 'service');
  });
  app.loader.loadToContext(dirs, 'subAppService', {
    call: true,
    caseStyle: 'lower',
    fieldClass: 'subServiceClasses',
  });
};
