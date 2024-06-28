# app.rb
require 'sinatra'
require 'json'

# In-memory data store
TRAINS = []

# Helper method to find a train by ID
def find_train(id)
  TRAINS.find { |train| train[:id] == id.to_i }
end

# Routes
get '/' do
  "Welcome to the Trains API!"
end

# List all trains
get '/trains' do
  content_type :json
  TRAINS.to_json
end

# Get details of a specific train
get '/trains/:id' do
  train = find_train(params[:id])
  if train
    content_type :json
    train.to_json
  else
    status 404
    "Train not found".to_json
  end
end

# Add a new train
post '/trains' do
  new_train = {
    id: TRAINS.size + 1,
    name: params[:name],
    speed: params[:speed],
    capacity: params[:capacity]
  }
  TRAINS << new_train
  status 201
  content_type :json
  new_train.to_json
end

# Update train information
put '/trains/:id' do
  train = find_train(params[:id])
  if train
    train[:name] = params[:name] if params[:name]
    train[:speed] = params[:speed] if params[:speed]
    train[:capacity] = params[:capacity] if params[:capacity]
    content_type :json
    train.to_json
  else
    status 404
    "Train not found".to_json
  end
end

# Delete a train
delete '/trains/:id' do
  train = find_train(params[:id])
  if train
    TRAINS.delete(train)
    status 204
  else
    status 404
    "Train not found".to_json
  end
end

# Get trains by speed range
get '/trains/speed' do
  min_speed = params[:min_speed].to_i
  max_speed = params[:max_speed].to_i
  filtered_trains = TRAINS.select { |train| train[:speed].to_i.between?(min_speed, max_speed) }
  content_type :json
  filtered_trains.to_json
end

# Get trains by name
get '/trains/name/:name' do
  name = params[:name]
  filtered_trains = TRAINS.select { |train| train[:name].downcase.include?(name.downcase) }
  content_type :json
  filtered_trains.to_json
end
