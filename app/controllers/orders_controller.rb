class OrdersController < ApplicationController
	def create
		@data = request.POST
		order = Order.new
		order.order_at = @data['order_at']
		order.service_type = @data['service_type']
		order.name = @data['name']
		order.address = @data['address']
		order.tel = @data['tel']
		order.save
	end
end
