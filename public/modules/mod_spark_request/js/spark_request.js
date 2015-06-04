jQuery(document).ready(function(){
	jQuery('.spark-request__send-button').click(onSendRequest);
});

function onSendRequest(){
	var req_name = jQuery('.spark-request__name').val();
	var req_phone = jQuery('.spark-request__phone').val();
	var req_address = jQuery('.spark-request__address').val();

	if (req_phone != '') {
		jQuery('.spark-request__phone').removeClass('spark-request__input-attention');
		jQuery.post(
			'/modules/mod_spark_request/ajax.php',
			{
				name: req_name,
				phone: req_phone,
				address: req_address
			},
			function(data){
				if (data == 'success') {
					jQuery('.spark-request__name').val('');
					jQuery('.spark-request__phone').val('');
					jQuery('.spark-request__address').val('');
					ShowMessage(success_message);
				} else {
					ShowMessage(error_message);
				}
			},
			'text'
		);
	} else {
		ShowMessage(phone_message);
		jQuery('.spark-request__phone').focus();
		jQuery('.spark-request__phone').addClass('spark-request__input-attention');
	}
}

function ShowMessage(mes) {
	jQuery('.spark-request__text').html(mes);
	jQuery('.spark-request__local-message').html(mes).css('display', 'block');
	jQuery('.spark-request__message-container').css('display', 'block');
	setTimeout(function(){ jQuery('.spark-request__message-container').css('display', 'none'); }, 3000);
}