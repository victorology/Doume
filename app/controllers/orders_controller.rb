class OrdersController < ApplicationController
	def create
		@date = request.POST['date']
		@service = request.POST['service']
	end
end
