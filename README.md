1. SETTINGS
Folder “test” move to C:/ 
Set decimal separator “.” (for win7 - Control Panel -> Clock, Language, and Region -> Region and Language -> Additional settings… -> Decimal symbol)
Install Visual Studio (also you can execute with .NET framework 4.6 + MSTest + Jenkins)

2. EXECUTION for Visual Studio
Open folder “ssls”
Double click “ssls.sln”-> Solution will open in Visual Studio
In main menu choose “Build-> Rebuild solution” -> Project will rebuild
In main menu choose “Test-> Window-> Test Explorer”-> “test explorer” panel will open
In test explorer panel choose “0_mainlist”-> click right mouse button -> In context menu choose “Run Selected Tests”
Enjoy

3. NOTES
3.1. Some tests execute only one time:
Open Home page
Open Authorization page
After click on "eye" icon for password field, password should be displayed

3.2. About folder “test”
test -> result -> ssls -> There are folders which are created each time the project is launched with a log file and screenshots of errors.
test -> settings -> configuration -> ssls -> There are configuration files
test -> settings -> drivers -> There are drivers and additional libraries.