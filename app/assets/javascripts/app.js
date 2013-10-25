$(function() {
	var current_fs, next_fs, previous_fs;
	var left, opacity, scale;
	var animating;

	$(".next").click(function() {
		// if (animating) return false;
		// animating = true;

		current_fs = $(this).parent();
		next_fs = $(this).parent().next();

		$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
		next_fs.show();
		current_fs.hide();

		var order_at = current_fs.find("#order_at").val();
		next_fs.find("#order_at").html(order_at);
		var order_service = current_fs.find('input[name=service]:checked').parent().text();
		next_fs.find("#order_service").html(order_service);
	});

	$(".previous").click(function() {
		// if (animating) return false;
		// animating = true;

		current_fs = $(this).parent();
		previous_fs = $(this).parent().prev();

		$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
		previous_fs.show();
		current_fs.hide();
	});

	$(".submit").click(function() {
		return false;
	});

	var fieldset_height = $("fieldset").outerHeight();
	$(".space").height(fieldset_height);

	var now = new Date();
	var today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
	var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 0, 0, 0, 0);
	$('#order_at').val(tomorrow.getFullYear()+"-"+(tomorrow.getMonth()+1)+"-"+tomorrow.getDate());
	$('#order_at').fdatepicker({
        onRender: function (date) {
            return date.valueOf() < today.valueOf() ? 'disabled' : '';
        }
    });

    $('#order_form').on('invalid', function () {
		var invalid = $(this).find('[data-invalid]');
		var invalid_fs = $(invalid[0]).parent().parent();
		invalid_fs.show();
	});
});