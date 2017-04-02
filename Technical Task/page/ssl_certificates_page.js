var ssl_certificates_page = function(){
	
	var certificateButton = $('.btn.btn-s.round.filled.user-btn.ng-binding');
	
	this.getCertificatesButtonText = function(){		
		return certificateButton.getAttribute("text");
	}
	
};
module.exports = new ssl_certificates_page();