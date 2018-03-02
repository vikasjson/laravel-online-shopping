$(document).ready(function() {
	$("input:checkbox[name='allshipreq']").change(function(){
	  	if ($(this).is(':checked')) {
	  		$(".ajaxloader").show();
	  		var i = 0;
	  		var packids = [];
	      	var token = $('input[name="_token"]').val();

	      	$("input:checkbox[name='checkshipreq']").each(function() {
		      	$(this).prop('checked',true);
			  	packids[i++] = this.value;
			});
	      	if (packids.length !== 0) {
	      		jQuery.ajax({
	                url: '/shipping/request/calculation',
	                type : "POST",
	                data:{ _token:token, packids:packids},
	                success: function(data) {
	                	$("#shipcost .totalvalue").text(data.price.toFixed(2));
						$("#shipcost .totalweight").text(data.weight);
						$("#shipcost .totalcount").text(data.count);
						$("#shipcost .subtotal").text(data.subtotal.toFixed(2));
						$("#shipcost .discount").text(data.discount.toFixed(2));
						$("#shipcost .packlevel").text(data.level.toFixed(2));
						$("#shipcost .estimated").text(data.estimated.toFixed(2));
						$(".ajaxloader").hide();
						$('#create_rqst').prop("disabled", false);
	                }
	            });
	      	}
	  	}else{
	    	$('input:checkbox[name="checkshipreq"]').prop('checked', false);
		    $("#shipcost .totalvalue").text('0.00');
			$("#shipcost .totalweight").text('0.0');
			$("#shipcost .totalcount").text(0);
			$("#shipcost .subtotal").text('0.00');
			$("#shipcost .discount").text("0.00");
			$("#shipcost .packlevel").text('0.00');
			$("#shipcost .estimated").text('0.00');
			$('#create_rqst').prop("disabled", true);
	  	}
	});

	$("input:checkbox[name='checkshipreq']").change(function(){
  		$(".ajaxloader").show();
  		var i = 0;
  		var packids = [];
      	var token = $('input[name="_token"]').val();
      	$("input:checkbox[name='checkshipreq']").each(function() {
      		if (this.checked == true){ packids[i++] = this.value; }
		});

		if (packids.length !== 0) {
			jQuery.ajax({
	            url: '/shipping/request/calculation',
	            type : "POST",
	            data:{ _token:token, packids:packids},
	            success: function(data) {
	            	$("#shipcost .totalvalue").text(data.price.toFixed(2));
					$("#shipcost .totalweight").text(data.weight);
					$("#shipcost .totalcount").text(data.count);
					$("#shipcost .subtotal").text(data.subtotal.toFixed(2));
					$("#shipcost .discount").text(data.discount.toFixed(2));
					$("#shipcost .packlevel").text(data.level.toFixed(2));
					$("#shipcost .estimated").text(data.estimated.toFixed(2));
					$(".ajaxloader").hide();
					$('#create_rqst').prop("disabled", false);
	            }
	        });
		}else{
		    $("#shipcost .totalvalue").text('0.00');
			$("#shipcost .totalweight").text('0.0');
			$("#shipcost .totalcount").text(0);
			$("#shipcost .subtotal").text('0.00');
			$("#shipcost .discount").text("0.00");
			$("#shipcost .packlevel").text('0.00');
			$("#shipcost .estimated").text('0.00');
			$(".ajaxloader").hide();
			$('#create_rqst').prop("disabled", true);
		}
	});

	$("#create_rqst").click(function(e) {
		e.preventDefault();

		var i = 0;
  		var packids = [];
  		$("input:checkbox[name='checkshipreq']").each(function() {
      		if (this.checked == true){ packids[i++] = this.value; }
		});
      	var token = $('input[name="_token"]').val();

      	var repack =  $("input[name='repack']").is(':checked') ? 1 : 0;
      	var sticker =  $("input[name='sticker']").is(':checked') ? 1 : 0;
      	var extrapack =  $("input[name='extrapack']").is(':checked') ? 1 : 0;
      	var original =  $("input[name='original']").is(':checked') ? 1 : 0;
      	var consolid =  $("input[name='consolid']").is(':checked') ? 1 : 0;

      	var invoice_taxid = $("input[name='invoice_taxid']").val();
      	var invoice_personal =  $("input[name='invoice_personal']").is(':checked') ? 1 : 0;
      	var invoice_include =  $("input[name='invoice_include']").is(':checked') ? 1 : 0;

		$.redirect("/shipping/request/create",{
			_token: token,
			packids: packids,
			repack: repack,
			sticker: sticker,
			extrapack: extrapack,
			original: original,
			consolid: consolid,
			invoice_taxid: invoice_taxid,
			invoice_personal: invoice_personal,
			invoice_include: invoice_include
		}); 
	});
});