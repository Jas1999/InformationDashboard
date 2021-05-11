
import os
from collections import Counter
from flask import Flask
from flask import send_from_directory
from flask import request
from flask import jsonify
import requests
import praw
import prawcore
import yaml
import spacy


#weather api key :
WeatherAPI = ''

app = Flask(__name__,  static_folder=r".\my-new-app\build")

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    print("path")
    print(app.static_folder)
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/hello')
def hello():
    return 'Hello, World!'

@app.route('/WeatherCheck/<Loc>')
def OpenWeatherTempCheck(Loc):
    print(Loc)
    CityPicked = Loc #"Brampton"
    city = request.args.get(CityPicked)  # city name passed as argument

    # call API and convert response into Python dictionary

    url = f'http://api.openweathermap.org/data/2.5/weather?q={CityPicked},{"CA"}&APPID={WeatherAPI}'
    #try:
    response = requests.get(url).json() # vs other ?
    current_temperature = response.get('main', {}).get('temp')
    current_temperature_celsius = round(current_temperature - 273.15, 0)

    current_weather = response.get('weather')#.get('id')
    current_description = current_weather[0]['main']
    #current_description = current_description['main']
    #current_description = jsonify(current_description)#.get('id')

    # error like unknown city name, inavalid api key
    if response.get('cod') != 200:
        message = response.get('message', '')
        return f'Error getting temperature for {city.title()}. Error message = {message}'

    WeatherDict = {
        'city':CityPicked,
        'description':current_weather[0]['main'],
        'temp':current_temperature_celsius,
        'icon': current_weather[0]['icon']
    }

    print(current_description)
    return WeatherDict #CityPicked + "\n description is " + current_description + "\n Temp is " + str((current_temperature_celsius)) #str(current_temperature_celsius)
    #except:
    #    return ("Weather API not found", 404)

@app.route('/test')
def backendTest():
    print('backend test')
    print("here")
    WeatherDict = {
        'city':"CityPicked",
        'description':"current_weather[0]['main']",
        'temp':"current_temperature_celsius",
        'icon': "current_weather[0]['icon']"
    }
    return WeatherDict #CityPicked + "\n description is " + current_description + "\n Temp is " + str((current_temperature_celsius)) #str(current_temperature_celsius)
    #except:
    #    return ("Weather API not found", 404)



if __name__ == '__main__':
    app.run(debug=True)
