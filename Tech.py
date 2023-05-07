import requests
from newsapi import NewsApiClient
import spacy
import psycopg2
from flask import Flask, jsonify, redirect, render_template
import schedule
import time
import threading
from transformers import pipeline
from fuzzywuzzy import fuzz


app = Flask(__name__)

# Initialize NewsAPI client
newsapi = NewsApiClient(api_key='454e1b7729e94618826db2e78a9649ec')

# Initialize summarizer from Hugging Face Transformers library
summarizer = pipeline('summarization', model='sshleifer/distilbart-cnn-12-6', revision='a4f8f3e')

def get_news_articles(query, language='en', page_size=10):
    response = newsapi.get_everything(q=query, language=language, page_size=page_size, sort_by='publishedAt')
    articles = response['articles']

    # Remove duplicates based on the title
    unique_articles = []
    titles = []
    for article in articles:
        title = article['title']
        duplicate = False

        for existing_title in titles:
            similarity = fuzz.token_set_ratio(title, existing_title)

            # If the similarity is above the threshold (e.g., 80), consider the title a duplicate
            if similarity > 100:
                duplicate = True
                break

        if not duplicate:
            unique_articles.append(article)
            titles.append(title)

    return unique_articles

def summarize_article(text, max_length=9500, min_length=8200):
    input_length = len(text.split(' '))
    adjusted_max_length = min(max_length, int(input_length * 3.5))
    adjusted_min_length = min(min_length, adjusted_max_length)

    summary = summarizer(text, max_length=adjusted_max_length, min_length=adjusted_min_length, do_sample=False)
    return summary[0]['summary_text']

def store_summarized_articles():
    # Connect to the PostgreSQL database
    conn = psycopg2.connect(database="Articles", user="postgres", password="tajae1532", host="::1", port="5432")
    cursor = conn.cursor()

    # Fetch articles
    query = 'tech'
    articles = get_news_articles(query)

    seen_titles = []

    # Summarize articles
    for article in articles:
        title = article['title']

        if title in seen_titles:
            continue

        seen_titles.append(title)

        summary = summarize_article(article['content'])
        source = article['source']['name']
        url = article['url']

        # Insert the summarized article into the database
        cursor.execute("INSERT INTO summarized_articles (title, source, url, summary) VALUES (%s, %s, %s, %s)", (title, source, url, summary))
        conn.commit()

    # Close the PostgreSQL connection
    cursor.close()
    conn.close()


@app.route('/tech', methods=['GET'])
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

    return render_template('tech.html', articles=summarized_articles)

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