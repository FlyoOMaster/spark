<?php
define("_JEXEC", 1);
define("JPATH_BASE", dirname(dirname(__DIR__)));
define("DS", DIRECTORY_SEPARATOR);

require_once(JPATH_BASE.DS."includes".DS."defines.php");
require_once(JPATH_BASE.DS."includes".DS."framework.php");
require_once __DIR__ . DIRECTORY_SEPARATOR .'helper.php';
use Joomla\Registry\Registry;

JFactory::getApplication("site")->initialise();

$module = &JModuleHelper::getModule('mod_spark_request');
$params = new Registry;
$params->loadString($module->params);

$name = JRequest::getVar('name', '');
$phone = JRequest::getVar('phone', '');
$address = JRequest::getVar('address', '');

$success = ModSparkRequest::SendEmail(
	$params->get('fromname'),
	$params->get('frommail'),
	$params->get('recipient'),
	$params->get('subject'),
	$name,
	$phone,
	$address
);
if ($success) echo "success";
?>