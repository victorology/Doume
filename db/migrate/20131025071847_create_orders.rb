class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
    	t.date :order_at
    	t.integer :service_type
    	t.string :name
    	t.string :address
    	t.string :tel
      t.timestamps
    end
  end
end
