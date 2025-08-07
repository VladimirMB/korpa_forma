<?php
	@$productsarray = strip_tags(trim($_POST['productsarray']));
	if (empty($productsarray)) {
		exit;
	}
	//$productsarray = "2,3,5";
	$single_products = explode(",", $productsarray);

	foreach ($single_products as $single_product) {
		//echo $single_product.'<br>';
		@${"itemname".$single_product} = strip_tags(trim($_POST["itemname{$single_product}"]));
		@${"numberofitems".$single_product} = strip_tags(trim($_POST["numberofitems{$single_product}"]));
		@${"baseprice".$single_product} = strip_tags(trim($_POST["baseprice{$single_product}"]));
		@${"dodaciprikaz".$single_product} = strip_tags(trim($_POST["dodaciprikaz{$single_product}"]));
		@${"totalitemprice".$single_product} = strip_tags(trim($_POST["totalitemprice{$single_product}"]));
		@${"ordernotice".$single_product} = strip_tags(trim($_POST["ordernotice{$single_product}"]));
	}
	
	$orders = '';
	foreach ($single_products as $single_product) {
		//echo $single_product.'<br>';
		$itemname = 'itemname'.$single_product;
		$numberofitems = 'numberofitems'.$single_product;
		$baseprice = 'baseprice'.$single_product;
		$dodaciprikaz = 'dodaciprikaz'.$single_product;
		$totalitemprice = 'totalitemprice'.$single_product;
		$ordernotice = 'ordernotice'.$single_product;
		$orders = $orders."
Naziv proizvoda: ${$itemname}

Količina: ${$numberofitems}

Cena: ${$baseprice}

Dodaci: ${$dodaciprikaz}

Cena sa dodacima: ${$totalitemprice}

Napomena za proizvod: ${$ordernotice}
		";
	}

	@$total_charges = strip_tags(trim($_POST['total-hidden-charges']));
	
    @$ime = strip_tags(trim($_POST['order_name']));
	@$email = strip_tags(trim($_POST['order_email']));
    @$poruka = strip_tags(trim($_POST['order_message']));
	@$telefon = strip_tags(trim($_POST['order_tel']));
	@$order_address = strip_tags(trim($_POST['order_address']));
    @$as1 = $_POST['as1'];
	//captcha
	@$captcha = $_POST["security_check"];
	@$code = $_POST["security_code"];

	function validateEmail($email) {
		return filter_var($email, FILTER_VALIDATE_EMAIL);
	}

	// captcha  
	include("sessionless_captcha/shared.php"); 
	include("sessionless_captcha/captcha_code.php"); 

	// captcha  
	if (isset($captcha)) {
		   $code = str_decrypt($code);
		   if (!( $captcha == $code && !empty($captcha) )) {
			   	// Not pass, display error
				//echo $captcha.' <br> '.$code;
				//$captcha = new CaptchaCode();
				//$code = str_encrypt($captcha->generateCode(6));
				//echo $code;
				$valid = 0;
		   } else {
				// Passed
				$valid = 1;
		   }
	} else {
		$valid = 0;
	}
	
	if (empty($as1) || $as1 == "") {
		if(empty($ime) || $ime == "" || empty($email) || $email == "" || empty($order_address) || $order_address == "" || $telefon == "") {
			$message = "<span style='color:red'>Molimo popunite sva obavezna polja.</span>";
			echo $message;
			return false;
		} else {
			$email = validateEmail($email);
			if (empty($email)) {
					$message = "<span style='color:red'>Morate uneti ispravnu email adresu.</span>";					
					echo $message;
					return false;
			} else {
				if (strlen($ime) < 2 || strlen($ime) > 70 || strlen($email) < 3 || strlen($email) > 70 || strlen($poruka) > 10000 || strlen($telefon) < 5 || strlen($telefon) > 80 || strlen($order_address) < 5 || strlen($order_address) > 100) {
					//$message = "<span style='color:red'>Poruka je predugačka ili prekratka.</span>";
					//echo $message;
					return false;
				} else if (!is_numeric($telefon)) {
					$message = "<span style='color:red'>Nije validan broj telefona.</span>";
					echo $message;
					return false;
				} else if (is_numeric($order_address)) {
					$message = "<span style='color:red'>Adresa za dostavu nije validna.</span>";
					echo $message;
					return false;
				} else if ($valid == 0) {
					$message = "<span style='color:red'>Molimo unesite ispravan captcha kod.</span>";
					echo $message;
					return false;
				} else {
					//poslati poruku
					$to = "vladimir.m.bogojevic@gmail.com";
					$subject = "Nova narudzbina";
					$message = "
Ime: {$ime}

Telefon: {$telefon}

Email: {$email}

Adresa za dostavu: {$order_address}

Poruka: {$poruka}

Narudzbina: {$orders}

Ukupna vrednost narudzbine: {$total_charges}
					";
					$from = "office@fastfoodsajt.com";
					$headers = "From: $from";
					@mail($to,$subject,$message,$headers);

					$message = "<span style='color:green'>Hvala Vam što ste nam ukazali poverenje.<br/>Vaša narudžbina je prosleđena.<br/>Bićete uskoro kontaktirani radi potvrde narudžbine.</span>";
					echo $message;
					return true;
				}
			}
		}
	} else {
		$message = "<span style='color:red'>Niste prošli bot test.</span>";
        echo $message;
		return false;
	}
?>