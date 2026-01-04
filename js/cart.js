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
		var $this = $(this);
		var moreDetailsDiv = $this.parents('.menu_item').find('.more_details');

		if (moreDetailsDiv.is(':visible')) {
			moreDetailsDiv.slideUp(500);
		} else {
			$('.more_details').not(moreDetailsDiv).slideUp(500);

			moreDetailsDiv.slideDown(500);
		}

		return false;
	});

	$('a.korpaopen').click(function(){
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

	$('.add_to_cart').click(function(){
		var thisID = $(this).parents('.menu_item').attr("data-id");

		var itemname = $(this).parents('.menu_item').attr("data-name");

		var itemprice = $(this).parents('.menu_item').attr("data-price");
		var baseprice = itemprice;

		var numberOfItems = $(this).parents('.menu_item').find('#number_items').val();

		var ordernotice = $(this).parents('.menu_item').find('.ordernotice').val();

		var blok = $(this).parents('.menu_item').html();
		var dodaciPrikaz = '';

		$('.dodaci', blok).each(function(index) {

		var itemNumber = index+1;
			if ($('.dodatak'+itemNumber).is(':checked')) {

				var dodatakname = $(blok).find('.dodatak'+itemNumber).attr('data-dodatakname');
				var dodatakprice = $(blok).find('.dodatak'+itemNumber).attr('data-dodatakprice');

				itemprice = parseInt(itemprice) + parseInt(dodatakprice);

				dodaciPrikaz = dodaciPrikaz +dodatakname+' (+'+dodatakprice+' RSD) x '+numberOfItems+', ';

				$('.dodatak'+itemNumber).attr('checked', false);

			}
		});

		dodaciPrikaz = dodaciPrikaz.substr(0, dodaciPrikaz.length - 2);

		var totalitemprice = parseInt(numberOfItems) * parseInt(itemprice);

		if (dodaciPrikaz == '') {
			var dodaciprikazDisplay = '';
		} else {
			var dodaciprikazDisplay = '<div class="dodaciprikaz">'+ dodaciPrikaz +'</div>';
		}

		if (ordernotice == '') {
			var ordernoticeDisplay = '';
		} else {
			var ordernoticeDisplay = '<div class="ordernoticecart hide">'+ ordernotice +'</div>';
		}

		if(include(Arrays,thisID)) {

		}
		else {
			uniqueidentifier++;

			var prev_charges = $('.cart-total span').html();
			prev_charges = parseInt(prev_charges) + parseInt(totalitemprice);

			$('.cart-total span').html(prev_charges);
			$('#total-hidden-charges').val(prev_charges);

			$('#numberOfProducts').val(uniqueidentifier);

			var HiddenInputs = '<input type="hidden" name="itemname'+uniqueidentifier+'" class="hiddens" value="'+itemname+'" /><input type="hidden" name="numberofitems'+uniqueidentifier+'" class="hiddens" value="'+numberOfItems+'" /><input type="hidden" name="baseprice'+uniqueidentifier+'" class="hiddens" value="'+baseprice+'" /><input type="hidden" name="dodaciprikaz'+uniqueidentifier+'" class="hiddens" value="'+dodaciPrikaz+'" /><input type="hidden" name="totalitemprice'+uniqueidentifier+'" class="hiddens" value="'+totalitemprice+'" /><input type="hidden" name="ordernotice'+uniqueidentifier+'" class="hiddens" value="'+ordernotice+'" />';

			$('#korpa .cart-info').append('<div class="shopp" id="each-'+uniqueidentifier+'"><div class="remove"></div><div class="label">'+itemname+' <span> x '+numberOfItems+'</span></div><div class="shopp-price-base"> Cena: <em>'+baseprice+' RSD</em><span> x '+numberOfItems+'</span></div>'+dodaciprikazDisplay+'<div class="shopp-price">Cena sa dodacima: <em>'+totalitemprice+' RSD</em></div>'+ordernoticeDisplay+' '+HiddenInputs+'</div>');

			var skup = '';
			$('.shopp').each(function(index){
				var uniques = $(this).attr('id').replace('each-','');
				skup = skup + uniques +',';
			});
			skup = skup.substr(0, skup.length - 1);
			$('#productsarray').val(skup);
		}
	});	

	$('.remove').livequery('click', function() {

		var deduct = $(this).parent().children(".shopp-price").find('em').html();
		var prev_charges = $('.cart-total span').html();

		var uniqueidentifier = $(this).parent().attr('id').replace('each-','');

		prev_charges = parseInt(prev_charges)-parseInt(deduct);
		$('.cart-total span').html(prev_charges);
		$('#total-hidden-charges').val(prev_charges);

		$(this).parent().remove();

		var skup = '';
		$('.shopp').each(function(index){
			var uniques = $(this).attr('id').replace('each-','');
			skup = skup + uniques +',';
		});
		skup = skup.substr(0, skup.length - 1);
		$('#productsarray').val(skup);

	});

	$('#submit_cart').click(function(event){
		event.preventDefault();
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
	$('#sendvici').hide();
	$('#palacinke').hide();
	$('#pica').hide();
	$('#sladoled').hide();
}

function newmenuset () {
	$('ul#main_menu li a').click(function(event){
		event.preventDefault();
		var Link = this;
		var Nastavak = $(this).attr('href');
		var Vrednost = $(this).text();
		var Objekat = $(this).html();

		$('ul#main_menu li a').each(function(index) {
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