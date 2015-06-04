<?php
defined('_JEXEC') or die;

class ModSparkRequest {
	public static function SendEmail($fromname, $frommail, $recipient, $subject, $name, $phone, $address) {
		if ($phone != '') {
			$mailer =& JFactory::getMailer();
			$mailer->setSender( array($frommail, $fromname) );
			$mailer->addRecipient($recipient);
			$mailer->setSubject($subject);
			$mailer->setBody(self::getBody($name, $phone, $address));
			$send = & $mailer->Send();
			if ($send === true) {
				return true;
			} else {
				return false;
			}
		}
		return false;
	}
	
	private static function getBody($name, $phone, $address) {
		$body = $_SERVER['REMOTE_ADDR'].":".$_SERVER['REMOTE_PORT']."\r\n";
		$body .= "Дата и время: ".date("d.m.Y H:i:s")."\r\n";
		$body .= "Имя: ".$name."\r\n";
		$body .= "Телефон: ".$phone."\r\n";
		$body .= "Адрес: ".$address;
		return $body;
	}
}
?>