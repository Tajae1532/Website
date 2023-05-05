import requests
from newsapi import NewsApiClient
import spacy
import psycopg2
from flask import Flask, jsonify, redirect, render_template
import schedule
import time
import threading
from transformers import pipeline

app = Flask(__name__)

# Initialize NewsAPI client
newsapi = NewsApiClient(api_key='454e1b7729e94618826db2e78a9649ec')

# Initialize summarizer from Hugging Face Transformers library
summarizer = pipeline('summarization')

def get_news_articles(query, language='en', page_size=4):
    response = newsapi.get_everything(q=query, language=language, page_size=page_size, sort_by='publishedAt')
    return response['articles']

def summarize_article(text, max_length=50):
    summary = summarizer(text, max_length=max_length, min_length=25, do_sample=False)
    return summary[0]['summary_text']

def store_summarized_articles():
    # Connect to the PostgreSQL database
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

        # Insert the summarized article into the database
        cursor.execute("INSERT INTO summarized_articles (title, source, url, summary) VALUES (%s, %s, %s, %s)", (title, source, url, summary))
        conn.commit()

    # Close the PostgreSQL connection
    cursor.close()
    conn.close()


@app.route('/finance', methods=['GET'])
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

    return render_template('finance.html', articles=summarized_articles)

#def update_articles():
    #while True:
        #store_summarized_articles()
        #time.sleep(60)

if __name__ == '__main__':
    # Start the background thread to update the articles
    #update_thread = threading.Thread(target=update_articles)
    #pdate_thread.daemon = True
    #update_thread.start()

    # Start the Flask app
    store_summarized_articles()
    app.run(debug=True)