<?php
defined('_JEXEC') or die;

require_once __DIR__ . DIRECTORY_SEPARATOR .'helper.php';

$doc = & JFactory::getDocument();
$doc->addStyleSheet(JURI::root(true) . "/modules/mod_spark_check_address/css/select2.min.css");
$doc->addScript(JURI::root(true) . "/modules/mod_spark_check_address/js/select2.min.js");
$doc->addScript(JURI::root(true) . "/modules/mod_spark_check_address/js/mod_spark_check_address.js");

$items = modSparkCheckAddress::getCitys();

require JModuleHelper::getLayoutPath('mod_spark_check_address', $params->get('layout', 'default'));
?>