class OrdersController < ApplicationController
	def create
		@data = request.POST
		order = Order.new
		order.order_at = @data['order_at']
		order.service_type = @data['service_type']
		order.name = @data['name']
		order.address = @data['address']
		order.tel = @data['tel']
		if order.save
			NotificationMailer.order_notification(order).deliver
		end
	end
end
