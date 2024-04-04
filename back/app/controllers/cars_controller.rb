class CarsController < ApplicationController
  before_action only: [:show, :update, :destroy] do
    find_car(params[:id])
  end

  def index
    render json: {
      status: "success",
      data: Car.all
    }, status: :ok
  end

  def view_range
    render json: {
      status: "success",
      data: Car.where("expiry >= #{params[:start]}").where("expiry <= #{params[:end]}")
    }, status: :ok
  end

  def view_expiry
    render json: {
      status: "success",
      data: Car.where("expiry >= #{params[:start]}").where("expiry <= #{params[:start].to_i + 2592000}")
    }, status: :ok
  end

  def show
    success_render(@car)
  end

  def create
    @car = Car.new(car_params)

    if @car.save
      success_render(@car)
    else
      # @car.errors.add(:expiry, "must not be in the past") if @car.expiry < Time.now.to_i
      error_render({ full_messages: @car.errors.full_messages }, :bad_request)
    end
  end

  def update
    if @car.update(car_params)
      success_render(@car)
    else
      error_render({ full_messages: @car.errors.full_messages }, :bad_request)
    end
  end

  def destroy
    @car.destroy
    render json: { status: "success", data: {} }, status: :ok
  end

  private
  def find_car(id)
    @car = Car.find_by(id: id)

    unless @car
      error_render({ full_messages: "Car Not Found" }, :not_found)
    end
  end

  def car_params
    params.permit(:company, :plate, :colour, :propellant, :seats, :expiry)
  end

  def success_render(data, status = :ok)
    render json: {
      status: "success",
      data: CarSerializer.new(data).serializable_hash
    }, status: status
  end
end
