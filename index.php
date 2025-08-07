<?php include 'layouts/products.php';?>
<?php include 'layouts/dodaci_tipovi.php';?>
<?php
	// captcha  
	include("sessionless_captcha/shared.php"); 
	include("sessionless_captcha/captcha_code.php"); 

	$captcha = new CaptchaCode();
	$code = str_encrypt($captcha->generateCode(6));
	//echo $code;
?>
<!DOCTYPE html>
<html lang="sr">
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>KORPA I FORMA</title>
<script type="text/javascript" src="js/jquery-1.7.1.min.js" ></script>
<script type="text/javascript" src="js/jquery.livequery.js"></script>
<script type="text/javascript" src="js/cart.js"></script>
<link href="css/css.css" rel="stylesheet" />
<link rel="stylesheet" href="css/style_cf.css" type="text/css" media="screen">
</head>

<body>

<div id="wrapper">

	<div id="content">

		<ul id='main_menu'>
			<?php
			foreach ($categories as $category) {
				if ($category['category_id'] == 1) {
					echo '<li><a class="active" href="#'.$category['category_id_name'].'">'.$category["category_name"].'</a></li>';
				} else {
					echo '<li><a href="#'.$category['category_id_name'].'">'.$category["category_name"].'</a></li>';
				}
			}
			?>
		</ul>
<?php
foreach ($categories as $category) {
	$build = '';
	foreach ($products as $product) {
		if ($category['category_id'] == $product['category_id']) {
			$dodaci_tip = 'dodaci_tip'.$product['dodatak_type'];
			$build = $build."
	<li data-categoryid='{$product['category_id']}' data-id='{$product['product_id']}' data-name='{$product['product_name']}' data-price='{$product['product_price']}' class='menu_item' >
		<div class='menu_item_image' style='background: url(products/{$product['product_id']}.jpg) center no-repeat; background-size: auto 140px;'></div>
		<div class='menu_item_title'>
			<a href='#' class='moredetails_opener name'>{$product['product_name']}</a>
			<span style='display:block;'>{$product['product_desc']}</span>
		</div>
		<div class='menu_item_price'>
			<div class='menu_item_price_text price'><span class='price'>{$product['product_price']}</span> RSD</div>
			<div class='menu_item_price_order'>
				<a href='#' class='moredetails_opener' title='Dodaj u korpu'></a>
			</div>	
		</div>	
		<div class='clear'></div>
		${$dodaci_tip}
	</li>
";
		}
	}
	echo "<ul data-Cid='{$category['category_id']}' id='{$category['category_id_name']}' class='product_content' >{$build}</ul>";
}
?>
		<div class="clear"></div>

	</div>
	
	<div id="korpa"> 
		<div class="korpa_title">
			<a href="#" class="korpaopen" title="Prikazi korpu">Korpa</a>
		</div>
		<form action="#" id="cart_form" name="cart_form">
			<div id='korpadata'>
				<div class="cart-info"></div>
				<div class="cart-total">
					Ukupno: <b><span>0</span> RSD</b>
					<input type="hidden" name="total-hidden-charges" id="total-hidden-charges" value="0" />
					<input type="hidden" name="numberOfProducts" id="numberOfProducts" value="0" />
					<input type="hidden" name="productsarray" id="productsarray" value="0" />
				</div>
				<div id='korpa_footer'>
					<!--<button type="submit" id="submit_cart" class='order_cart' >Naručite</button>-->
					<button id="submit_cart" class='order_cart' >Naručite</button>
				</div>
			</div>
			
			<div id="contact-user">
			<h2>Podaci za dostavu</h2>
			  <div class="success"></div>
				<div class="kolona1">
					<div>
						<div class="form-txt">Ime i Prezime:</div>
							<label class="name">
								<input type="text" name="order_name" id="order_name" />
							</label>
						<div class="clear"></div>
					</div>
					<div>
						<div class="form-txt">Telefon:</div>
							<label class="phone">
								<input type="tel" name="order_tel" id="order_tel">
							</label>
						<div class="clear"></div>
					</div>
					<div>
						<div class="form-txt">Email:</div>
						<label class="email">
						<input type="email" name="order_email" id="order_email" />
						</label>
						<div class="clear"></div>
					</div>
					<div>
						<div class="form-txt">Adresa za dostavu:</div>
							<label class="name">
								<input type="text" name="order_address" id="order_address" />
							</label>
						<div class="clear"></div>
					</div>
					<div>
						<div class="form-txt">Poruka:</div>
							<label class="message">
								<textarea name="order_message" id="order_message"></textarea>
							</label>
						<div class="clear"></div>
					</div>
					<div>
						<div class="form-txt">Kod:</div>
							<img src="sessionless_captcha/captcha_images.php?width=120&height=40&code=<?php echo $code?>" />
						<div class="form-txt">Upišite kod:</div>
							<input id="security_check" name="security_check" style="width:120px" type="text" />
							<input id="security_code" name="security_code" style="width:120px" type="hidden" value="<?php echo $code?>" />
						<div class="clear"></div>
					</div>
					<div class="as1">
						<input type="text" value="" max="25" size="25" maxlength="25" name="as1">
					</div>
				</div>
				<div class="clear"></div>
				<button type="submit" id="submit_order" class='order_cart' >Naručite</button>
			</div>
			
		</form>
	</div> 

</div>




</body>
</html>
