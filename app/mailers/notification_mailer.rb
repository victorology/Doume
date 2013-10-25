class NotificationMailer < ActionMailer::Base
  add_template_helper(Helper)
  default from: "notification@mydoume.com"
  default to: "nabugoon@gmail.com,v@victor.is"
  default subject: "We have a new order!"

  def order_notification(order)
  	@order = order
  	mail
  end
end
