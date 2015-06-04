<div class='spark-request'>
	<h6 class='spark-request__label'>Оставить заявку на подключение</h6>
	<input type='text' class='spark-request__input spark-request__name' placeholder='<?=$params->get("name-label");?>' />
	<input type='text' class='spark-request__input spark-request__phone' placeholder='<?=$params->get("phone-label");?>' />
	<input type='text' class='spark-request__input spark-request__address' placeholder='<?=$params->get("address-label");?>' />
	<input type='button' class='spark-request__input spark-request__send-button' value='<?=$params->get("submit-label");?>' />
	<p class='spark-request__local-message'></p>
	<div class='spark-request__message-container'>
		<div class='spark-request__message'>
			<p class='spark-request__text'>text</p>
		</div>
	</div>
	<script type='text/javascript'>
		var success_message = '<?=$params->get("success-message");?>';
		var error_message = '<?=$params->get("error-message");?>';
		var phone_message = '<?=$params->get("phone-message");?>';
	</script>
</div>