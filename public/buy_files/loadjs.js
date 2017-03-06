function openOffersDialog() {
	jQuery('#overlay').fadeIn('fast', function() {
		jQuery('.status-popup').html('1');
		jQuery('#boxpopup').css('display','block');
        jQuery('#boxpopup').animate({'left':'25%'},500);
    });
	
}



function closeOffersDialog(prospectElementID) {
	jQuery(function($) {
		jQuery(document).ready(function() {
			jQuery('#' + prospectElementID).css('position','absolute');
			jQuery('#' + prospectElementID).animate({'left':'-100%'}, 500, function() {
				jQuery('#' + prospectElementID).css('position','fixed');
				jQuery('#' + prospectElementID).css('left','100%');
				jQuery('#overlay').fadeOut('fast');
				
			});
		});
	});
}



jQuery(document).ready(function() {
   
   

   jQuery(".dongy").click(function(){
		if(jQuery.trim(jQuery('.dongy').val())=='0'){
			jQuery('.dongy').val(1);
		}else{
			jQuery('.dongy').val(0);
		}
	});

	jQuery(".dangkynhanh2").click(function(){
		if(jQuery.trim(jQuery('#hotennhanh').val())=='H? và tên' || jQuery.trim(jQuery('#hotennhanh').val())=='' || jQuery.trim(jQuery('#hotennhanh').val())=='Full name'){
			jQuery('.clearnhanh').html('');
			jQuery('.hotennhanhtatus').html('Ph?i nh?p h? tên');
			return false;
		}
		if(jQuery.trim(jQuery('#dienthoainhanh').val())=='Ði?n tho?i' || jQuery.trim(jQuery('#dienthoainhanh').val())=='' || jQuery.trim(jQuery('#dienthoainhanh').val())=='Phone'){
			jQuery('.clearnhanh').html('');
			jQuery('.dienthoainhanhstatus').html('Ph?i nh?p s? di?n tho?i');
			return false;
		}
		if(jQuery.trim(jQuery('#emailnhanh').val())=='Email' || jQuery.trim(jQuery('#emailnhanh').val())==''||jQuery.trim(jQuery('#emailnhanh').val())=='Email'){
			jQuery('.clearnhanh').html('');
			jQuery('.emailnhanhstatus').html('Ph?i nh?p email');
			return false;
		}
		if(jQuery.trim(jQuery('#diachinhanh').val())=='Ð?a ch?'||jQuery.trim(jQuery('#diachinhanh').val())=='' || jQuery.trim(jQuery('#diachinhanh').val())=='Address'){
			jQuery('.clearnhanh').html('');
			jQuery('.diachinhanhstatus').html('Ph?i nh?p d?a ch?');
			return false;
		}
		
		if(jQuery('#khoahocnhanh').val()==0){
			jQuery('.clearnhanh').html('');
			jQuery('.khoahocnhanhstatus').html('Ph?i nh?p Khóa h?c');
			return false;
		}
		if(jQuery.trim(jQuery('#thoigiankiemtra').val())=='Ngày ki?m tra'||jQuery.trim(jQuery('#thoigiankiemtra').val())=='Time check'){
			jQuery('.clearnhanh').html('');
			jQuery('.thoigiankiemtrastatus').html('Ph?i nh?p ngày ki?m tra');
			return false;
		}
	
		jQuery.ajax({
			type: "POST",
			url: "http://iigtraining.com/update.php",
			data: "hoten="+ jQuery('#hotennhanh').val() + "&dienthoai=" + jQuery('#dienthoainhanh').val() + "&email=" + jQuery('#emailnhanh').val() + "&diachi=" + jQuery('#diachinhanh').val()+ "&khoahoc=" + jQuery('#khoahocnhanh').val()+ "&thoigiankiemtra=" + jQuery('#thoigiankiemtra').val(),
			success: function(data){
				if(data=='1'){
					jQuery('.dangkynhanh').html('Chúc m?ng b?n dã dang ký thành công<br/>Chúng tôi s? liên h? s?m v?i b?n d? s?p l?ch');
				}
			}

		});
		
	});

});