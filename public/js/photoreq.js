$(document).ready(function(){

    $(function () {
        $('.popup-modal').magnificPopup({
            type: 'inline',
            preloader: false,
            modal: true
        });
        $(document).on('click', '.popup-modal-dismiss', function(e){
            e.preventDefault();
            $.magnificPopup.close();
        });
    });

    $(document).on('click', '.photo_nxt', function (e) {
        e.preventDefault();
        var data_type = $(this).attr('data-type');
        var packid = $(this).attr('data-pack');
        if (data_type == "basic"){
            $("#initiate_photo_"+packid).addClass("noshow");
            $("#basic_confirm_"+packid).removeClass("noshow");
            $("#photo_slider_"+packid+' .advcphotos').addClass("noshow");
            $("#photo_slider_"+packid+' .basicphotos').addClass("noshow");
        }
        if (data_type == "advanced"){
            $("#initiate_photo_"+packid).addClass("noshow");
            $("#std_photos_"+packid).addClass("noshow");
            $("#advanced_request_"+packid).removeClass("noshow");
        }
    });

    $(document).on('click', '.btn-cancel', function (e) {
        e.preventDefault();
        
        var packid = $(this).attr('data-pack');
        $("#initiate_photo_"+packid).removeClass("noshow");
        $("#basic_confirm_"+packid).addClass("noshow");
        $("#advanced_request_"+packid).addClass("noshow");
        $("#photo_slider_"+packid+' .advcphotos').removeClass("noshow");
        $("#photo_slider_"+packid+' .basicphotos').removeClass("noshow");

        $.magnificPopup.close();
    });

    $(document).on('click', '.btn-advc', function (e) {
        e.preventDefault();
        var packid = $(this).attr('data-pack');
        $("#photo_slider_"+packid+' .advcphotos').removeClass("noshow");
        $("#photo_slider_"+packid+' .basicphotos').addClass("noshow");
        $("#std_photos_"+packid).addClass("noshow");
    });

    $(document).on('click', '.btn-std', function (e) {
        e.preventDefault();
        var packid = $(this).attr('data-pack');
        $("#photo_slider_"+packid+' .basicphotos').removeClass("noshow");
        $("#photo_slider_"+packid+' .advcphotos').addClass("noshow");
        $("#std_photos_"+packid).addClass("noshow");
    });



    $('.basic_confirm_btn').on('click', function(e) {
       e.preventDefault();

       $(".ajaxloader").show();
        var packid = $(this).attr('data-pack');
        var token = $('input[name="_token"]').val();

        jQuery.ajax({
            url: '/photos/standard/request',
            type : "POST",
            data:{ _token:token, packid:packid},
            error: function (request, status, error) {
                /*console.log(request.responseText);*/
                window.location = '/locker/';
            },
            success: function(data) {
                if (data.error == '0') {

                    var content = "";
                    $.each(data.photos, function(k, value) {
                        var photo = '/uploads/packages/standard/'+value.packid+'/'+value.name;
                        content += '<div class="item"><a href="#" target="_blank"><img src="'+photo+'"></a></div>';
                    });

                    var owl = $("#std_photos_"+packid+" .owl-ajax");
                    owl.append(content);
                    owl.owlCarousel({
                        loop:false, margin:10, responsiveClass:true, autoplay: false, nav:true, navText: '', responsive:{
                            0:{items:1},
                            600:{items:1},
                            1000:{items:1}
                        }
                    });

                    $("#basic_confirm_"+packid).addClass("noshow");
                    $("#std_photos_"+packid).removeClass("noshow");
                    
                    setTimeout(function(){
                        $(".ajaxloader").hide();
                    }, 5000);

                }else if (data.error == '1') {
                    $("#basic_confirm_"+packid).addClass("noshow");
                    $("#basic_pending_"+packid).removeClass("noshow");
                    $(".ajaxloader").hide();
                    setTimeout(function(){ window.location = '/locker/'; }, 5000);
                }else if(data.error == '2'){
                    window.location = '/locker/';
                }
            }
        });
        return false;

    });


    $('.advc_confirm_btn').on('click', function(e) {
       e.preventDefault();
        
        var packid = $(this).attr('data-pack');
        var description = $('#advc_desc_'+packid).val();

        if ($('#advc_verify_'+packid).prop('checked') != true){
            $("#advc_error_"+packid).html('<label class="error">Select checkbox to continue!</label>');
            return false;
        }

        if (description == "") {
            $("#advc_error_"+packid).html('<label class="error">Please describe about your photo request.</label>');
            return false;
        }
        var token = $('input[name="_token"]').val();

        $(".ajaxloader").show();
        
        jQuery.ajax({
            url: '/photos/advanced/request',
            type : "POST",
            data:{ _token:token, packid:packid, description:description},
            error: function (request, status, error) {
                /*console.log(request.responseText);*/
                window.location = '/locker/';
            },
            success: function(data) {
                if (data.error == 0) {
                    $("#advanced_request_"+packid).addClass("noshow");
                    $("#conirm_advcreq_"+packid).removeClass("noshow");
                    $(".ajaxloader").hide();
                    setTimeout(function(){ window.location = '/locker/'; }, 5000);
                }else if(data.error == '1'){
                    window.location = '/locker/';
                }
            }
        });
        return false;
    });

    $('.owl-noajax').owlCarousel({
        loop:false,
        margin:10,
        responsiveClass:true,
        autoplay: false,
        nav:true,
        navText: '',
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });
});