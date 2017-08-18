
'use strict';

module.exports = function() {
  return actor({

      pageTitle(name){
          return `//h1[@class='page-title'][contains(.,'${name}')]`
      },

      seeOpenedPage(name){
          switch (name){
              case 'Authorization':
                  this.waitForVisible(this.pageTitle(name));
                  this.seeInCurrentUrl('/authorize');
                  break;
              case 'Profile':
                  this.waitForVisible(this.pageTitle(name));
                  this.seeInCurrentUrl('/profile');
                  break;
              default:
                  throw new Error('Page is invalid')
          }
      }
  });
};