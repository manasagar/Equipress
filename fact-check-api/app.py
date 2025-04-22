from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import time

app = Flask(__name__)
CORS(app)

@app.route('/api/check-facts', methods=['POST'])
def check_facts():
    # Simulate processing time
    time.sleep(1)
    
    data = request.json
    article_text = data.get('text', '')
    
    # Mock response
    return jsonify({
        'score': random.uniform(0, 100),
        'confidence': random.uniform(70, 95),
        'sources': [
            'https://example.com/source1',
            'https://example.com/source2',
            'https://example.com/source3',
        ],
        'explanation': 'This article contains statements that can be verified with reliable sources.'
    })

@app.route('/api/check-claim', methods=['POST'])
def check_claim():
    # Simulate processing time
    time.sleep(0.5)
    
    data = request.json
    claim = data.get('claim', '')
    
    # Mock response
    return jsonify({
        'score': random.uniform(0, 100),
        'confidence': random.uniform(70, 95),
        'sources': [
            'https://example.com/source1',
            'https://example.com/source2',
        ],
        'explanation': 'This claim has been analyzed based on available evidence.'
    })

@app.route('/api/similar-articles', methods=['POST'])
def similar_articles():
    # Simulate processing time
    time.sleep(0.5)
    
    data = request.json
    article_text = data.get('text', '')
    
    # Mock response
    return jsonify({
        'articles': [
            'Similar Article 1',
            'Similar Article 2',
            'Similar Article 3',
        ]
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
