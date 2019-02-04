## Instructions:

The current project is written on Protractor JS framework. To install it follow the next steps:

- download and setup Node JS using this [link](https://nodejs.org/en/)
- open command prompt (as admin) and type "npm install –g protractor", hit Enter.
- check the installed version by typing "protractor --version"
- execute "webdriver-manager update"

To run the current code:

    Precondition: the code should be downloaded and placed in the workspace directory

From cli:

- start the web driver manager: "webdriver-manager start"
- open a new command prompt under the project directory
- and execute "protractor conf.js" to run the configuration file

more information you can find [here](https://www.guru99.com/protractor-testing.html)

From idea:

- import project code from the path (or github link)
- create Protractor run configuration 
    - specify the Node.js interpreter to use
    - specify the location of the protractor package and the path to the conf.js configuration file
- select the 'Protractor run configuration' and run it.

detailed [tutorial](https://www.jetbrains.com/help/idea/protractor.html) for Intellij IDEA

*created by Eugene Hurikov*