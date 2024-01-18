from flask import Blueprint, render_template

wordPage = Blueprint("wordPage", __name__)

@wordPage.route('/<kelime>', methods=['GET'])
def send_word_page(kelime):
    #return render_template("wordPage.html", kelime=kelime)
    print('ben')
    return f'Aranan kelime: {kelime}'