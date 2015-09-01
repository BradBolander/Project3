require 'bundler'
Bundler.require

ActiveRecord::Base.establish_connection(
  :adapter => 'postgresql',
  :database => 'galaxies'
)



get '/galaxy' do
  @key = ENV['API_KEY']
  erb :galaxy
end

get '/' do
  erb :index
end

## get
get '/api/galaxy' do
  GalaxyModel.all.to_json
end

## get by id
get '/api/galaxy/:id' do

  GalaxyModel.find(params[:id]).to_json
end

## create
post '/api/galaxy' do

  @is_authorized = false;
 if @key == global.apiKey
  @is_authorized = true
 end
 if @is_authorized == false
  return {:status => '403', :message => 'not authorized'}.to_json
 end

  request_body = JSON.parse(request.body.read.to_s)
  GalaxyModel.create(request_body).to_json

end

## update
put '/api/galaxy/:id' do
  @is_authorized = false;
 if params[:api_key].nil? == false && params[:api_key] == ENV[API_KEY]
  @is_authorized = true
 end
 if @is_authorized == false
  return {:status => '403', :message => 'not authorized'}.to_json
 end

  request_body = JSON.parse(request.body.read.to_s)
  @id = params[:id]
  @galaxy = GalaxyModel.find(@id)
  @galaxy.name = request_body[:name]
  @galaxy.radius = request_body[:radius]
  @galaxy.color = request_body[:color]
  @galaxy.stars = request_body[:stars]
  @galaxy.brightness = request_body[:brightness]
  @galaxy.save
  @galaxy.to_json
end

patch '/api/galaxy/:id' do

  @is_authorized = false;
 if params[:api_key].nil? == false && params[:api_key] == ENV[API_KEY]
  @is_authorized = true
 end
 if @is_authorized == false
  return {:status => '403', :message => 'not authorized'}.to_json
 end

  request_body = JSON.parse(request.body.read.to_s)
  @id = params[:id]
  @galaxy = GalaxyModel.find(@id)
  @galaxy.name = request_body[:name]
  @galaxy.radius = request_body[:radius]
  @galaxy.color = request_body[:color]
  @galaxy.stars = request_body[:stars]
  @galaxy.brightness = request_body[:brightness]
  @galaxy.save
  @galaxy.to_json
end

## delete
delete '/api/galaxy/:id' do

  @is_authorized = false;
 if params[:api_key].nil? == false && params[:api_key] == ENV[API_KEY]
  @is_authorized = true
 end
 if @is_authorized == false
  return {:status => '403', :message => 'not authorized'}.to_json
 end

  GalaxyModel.destroy(params[:id]).to_json
end

get '/crud' do
  erb :crud
end
