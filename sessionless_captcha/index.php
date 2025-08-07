<?php

   include("shared.php"); 
   include("captcha_code.php"); 
   
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
			$captcha = new CaptchaCode();
			$code = str_encrypt($captcha->generateCode(6));
			
?>
			
				<form name="my_form" action="content.php" method="post">
				<table border="0" cellpadding="4" cellspacing="0">
				<tr><td valign="top" align="left">Security Code:</td>
                    <td valign="top" align="left"><img src="captcha_images.php?width=120&height=40&code=<?php echo $code?>" /></td>
               	</tr>
				<tr><td valign="top" align="left">Please Type:</td>
                    <td valign="top" align="left"><input id="security_code" name="security_code" style="width:120px" type="text" /></td>
               	</tr>

				<tr><td valign="top" align="left">
                	</td>
                    <td valign="top" align="left">
                    						<input border="0" type="submit" value="Submit"> 	
                	</td>
               	</tr>
                
				</table>
                
					<input type="hidden" name="security_check" value="<?php echo $code?>">
	
				</form>
                
                

</body>
</html>
                
                

