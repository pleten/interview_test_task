var Constants = {
    VALID_LOGIN : "ssls.automation+4@gmail.com",
    NOT_REGISTERED_USER_LOGIN : "ssls.automation+1234@gmail.com",
    INVALID_LOGIN : "eg. test@@test.com",
    VALID_PASSWORD : "123456",
    NOT_REGISTERED_USER_MESSAGE_TEXT : "Uh oh! Email or password is incorrect",
    INVALID_EMAIL_MESSAGE_TEXT : "Uh oh! This\nisn’t an email",
    NO_EMAIL_TEXT : "Oops, please\nenter your email",
    NO_PASSWORD_TEXT : "Looks like you’ve\nmissed this one",
    USERNAME : "Vasya Pupkin",
    PHONE : "+380 57123456789",
    ADDRESS : "Diagon alley 2, Misto, Uryupinsk 612120, Ukraine",
    NEWSLETTER : "Include in mailing list",
    CHEAPEST_FEATURED_DEFAULT_TEXT : "CHEAPEST"

};

var Timeout = {
	SHORTEST_WAIT_MILLI : 500,
	SHORT_WAIT_MILI : 1000,
	MEDIUM_WAIT_MILI : 1500,
	LONG_WAIT_MILI : 2000,
	LONGER_WAIT_MILI : 3000,
	LONGEST_WAIT_MILI : 5000,
	EXTRA_LONG_WAIT_MILI : 10000,
	MAX_WAIT_MILI : 20000,
	MAXIMUM_WIT_MILI : 60000,
	MAX_ELEMENT_WAIT_TIME_MILI: 15000,
	MAX_ELEMENT_WAIT_TIME_SECS : 15
};

module.exports = {Constants,Timeout}