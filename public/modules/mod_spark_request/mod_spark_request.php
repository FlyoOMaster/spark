<?php
defined('_JEXEC') or die;

$doc = & JFactory::getDocument();
$doc->addScript(JURI::root(true) . "/modules/mod_spark_request/js/spark_request.js");

require JModuleHelper::getLayoutPath('mod_spark_request', $params->get('layout', 'default'));
?>