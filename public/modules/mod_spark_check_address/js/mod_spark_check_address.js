jQuery(document).ready(function(){
	var ph_city = 'Город';
	var ph_street = 'Улица';
	var ph_house = 'Дом';
	
	jQuery('.spark-check-address__city').select2({
		placeholder: ph_city,
		allowClear: true
	});
	jQuery('.spark-check-address__street').select2({
		placeholder: ph_street,
		allowClear: true
	});
	jQuery('.spark-check-address__house').select2({
		placeholder: ph_house,
		allowClear: true
	});
	
	jQuery('.spark-check-address__link').click(function(){
		jQuery('.spark-check-address').css('display', 'block');
		jQuery('.spark-check-address__city').val(null).trigger('change').prop('disabled', false);
		jQuery('.spark-check-address__street').val(null).trigger('change').prop('disabled', true);
		jQuery('.spark-check-address__house').val(null).trigger('change').prop('disabled', true);
	});
	
	jQuery('.spark-check-address__request').click(function(){
		var address = '';
		if (jQuery('.spark-check-address__city').val() != null)
			address += jQuery('.spark-check-address__city').val();
		if (jQuery('.spark-check-address__street').val() != null) {
			if (address != '') address += ', ';
			address += jQuery('.spark-check-address__street').val();
		}
		if (jQuery('.spark-check-address__house').val() != null) {
			if (address != '') address += ', ';
			address += jQuery('.spark-check-address__house').val();
		}
		jQuery('.spark-request__address').val(address);
		jQuery('.spark-check-address').css('display', 'none');
		jQuery('.spark-request__address').focus();
	});
	
	jQuery('.spark-check-address__close').click(function(){
		jQuery('.spark-check-address').css('display', 'none');
	});
	
	jQuery('.spark-check-address__city').on('select2:select', function(){
		jQuery.post(
			'/modules/mod_spark_check_address/ajax.php',
			{
				action: 'getStreets',
				city: jQuery('.spark-check-address__city').val()
			},
			function(data){
				jQuery('.spark-check-address__street').select2("destroy");
				jQuery('.spark-check-address__street').html(data).select2({
					placeholder: ph_street,
					allowClear: true
				}).val(null).trigger('change').prop('disabled', false);
				
				jQuery('.spark-check-address__house').val(null).trigger('change').prop('disabled', true);
			},
			'html'
		);
	});
	
	jQuery('.spark-check-address__street').on('select2:select', function(){
		console.log(jQuery('.spark-check-address__city').val());
		console.log(jQuery('.spark-check-address__street').val());
		jQuery.post(
			'/modules/mod_spark_check_address/ajax.php',
			{
				action: 'getHouses',
				city: jQuery('.spark-check-address__city').val(),
				street: jQuery('.spark-check-address__street').val()
			},
			function(data){
				console.log(data);
				jQuery('.spark-check-address__house').select2("destroy");
				jQuery('.spark-check-address__house').html(data).select2({
					placeholder: ph_house,
					allowClear: true
				}).val(null).trigger('change').prop('disabled', false);
			},
			'html'
		);
	});
	
	jQuery('.spark-check-address__city').on('select2:unselect', function(){
		jQuery('.spark-check-address__street').val(null).trigger('change').prop('disabled', true);
		jQuery('.spark-check-address__house').val(null).trigger('change').prop('disabled', true);
	});
	
	jQuery('.spark-check-address__street').on('select2:unselect', function(){
		jQuery('.spark-check-address__house').val(null).trigger('change').prop('disabled', true);
	});
});