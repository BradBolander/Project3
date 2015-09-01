require 'bundler'
Bundler.require

ActiveRecord::Base.establish_connection(
  :adapter => 'postgresql',
  :database => 'galaxies'
)



get '/galaxy' do

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
  request_body = JSON.parse(request.body.read.to_s)
  @is_authorized = false;
    if env['HTTP_X_API_KEY'].nil? == false && env['HTTP_X_API_KEY'] == ENV['API_KEY']
      @is_authorized = true

    end
    if @is_authorized == false
      return_message = {
        :status => 'error',
        :message => "Invalid API key"
      }
      halt 401, {
        'Content-Type' => 'application/json'
      }, return_message.to_json
    end


  puts request_body[:name].to_json
  GalaxyModel.create(request_body).to_json

end

## update
put '/api/galaxy/:id' do

  request_body = JSON.parse(request.body.read.to_s)
  @is_authorized = false;
    if env['HTTP_X_API_KEY'].nil? == false && env['HTTP_X_API_KEY'] == ENV['API_KEY']
      @is_authorized = true

    end
    if @is_authorized == false
      return_message = {
        :status => 'error',
        :message => "Invalid API key"
      }
      halt 401, {
        'Content-Type' => 'application/json'
      }, return_message.to_json
    end
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
  request_body = JSON.parse(request.body.read.to_s)
  @is_authorized = false;
    if env['HTTP_X_API_KEY'].nil? == false && env['HTTP_X_API_KEY'] == ENV['API_KEY']
      @is_authorized = true

    end
    if @is_authorized == false
      return_message = {
        :status => 'error',
        :message => "Invalid API key"
      }
      halt 401, {
        'Content-Type' => 'application/json'
      }, return_message.to_json
    end
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
    if env['HTTP_X_API_KEY'].nil? == false && env['HTTP_X_API_KEY'] == ENV['API_KEY']
      @is_authorized = true

    end
    if @is_authorized == false
      return_message = {
        :status => 'error',
        :message => "Invalid API key"
      }
      halt 401, {
        'Content-Type' => 'application/json'
      }, return_message.to_json
    end

  GalaxyModel.destroy(params[:id]).to_json
end

get '/crud' do
  erb :crud
end
