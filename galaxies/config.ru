require './app'
require './models/GalaxyModel'
require 'dotenv'
Dotenv.load

run Sinatra::Application
