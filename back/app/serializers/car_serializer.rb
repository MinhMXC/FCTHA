class CarSerializer < ActiveModel::Serializer
  attributes :id, :company, :plate, :colour, :propellant, :seats, :expiry
end
