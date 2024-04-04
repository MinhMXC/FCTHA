class Car < ApplicationRecord
  validates :company, :plate, :colour, :propellant, :seats, :expiry, presence: true
  validates_comparison_of :expiry, greater_than: Time.now.to_i, message: 'Date must not be in the past'
end
