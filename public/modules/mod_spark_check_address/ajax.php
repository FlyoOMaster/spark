<?php
define("_JEXEC", 1);
define("JPATH_BASE", dirname(dirname(__DIR__)));
define("DS", DIRECTORY_SEPARATOR);

require_once(JPATH_BASE.DS."includes".DS."defines.php");
require_once(JPATH_BASE.DS."includes".DS."framework.php");
require_once __DIR__ . DIRECTORY_SEPARATOR .'helper.php';

JFactory::getApplication("site")->initialise();

$action = JRequest::getVar("action", "");
if ($action == "getStreets") {
	$city = JRequest::getVar("city", "");
	$items = modSparkCheckAddress::getStreets($city);
	foreach ($items as &$item)
		echo "<option>" . $item . "</option>";
} else if ($action == "getHouses") {
	$city = JRequest::getVar("city", "");
	$street = JRequest::getVar("street", "");
	$items = modSparkCheckAddress::getHouses($city, $street);
	foreach ($items as &$item)
		echo "<option>" . $item . "</option>";
}
?>