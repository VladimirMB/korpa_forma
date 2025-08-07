<?php

   include("shared.php"); 
   
?>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Sessionless PHP Captcha - by Mythos and Rini</title>
</head>

<body>

<strong>Sessionless PHP Captcha Demo - by Mythos and Rini</strong>
<br><br>


<?php
		
   // captcha  
	if (isset($_POST["security_check"])) 
	{
		   $code = str_decrypt($_POST["security_check"]);			
		   if (!( $code == $_POST['security_code'] && !empty($code) ))
		   {
			   		// Not pass, display error
					?>
								
					<span style="color:red">	
					Error, the Security code does not match. Please <a href="index.php">try again</a>.	
					</span>
					
					<br>	
					
					<?php
		   }  
		   else 
		   { 
		   		    // Pass
		   			?>
		   	
					Thank you, you have pass the security check.
					<br>	
					<?php
				
		   } 			
				
	} 

	
?>


</body>
</html>
