$(document).ready(function(){
  $(".nav-tabs a[data-toggle=tab]").on("click", function(e) {
    if ($(this).hasClass("disabled")) {
      e.preventDefault();
      return false;
    }
  });
});

$(document).ready(function(){
  $('input[name="cat"]').click(function(e){
    if ($(this).is(':checked')){
      var filters = ["1","2","3","4","5","6","7"];
      var cat = $(this).val();
      if(jQuery.inArray(cat,filters) == -1){
        $('a[href="#fb"]').addClass('disabled');
        $('a[href="#featured"]').addClass('disabled');
      }else{
        $('a[href="#fb"]').removeClass('disabled');
        $('a[href="#featured"]').removeClass('disabled');
      }
      var token = $('input[name=_token]').val();
      $('.ajaxload').show();
      jQuery.ajax({
          url: '/stores/sort',
          type : "POST",
          dataType: 'json',
          data:{ _token:token, cat:cat },
          success: function(data) {
            $("#web").html('');
            $("#fb").html('');
            $("#featured").html('');

            $.each(data, function() {

              var custid = this['custid'];
              favs = this['favs'];

              $.each(this['web'], function(key, value) {
                var infospan = '<span class="info" style="background:none"></span>';
                if(value.info != null){
                  infospan = '<span class="info">'+value.info+'</span>';
                }
                var bookmark = '';
                if (custid == true) {
                    if (jQuery.inArray(value.id, favs) != -1){
                      bookmark = '<a href="#" class="myfavstore active" data-clubid="'+value.id+'"><i class="bookmark-icon"></i></a>';
                    }else{
                      bookmark = '<a href="#" class="myfavstore" data-clubid="'+value.id+'"><i class="bookmark-icon"></i></a>';
                    }
                }
                $("#web").append('<div class="col-sm-3"><div class="seller_box"><a href="'+value.url+'" target="_blank" title="'+value.name+'"><span class="brand_logo" style="background-image: url(\'uploads/stores/'+value.logo+'\');"></span></a>'+bookmark+infospan+'</div></div>');
              });

              $.each(this['fb'], function(key, value) {

                var infospan = '<span class="info" style="background:none"></span>';
                if(value.info != null){
                  infospan = '<span class="info">'+value.info+'</span>';
                }
                var bookmark = '';
                if (custid == true) {
                    if (jQuery.inArray(value.id, favs) != -1){
                      bookmark = '<a href="#" class="myfavstore active" data-clubid="'+value.id+'"><i class="bookmark-icon"></i></a>';
                    }else{
                      bookmark = '<a href="#" class="myfavstore" data-clubid="'+value.id+'"><i class="bookmark-icon"></i></a>';
                    }
                }

                $("#fb").append('<div class="col-sm-3"><div class="seller_box"><a href="'+value.url+'" target="_blank" title="'+value.name+'"><span class="brand_logo" style="background-image: url(\'uploads/stores/'+value.logo+'\');"></span></a>'+bookmark+infospan+'</div></div>');
              });

              $.each(this['feat'], function(key, value) {

                var infospan = '<span class="info" style="background:none"></span>';
                if(value.info != null){
                  infospan = '<span class="info">'+value.info+'</span>';
                }
                var bookmark = '';
                if (custid == true) {
                    if (jQuery.inArray(value.id, favs) != -1){
                      bookmark = '<a href="#" class="myfavstore active" data-clubid="'+value.id+'"><i class="bookmark-icon"></i></a>';
                    }else{
                      bookmark = '<a href="#" class="myfavstore" data-clubid="'+value.id+'"><i class="bookmark-icon"></i></a>';
                    }
                }

                $("#featured").append('<div class="col-sm-3"><div class="seller_box"><a href="'+value.url+'" target="_blank" title="'+value.name+'"><span class="brand_logo" style="background-image: url(\'uploads/stores/'+value.logo+'\');"></span></a>'+bookmark+infospan+'</div></div>');
              });

            });
            $("#web").append("<div class='clearfix'></div>");
            $("#fb").append("<div class='clearfix'></div>");
            $("#featured").append("<div class='clearfix'></div>");

            $('.ajaxload').hide();
          }
      });
    };
  });
});

$(document).on('click', ".myfavstore", function(e) {
  e.preventDefault();
  var divStore = $(this);
  var clubid = divStore.attr("data-clubid");
  var token = $('input[name=_token]').val();
  if ($(this).hasClass("active")){
    jQuery.ajax({
        url: '/store/favorite/remove',
        type : "POST",
        dataType: 'json',
        data:{ _token:token, clubid:clubid },
        success: function(data) {
          divStore.removeClass("active");
        }
    });
  }else{
    jQuery.ajax({
        url: '/store/favorite/add',
        type : "POST",
        dataType: 'json',
        data:{ _token:token, clubid:clubid },
        success: function(data) {
          divStore.addClass("active");
        }
    });
  }

  
});