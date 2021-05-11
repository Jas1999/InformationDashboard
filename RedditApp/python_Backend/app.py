import os
from collections import Counter
from flask import Flask
from flask import send_from_directory
from flask import request
import requests
import praw
import prawcore
import yaml
import spacy

"""
RedditInfoLoc =  "C:\\school\\python\\WebApp\\RedditAccount.yml"

with open(RedditInfoLoc) as data:
    RedditInfo =  yaml.load(data)

print(RedditInfo)
"""
# Create our Reddit client (lets us communicate with Reddit)
reddit = praw.Reddit(client_id="",
                     client_secret="",
                     user_agent="")


#subRed = "uwaterloo"

#weather call:
WeatherAPI = ''
#http://api.openweathermap.org/data/2.5/weather?q=city_name&APPID=your_api_key
#http://api.openweathermap.org/data/2.5/weather?q=&APPID=your_api_key

subIds = ["uwaterloo", "UBC", "UofT","mcgill"]

app = Flask(__name__, static_folder = r"C:\Users\Jasman Sahi.DESKTOP-LIATQS5\Documents\Projects\Python\WebApp\React_Frontend\react-app\build")


# a simple page that says hello
@app.route('/hello')
def hello():
    return 'Hello, World!'


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/WeatherCheck/<Loc>/Set')
def OpenWeatherCheck(Loc):
    print(Loc)
    CityPicked = Loc #"Brampton"
    city = request.args.get(CityPicked)  # city name passed as argument

    # call API and convert response into Python dictionary

    url = f'http://api.openweathermap.org/data/2.5/weather?q={CityPicked}&APPID={WeatherAPI}'
    #try:
    response = requests.get(url).json() # vs other ?
    current_temperature = response.get('main', {}).get('temp')
    current_temperature_celsius = round(current_temperature - 273.15, 0)
    return CityPicked + " temp is "+ str(current_temperature_celsius)
    #except:
    #    return ("Weather API not found", 404)

@app.route('/Subreddit') # slow
def PreSetSubredditJSON():
    try:
        SubDets = {}

        limit = request.args.get('limit')
        try:

            limit = int(limit)
        except:
            limit = 500 #request

        for Id in subIds:
            Sub = reddit.subreddit(Id)
            #descrip = Sub.description_html
            RedPosts = Sub.top('all', limit = limit)
            PostTitle = [post.title for post in RedPosts]

            SubDets[Id] = {
                "SubRedditID": Id,
                "SubRedditname": Sub.display_name,
                "NumSubs": Sub.subscribers,
                "RedditImg": Sub.icon_img,
                #"wordCounts":list(PostTitle)
            }
        print("here")
        print(SubDets)
        return (SubDets,200) #'subscribers:'
    except prawcore.exceptions.Redirect:
    	# If the subreddit can't be found, return an error message and error code.
        return ("Subreddit not found", 404)


@app.route('/Subreddit/<subRed>')
def SubredditJSON(subRed):
    print('here2')
    print(subRed)
    try:

        limit = request.args.get('limit')
        print(limit)
        try:

            limit = int(limit)
        except:
            limit = 500 #request

        Sub = reddit.subreddit(subRed)
        #descrip = Sub.description_html
        RedPosts = Sub.top('all', limit = limit)
        PostTitle = [post.title for post in RedPosts]

        print("select:")
        print(Sub.display_name)
        print(Sub.subscribers)
        return (
        {
            "SubRedditID": subRed,
            "SubRedditname": Sub.display_name,
            "NumSubs": Sub.subscribers,
            "RedditImg": Sub.icon_img,
            "wordCounts":list(PostTitle)
        },200) #'subscribers:'
    except prawcore.exceptions.Redirect:
    	# If the subreddit can't be found, return an error message and error code.
        return ("Subreddit not found", 404)



@app.route('/Subreddit/<subRed>/Count')
def Subreddit_Count(subRed):
    try:
        Sub = reddit.subreddit(subRed)
        #descrip = Sub.description_html
        SubCount = Sub.subscribers
        return (str(SubCount),200) #'subscribers:'
    except prawcore.exceptions.Redirect:
    	# If the subreddit can't be found, return an error message and error code.
        return ("Subreddit not found", 404)

@app.route('/Subreddit/<subRed>/banner')
def Subreddit_Banner(subRed):
    try:
        Sub = reddit.subreddit(subRed)
        #descrip = Sub.description_html
        BannerImg = Sub.banner_img
        return ("<img src=%s>" % BannerImg,200) #'subscribers:'
    except prawcore.exceptions.Redirect:
    	# If the subreddit can't be found, return an error message and error code.
        return ("Subreddit not found", 404)

@app.route('/Subreddit/<subRed>/Top')
def Subreddit_Top(subRed):
    try:
        #limit = request.args.get('limit') # ?var =
        limit = request.args.get('limit')
        print(limit)
        try:

            limit = int(limit)
        except:
            limit = 10 #request
        limit = min(100,limit)
        Sub = reddit.subreddit(subRed)
        #descrip = Sub.description_html
        RedPosts = Sub.top('all', limit = limit)
        PostTitle = [post.title for post in RedPosts]
        return ({'TOPPosts': list(PostTitle)},200) #'subscribers:'
    except prawcore.exceptions.Redirect:
    	# If the subreddit can't be found, returdn an error message and error code.
        return ("Subreddit not found", 404)


@app.route('/Subreddit/<subRed>/CommonWords')
def Subreddit_CommonWords(subRed):
    try:
        #limit = request.args.get('limit') # ?var =
        limit = request.args.get('limit')
        print(limit)
        try:

            limit = int(limit)
        except:
            limit = 500 #request
        limit = min(1000,limit)
        Sub = reddit.subreddit(subRed)
        #descrip = Sub.description_html
        RedPosts = Sub.top('all', limit = limit)
        PostTitle = [post.title for post in RedPosts]
        PostTitleText = " ".join(PostTitle)
        print(PostTitleText)

        nlp = spacy.load("en_core_web_sm")

        Text = nlp(PostTitleText)#??
        tokens = [token.text.lower() for token in Text if (not token.is_digit) and not (token.is_punct) and (not token.is_stop) ]

        WC = Counter(tokens)
        #???
        filtered_word_count = [count for count in WC.items() if count[1] > 10]
        # Sort words by count
        sorted_word_count = sorted(filtered_word_count, key=lambda item: item[1], reverse=True)
        # Return dictionary with response
        return ({ 'word_count': sorted_word_count }, 200)
    except prawcore.exceptions.Redirect:
    	# If the subreddit can't be found, return an error message and error code.
        return ("Subreddit not found", 404)

if __name__ == '__main__':
    app.run(debug=True)
