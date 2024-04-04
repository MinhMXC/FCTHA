class CreateCars < ActiveRecord::Migration[7.1]
  def change
    create_table :cars do |t|
      t.string :owner, null: false
      t.string :plate, null: false
      t.string :colour, null: false
      t.string :propellant, null: false
      t.integer :seats, null: false
      t.integer :expire, null: false

      t.timestamps
    end
  end
end
