class OrdersController < ApplicationController
	def create
		@data = request.POST
	end
end
