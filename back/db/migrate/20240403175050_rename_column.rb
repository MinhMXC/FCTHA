class RenameColumn < ActiveRecord::Migration[7.1]
  def change
    rename_column(:cars, :expire, :expiry)
    rename_column(:cars, :owner, :company)
  end
end
