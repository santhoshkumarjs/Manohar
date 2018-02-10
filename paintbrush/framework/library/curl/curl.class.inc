<?php
class CurlLibrary {
	function doRequest($method, $url, $vars, $isXml=false) {
	    $ch = curl_init();
	    curl_setopt($ch, CURLOPT_URL, $url);
	    curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
	    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
	    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT,10);
	    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	    if ($method == 'POST') {
	        curl_setopt($ch, CURLOPT_POST, 1);
	        if($isXml === true) {
	        	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: text/xml'));
	        }
	        
	        curl_setopt($ch, CURLOPT_POSTFIELDS, $vars);
	    }
	    $data = curl_exec($ch);
	    
	    if ($data) {
	       console(LOG_LEVEL_INFO,'Request URL : '.$url.' | Request data : '.$vars.' | Response  '.$data);
	       curl_close($ch);
	       return $data;
	    } else {
	    	console(LOG_LEVEL_ERROR,'Request URL : '.$url.' | Request data : '.$vars.' | Unable to Fetch url. Error code is '.curl_errno($ch).' |  Error is  '.curl_error($ch));
	    	curl_close($ch);
	        return false;
	    }
	}
	
	function get($url) {
		//console(LOG_LEVEL_INFO,'URL get '.$url);
	   return $this->doRequest('GET', $url, 'NULL');
	}
	
	function post($url, $vars,$isXml = true) {
		//console(LOG_LEVEL_INFO,'URL post '.$url.$vars);
	    return $this->doRequest('POST', $url, $vars, $isXml);
	}
}
?>
