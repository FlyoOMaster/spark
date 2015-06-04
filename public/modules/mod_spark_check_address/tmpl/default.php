<div class='spark-check-address__link'>Проверить адрес</div>
<div class='spark-check-address'>
	<div class='spark-check-address__form'>
		<div class='spark-check-address__select-block'>
			<select class='spark-check-address__select spark-check-address__city'>
				<option></option>
				<?php foreach ($items as &$item) : ?>
					<option><?=$item;?></option>
				<?php endforeach; ?>
			</select>
		</div>
		<div class='spark-check-address__select-block'>
			<select class='spark-check-address__select spark-check-address__street'></select>
		</div>
		<div class='spark-check-address__select-block'>
			<select class='spark-check-address__select spark-check-address__house'></select>
		</div>
		<input type='button' class='spark-check-address__input spark-check-address__request'  value='Оставить заявку' />
		<input type='button' class='spark-check-address__input spark-check-address__close'  value='Закрыть' />
	</div>
</div>