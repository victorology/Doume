$(function() {
	var current_fs, next_fs, previous_fs;
	var left, opacity, scale;
	var animating;

	function setSpaceHeightFromElement(e) {
		var fieldset_height = $(e).outerHeight();
		$(".space").height(fieldset_height);
	}

	setSpaceHeightFromElement($("fieldset")[0]);

	$(".submit").click(function() {
		// if (animating) return false;
		// animating = true;

		current_fs = $(this).parent();
		next_fs = $(this).parent().next();

		$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
		next_fs.show();
		current_fs.hide();

		$(".description h2").html('주문해주셔서 감사합니다!');
		$(".description h3").html('');
	});

	$(".next").click(function() {
		// if (animating) return false;
		// animating = true;

		current_fs = $(this).parent();
		next_fs = $(this).parent().next();

		$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
		next_fs.show();
		current_fs.hide();

		var order_at = current_fs.find("#order_at").val();
		var service_type = current_fs.find('input[name=service_type]:checked').parent().text();
		$(".description h2").html('');
		$(".description h3").html(order_at + ", " + service_type + "을 선택하셨습니다.");
		setSpaceHeightFromElement(next_fs);

		ga('send', 'event', 'orders', 'select_service_type', service_type);
		ga('send', 'event', 'orders', 'next', 'progress');
	});

	$(".previous").click(function() {
		// if (animating) return false;
		// animating = true;

		current_fs = $(this).parent();
		previous_fs = $(this).parent().prev();

		$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

		$(".description h2").html('쉽고 간편하게 도우미를 찾아보세요.');
		$(".description h3").html('<p>테스트를 거치고 검증된 도우미를 보내드립니다.</p><p>예약을 먼저하시고, 청소가 끝나면 비용을 지불하세요.</p>');

		previous_fs.show();
		current_fs.hide();

		setSpaceHeightFromElement(previous_fs);
		ga('send', 'event', 'orders', 'previous', 'progress');
	});

	var now = new Date();
	var today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
	var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 0, 0, 0, 0);
	$('#order_at').val(tomorrow.getFullYear()+"-"+(tomorrow.getMonth()+1)+"-"+tomorrow.getDate());
	$('#order_at').fdatepicker({
        onRender: function (date) {
            return date.valueOf() < tomorrow.valueOf() ? 'disabled' : '';
        }
    });

    $('#order_form').on('invalid', function () {
		var invalid = $(this).find('[data-invalid]');
		var invalid_fs = $(invalid[0]).parent().parent();

		var order_at = $("#order_at").val();
		var service_type = $('input[name=service_type]:checked').parent().text();
		$(".description h2").html('');
		$(".description h3").html(order_at + ", " + service_type + "을 선택하셨습니다.");

		$('fieldset').hide();
		invalid_fs.show();

		setSpaceHeightFromElement(invalid_fs);
		ga('send', 'event', 'orders', 'invalid', 'submit');
	});

	$('form[data-update-target]').on('ajax:success', function(evt, data) {
        var target = $(this).data('update-target');
        $('#' + target).html(data);
        $('.description h2').html('주문을 처리 중 에러가 발생했습니다');
		$(".description h3").html("");

		setSpaceHeightFromElement($('fieldset')[2]);
		ga('send', 'event', 'orders', 'success', 'submit');
	});

    $('form[data-update-target]').on('ajax:error', function(xhr, status, error) {
        var target = $(this).data('update-target');
        $('.description h2').html('주문을 처리 중 에러가 발생했습니다');
        $('#' + target).html("다시 한 번 시도해 주시거나, 에러가 반복적으로 발생하면, 잠시 후 다시 주문해 주시면 감사하겠습니다. 불편을 드려죄송합니다.");

        setSpaceHeightFromElement($('fieldset')[2]);
        ga('send', 'event', 'orders', 'error', 'submit');
    });

    $(function() {
		FastClick.attach(document.body);
	});
});