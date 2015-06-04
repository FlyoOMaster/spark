<?php
defined('_JEXEC') or die;

class modSparkCheckAddress {
	public static function getCitys() {
		$base = json_decode(file_get_contents(__DIR__ . DIRECTORY_SEPARATOR . "base.json"));
		$citys = array();
		foreach ($base as $city=>&$streets) {
			$citys[] = $city;
		}
		return $citys;
	}
	
	public static function getStreets($city = "") {
		$base = json_decode(file_get_contents(__DIR__ . DIRECTORY_SEPARATOR . "base.json"));
		$streets = array();
		if (array_key_exists($city, $base)) {
			foreach ($base->$city as $street=>&$houses) {
				$streets[] = $street;
			}
		}
		return $streets;
	}
	
	public static function getHouses($city = '', $street = '') {
		$base = json_decode(file_get_contents(__DIR__ . DIRECTORY_SEPARATOR . "base.json"));
		$houses = array();
		if (array_key_exists($city, $base)) {
			if (array_key_exists($street, $base->$city)) {
				$houses = $base->$city->$street;
			}
		}
		return $houses;
	}
}
?>