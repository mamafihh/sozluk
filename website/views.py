from flask import Blueprint, render_template, request
import json
from os.path import join, dirname, realpath

UPLOADS_PATH = join(dirname(realpath(__file__)), 'static/doc/')

with open(UPLOADS_PATH + "wordList.json", "r", encoding='utf-8') as file:
    word_list_dict = json.load(file)

views = Blueprint('views', __name__)

@views.route('/', methods=['GET', 'POST'])
def mainPage():
    if request.method == 'POST':   
        data = request.get_json()
        return searchBarAlgorithm(data['text'], word_list_dict)
    
    if request.method == "GET":
        return render_template("main.html")
    
def search_dict(word):    
    return searchBarAlgorithm(word, word_list_dict)

def searchBarAlgorithm(searchQuery, dataDict):
        if len(searchQuery):
            print(searchQuery)
            searchQuery = searchQuery.lower()
            result = {}

            for key, value in dataDict.items():
                keyScore = calculateSimilarityScore(searchQuery, key.lower())
                print(keyScore)
                if keyScore != -1:
                    result[key] = keyScore
        print(result)
        
        return sorted(result, key=result.get, reverse=True)
        

def calculateSimilarityScore(key, searched):
    keyLower = str(key.lower())
    searchedLower = str(searched.lower())
    score = 100
    unsimilarty = searchedLower.find(keyLower)
    if unsimilarty != -1:
        score -= unsimilarty
        return score
    
    return -1



