//var numofProducts = 0;
var uniqueidentifier = 0;

$(document).ready(function() {
	initmainmenu ();
	newmenuset ();

	$('#submit_order').click(function(){
		$.post("send_order.php", $("#cart_form").serialize(),  function(response) {
				$('.success').fadeIn(300, function() {
					$('.success').html(response);
					$(".success").delay(3200).fadeOut(300);
				});
			});
		return false;
	});
	
	$('#contact-user').hide();
	$('#contact-user').css('left','250px');
	
	$('a.moredetails_opener').click(function(){
		//var $this = $(this);
		//var parentDiv = $(this).parents('.menu_item').html();
		//var moreDetailsDiv = $(this).parents('.menu_item').find('.more_details').html();
		var moreDetailsDiv = $(this).parents('.menu_item').find('.more_details');
		if (moreDetailsDiv.is(':visible')) {
		moreDetailsDiv.slideUp(500);
		} else {
			moreDetailsDiv.hide();
			moreDetailsDiv.slideDown(500);
		}
		return false;
	});
	
	$('a.korpaopen').click(function(){
		//var $this = $(this);
		//var parentDiv = $(this).parents('.menu_item').html();
		//var moreDetailsDiv = $(this).parents('.menu_item').find('.more_details').html();
		var korpaFormDiv = $(this).parents('#korpa').find('#cart_form');
		if (korpaFormDiv.is(':visible')) {
		korpaFormDiv.slideUp(300);
		} else {
			korpaFormDiv.hide();
			korpaFormDiv.slideDown(300);
		}
		return false;
	});
	
	
	
	var Arrays=new Array();
	var CountItems=new Array();
	//var UniqueIdentifiers=new Array();

	$('.add_to_cart').click(function(){
	//alert(1);
		
		//var thisID = $(this).attr('id');
		//var thisID = $(this).data('id');
		//var thisID = $(this).attr("data-id");
		var thisID = $(this).parents('.menu_item').attr("data-id");
		//alert(thisID);
		
		//var itemname  = $(this).find('div .name').html();
		//var itemname  = $(this).attr("data-name");
		var itemname = $(this).parents('.menu_item').attr("data-name");
		//alert(itemname);
		//var itemprice = $(this).find('div .price').html();
		//var itemprice = $(this).attr("data-price");
		var itemprice = $(this).parents('.menu_item').attr("data-price");
		var baseprice = itemprice;
		//alert(itemprice);
		//var numberOfItems = $("#number_items").val();
		var numberOfItems = $(this).parents('.menu_item').find('#number_items').val();
		//alert(numberOfItems);
		var ordernotice = $(this).parents('.menu_item').find('.ordernotice').val();

		//alert(thisID);
		//var mdid = $(this).parents('.menu_item').find('.more_details').attr("data-mdid");
		//alert(mdid);
		
		//alert($(this).html());
		var blok = $(this).parents('.menu_item').html();
		var dodaciPrikaz = '';
		//alert(blok);
		
		$('.dodaci', blok).each(function(index) {
		//alert($(this).html());
		//alert($(this).find('input').is(':checked'));
		
		//$('.dodaci').each(function(index){
		var itemNumber = index+1;
		//alert(itemNumber);
			if ($('.dodatak'+itemNumber).is(':checked')) {
			//if ($(blok).find('.dodatak'+itemNumber).is(':checked')) {
				//alert('yes');
				//alert($(this).html());
				//alert($(blok).find('.dodatak'+itemNumber).attr('data-dodatakname'));
				
				//var dodatakname = $('.dodatak'+itemNumber).attr('data-dodatakname');
				//var dodatakprice = $('.dodatak'+itemNumber).attr('data-dodatakprice');
				var dodatakname = $(blok).find('.dodatak'+itemNumber).attr('data-dodatakname');
				var dodatakprice = $(blok).find('.dodatak'+itemNumber).attr('data-dodatakprice');
				
				itemprice = parseInt(itemprice) + parseInt(dodatakprice);
				
				//dodaciPrikaz = dodaciPrikaz +'<span class="dodatakname">'+dodatakname+'</span><span class="dodatakprice">(+'+dodatakprice+' RSD) x '+numberOfItems+', </span>';
				dodaciPrikaz = dodaciPrikaz +dodatakname+' (+'+dodatakprice+' RSD) x '+numberOfItems+', ';
				
				//alert(dodatakname);
				//alert(dodatakprice);
				//alert($(blok).find('.dodatak'+itemNumber).val());
				$('.dodatak'+itemNumber).attr('checked', false);
				//$(this).attr('checked', false);
				//$(blok).find('.dodatak'+itemNumber).attr('checked', false);
				
				
			}
		});
		
		dodaciPrikaz = dodaciPrikaz.substr(0, dodaciPrikaz.length - 2);
		  
		var totalitemprice = parseInt(numberOfItems) * parseInt(itemprice);
		//alert(totalitemprice);
  
		if (dodaciPrikaz == '') {
			var dodaciprikazDisplay = '';
		} else {
			var dodaciprikazDisplay = '<div class="dodaciprikaz">'+ dodaciPrikaz +'</div>';
		}
		//alert(dodaciPrikaz);
		if (ordernotice == '') {
			var ordernoticeDisplay = '';
		} else {
			var ordernoticeDisplay = '<div class="ordernoticecart hide">'+ ordernotice +'</div>';
		}
		//alert(ordernotice);
			
		if(include(Arrays,thisID)) {
			/*
			var price 	 = $('#each-'+thisID).children(".shopp-price").find('em').html();
			var quantity = $('#each-'+thisID).children(".shopp-quantity").html();
			quantity = parseInt(quantity)+parseInt(1);
			
			var total = parseInt(itemprice)*parseInt(quantity);
			
			$('#each-'+thisID).children(".shopp-price").find('em').html(total);
			$('#each-'+thisID).children(".shopp-quantity").html(quantity);
			
			var prev_charges = $('.cart-total span').html();
			prev_charges = parseInt(prev_charges)-parseInt(price);
			
			prev_charges = parseInt(prev_charges)+parseInt(total);
			$('.cart-total span').html(prev_charges);
			
			$('#total-hidden-charges').val(prev_charges);
			*/
		}
		else {
			//Arrays.push(thisID);
			/*
			CountItems.push(thisID);
			console.log(CountItems);
			console.log(CountItems.length);
			numofProducts = CountItems.length;
			alert(numofProducts);
			*/
			uniqueidentifier++;
			
			
			var prev_charges = $('.cart-total span').html();
			//prev_charges = parseInt(prev_charges)+parseInt(itemprice);
			prev_charges = parseInt(prev_charges) + parseInt(totalitemprice);
			
			
			$('.cart-total span').html(prev_charges);
			$('#total-hidden-charges').val(prev_charges);
			
			$('#numberOfProducts').val(uniqueidentifier);
			
			var HiddenInputs = '<input type="hidden" name="itemname'+uniqueidentifier+'" class="hiddens" value="'+itemname+'" /><input type="hidden" name="numberofitems'+uniqueidentifier+'" class="hiddens" value="'+numberOfItems+'" /><input type="hidden" name="baseprice'+uniqueidentifier+'" class="hiddens" value="'+baseprice+'" /><input type="hidden" name="dodaciprikaz'+uniqueidentifier+'" class="hiddens" value="'+dodaciPrikaz+'" /><input type="hidden" name="totalitemprice'+uniqueidentifier+'" class="hiddens" value="'+totalitemprice+'" /><input type="hidden" name="ordernotice'+uniqueidentifier+'" class="hiddens" value="'+ordernotice+'" />';
			
			//$('#korpa .cart-info').append('<div class="shopp" id="each-'+thisID+'"><div class="label">'+itemname+'</div><div class="shopp-price"> $<em>'+itemprice+'</em></div><span class="shopp-quantity">1</span><img src="images/remove.png" class="remove" /><br class="all" /></div>');
			
			//$('#korpa .cart-info').append('<div class="shopp" id="each-'+uniqueidentifier+'"><div class="remove"></div><div class="label">'+itemname+' <span> x '+numberOfItems+'</span></div><div class="shopp-price-base"> Cena: <em>'+baseprice+' RSD</em><span> x '+numberOfItems+'</span></div>'+dodaciprikazDisplay+'<div class="shopp-price">Cena sa dodacima: <em>'+totalitemprice+' RSD</em></div>'+ordernoticeDisplay+'</div>');
			$('#korpa .cart-info').append('<div class="shopp" id="each-'+uniqueidentifier+'"><div class="remove"></div><div class="label">'+itemname+' <span> x '+numberOfItems+'</span></div><div class="shopp-price-base"> Cena: <em>'+baseprice+' RSD</em><span> x '+numberOfItems+'</span></div>'+dodaciprikazDisplay+'<div class="shopp-price">Cena sa dodacima: <em>'+totalitemprice+' RSD</em></div>'+ordernoticeDisplay+' '+HiddenInputs+'</div>');
		
			var skup = '';
			$('.shopp').each(function(index){
				var uniques = $(this).attr('id').replace('each-','');
				skup = skup + uniques +',';
			});
			skup = skup.substr(0, skup.length - 1);
			$('#productsarray').val(skup);
		}

		//alert(Arrays);
		
	});	
	
	
	$('.remove').livequery('click', function() {
		
		var deduct = $(this).parent().children(".shopp-price").find('em').html();
		var prev_charges = $('.cart-total span').html();
		
		//var thisID = $(this).parent().attr('id').replace('each-','');
		var uniqueidentifier = $(this).parent().attr('id').replace('each-','');
		
		prev_charges = parseInt(prev_charges)-parseInt(deduct);
		$('.cart-total span').html(prev_charges);
		$('#total-hidden-charges').val(prev_charges);
		
		//$('#number-of-Products').val(uniqueidentifier);
			
		$(this).parent().remove();
		
		var skup = '';
		$('.shopp').each(function(index){
			var uniques = $(this).attr('id').replace('each-','');
			skup = skup + uniques +',';
		});
		skup = skup.substr(0, skup.length - 1);
		$('#productsarray').val(skup);

		//alert(uniqueidentifier);
		
	});	
	
	/*
	$('#submit_cart').livequery('click', function() {
		//alert(1);
		//var totalCharge = $('#total-hidden-charges').val();
		//$('#korpa').html('Ukupna cena: <b>'+totalCharge+' RSD</b>');
		//return false;
		$("#korpadata").animate({left:'250px'});
		$("#contact-user").animate({left:'-250px'});
	});	
	*/
	
	$('#submit_cart').click(function(event){
		event.preventDefault();
		//alert(this);
		//$("#korpadata").animate({left:'250px'});
		$("#korpadata").hide();
		$('#contact-user').show();
		$("#contact-user").animate({left:'0px'});
	});
	
});

function include(arr, obj) {
  for(var i=0; i<arr.length; i++) {
    if (arr[i] == obj) return true;
  }
}

function initmainmenu () {
	//alert(1);
	$('#sendvici').hide();
	$('#palacinke').hide();
	$('#pica').hide();
	$('#sladoled').hide();
}
function newmenuset () {

	$('ul#main_menu li a').click(function(event){
		event.preventDefault();
		//alert(this);
		var Link = this;
		var Nastavak = $(this).attr('href');
		var Vrednost = $(this).text();
		var Objekat = $(this).html();
		//alert(objekat);

		$('ul#main_menu li a').each(function(index) {
			//alert(this);
			var vrednost = $(this).text();
			var nastavak = $(this).attr('href');
			
			if (vrednost != Vrednost) {
				$(this).removeClass('active');
				$(nastavak).hide();
			} else {
				$(this).addClass('active');
				$(nastavak).show();
			}

		});
	});
}