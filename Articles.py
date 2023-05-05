import requests
from newsapi import NewsApiClient
import spacy
import psycopg2
from flask import Flask, jsonify, redirect
import schedule
import time
import threading

app = Flask(__name__)

# Initialize NewsAPI client
newsapi = NewsApiClient(api_key='454e1b7729e94618826db2e78a9649ec')

# Initialize spaCy and load the English model
nlp = spacy.load('en_core_web_sm')

def get_news_articles(query, language='en', page_size=10):
    response = newsapi.get_everything(q=query, language=language, page_size=page_size, sort_by='publishedAt')
    return response['articles']

def summarize_article(text, max_length=50):
    doc = nlp(text)
    summary_sentences = []
    for sentence in doc.sents:
        if len(summary_sentences) < max_length:
            summary_sentences.append(sentence)
        else:
            break
    return ' '.join([str(s) for s in summary_sentences])

def store_summarized_articles():
    #Connect to the PostgreSQl database
    conn = psycopg2.connect(database="Articles", user="postgres", password="tajae1532", host="::1", port="5432")
    cursor = conn.cursor()

    # Fetch articles
    query = 'tech OR finance'
    articles = get_news_articles(query)

    # Summarize articles
    for article in articles:
        summary = summarize_article(article['content'])
        title = article['title']
        source = article['source']['name']
        url = article['url']

        #Insert the summarized article into the database
        cursor.execute("INSERT INTO summarized_articles (title, source, url, summary) VALUES (%s, %s, %s, %s)", (title, source, url, summary))
        conn.commit()

    #Close the PostgreSQl connection
    cursor.close()
    conn.close()


@app.route('/', methods=['GET'])
def index():
    return redirect('/api/summarized-articles', code=302)

@app.route('/api/summarized-articles', methods=['GET'])
def get_summarized_articles():
    #Connect to the PostgreSQL database
    conn = psycopg2.connect(database="Articles", user="postgres", password="tajae1532", host="::1", port="5432")
    cursor = conn.cursor()

    #Execute the SELECT query
    cursor.execute("SELECT * FROM summarized_articles")

    #Fetch and format all rows
    rows = cursor.fetchall()
    summarized_articles = []
    for row in rows:
        summarized_articles.append({
            'id': row[0],
            'title': row[1],
            'source': row[2],
            'url': row[3],
            'summary': row[4]
        })
    
    #Close the PostgreSQL connection
    cursor.close()
    conn.close()

    return jsonify(summarized_articles)

def update_articles():
    while True:
        store_summarized_articles()
        time.sleep(60)

if __name__ == '__main__':
    # Start the background thread to update the articles
    update_thread = threading.Thread(target=update_articles)
    update_thread.daemon = True
    update_thread.start()

    # Start the Flask app
    app.run(debug=True)
