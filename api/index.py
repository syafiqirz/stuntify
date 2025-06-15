from flask import Flask, request, render_template, jsonify
import joblib
import numpy as np
import os
import requests
import json

# Get the directory where this script is located
basedir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

# Create Flask app with explicit template folder path
app = Flask(__name__, 
           template_folder=os.path.join(basedir, 'templates'),
           static_folder=os.path.join(basedir, 'static'))

# Create Flask app with explicit template folder path
app = Flask(__name__, 
           template_folder=os.path.join(basedir, 'templates'),
           static_folder=os.path.join(basedir, 'static'))

# Allow webpack dev server proxy when in development mode
@app.after_request
def add_header(response):
    response.headers['Cache-Control'] = 'no-store'
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

# Local AI is now used for chat responses
# No API keys needed - using the custom JavaScript implementation

# Load models and encoders when the app starts
def load_models():
    """Load all trained models and encoders"""
    try:
        models = {
            'stunting_model': joblib.load(os.path.join(basedir, 'stunting_model.pkl')),
            'wasting_model': joblib.load(os.path.join(basedir, 'wasting_model.pkl')),
            'gender_encoder': joblib.load(os.path.join(basedir, 'gender_encoder.pkl')),
            'stunting_encoder': joblib.load(os.path.join(basedir, 'stunting_encoder.pkl')),
            'wasting_encoder': joblib.load(os.path.join(basedir, 'wasting_encoder.pkl')),
            'scaler': joblib.load(os.path.join(basedir, 'scaler.pkl'))
        }
        print("All models loaded successfully!")
        return models
    except FileNotFoundError as e:
        print(f"Model file not found: {e}")
        print("Please run 'python train_model.py' first to create the model files.")
        return None

# Load models at startup
models = load_models()

# ROUTES FOR ALL PAGES
@app.route('/')
def home():
    """Home page - index.html"""
    return render_template('index.html')

@app.route('/index.html')
def index():
    """Alternative route for index page"""
    return render_template('index.html')

@app.route('/stunting.html')
def stunting():
    """Stunting calculator page"""
    return render_template('stunting.html')

@app.route('/articel.html')
def articel():
    """Article page"""
    return render_template('articel.html')

@app.route('/articleDetail.html')
def article_detail():
    """Article detail page"""
    return render_template('articleDetail.html')

@app.route('/bmi.html')
def bmi_redirect():
    """BMI redirect page"""
    return render_template('bmi.html')

@app.route('/bmi_redirect.html')
def bmi_redirect_alt():
    """Alternative BMI redirect page"""
    return render_template('bmi_redirect.html')

# PREDICTION ROUTES
@app.route('/predict', methods=['POST'])
def predict():
    """Handle prediction requests - returns HTML page"""
    if models is None:
        return render_template('error.html', 
                             error="Models not loaded. Please run train_model.py first.")
    
    try:
        # Get data from form
        gender = request.form['gender']
        age_months = float(request.form['age_months'])
        height_cm = float(request.form['height_cm'])
        weight_kg = float(request.form['weight_kg'])
        
        # Validate inputs
        if not all([gender, age_months >= 0, height_cm > 0, weight_kg > 0]):
            raise ValueError("Invalid input values. Please check your entries.")
        
        # Make prediction
        prediction_result = make_prediction(gender, age_months, height_cm, weight_kg)
        
        return render_template('result.html', 
                             stunting_result=prediction_result['stunting_result'],
                             wasting_result=prediction_result['wasting_result'],
                             stunting_confidence=prediction_result['stunting_confidence'],
                             wasting_confidence=prediction_result['wasting_confidence'],
                             input_data={
                                 'gender': gender,
                                 'age_months': age_months,
                                 'height_cm': height_cm,
                                 'weight_kg': weight_kg
                             })
    
    except Exception as e:
        return render_template('error.html', error=str(e))

@app.route('/predict_json', methods=['POST'])
def predict_json():
    """Handle AJAX prediction requests - returns JSON"""
    if models is None:
        return jsonify({'error': 'Models not loaded'}), 500
    
    try:
        # Get data from JSON request
        data = request.get_json()
        gender = data['gender']
        age_months = float(data['age_months'])
        height_cm = float(data['height_cm'])
        weight_kg = float(data['weight_kg'])
        
        # Validate inputs
        if not all([gender, age_months >= 0, height_cm > 0, weight_kg > 0]):
            return jsonify({'error': 'Invalid input values'}), 400
        
        # Make prediction
        prediction_result = make_prediction(gender, age_months, height_cm, weight_kg)
        
        return jsonify(prediction_result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/chat', methods=['POST'])
def chat_local():
    """Handle chatbot requests using local AI implementation"""
    try:
        # For backward compatibility, return a message that directs to local AI
        return jsonify({
            'response': 'Asisten AI kini dijalankan secara lokal melalui JavaScript. Interaksi tidak memerlukan server.',
            'success': True
        })
    except Exception as e:
        print(f"Chat error: {e}")
        return jsonify({
            'response': 'Terjadi kesalahan sistem. Silakan gunakan fitur AI lokal.',
            'success': False
        })

def make_prediction(gender, age_months, height_cm, weight_kg):
    """Make ML prediction and return results"""
    # Encode gender
    gender_encoded = models['gender_encoder'].transform([gender])[0]
    
    # Prepare features
    features = np.array([[gender_encoded, age_months, height_cm, weight_kg]])
    features_scaled = models['scaler'].transform(features)
    
    # Make predictions
    stunting_pred_encoded = models['stunting_model'].predict(features_scaled)[0]
    wasting_pred_encoded = models['wasting_model'].predict(features_scaled)[0]
    
    # Decode predictions
    stunting_pred = models['stunting_encoder'].inverse_transform([stunting_pred_encoded])[0]
    wasting_pred = models['wasting_encoder'].inverse_transform([wasting_pred_encoded])[0]
    
    # Get prediction probabilities
    stunting_proba = models['stunting_model'].predict_proba(features_scaled)[0]
    wasting_proba = models['wasting_model'].predict_proba(features_scaled)[0]
    
    return {
        'stunting_result': stunting_pred,
        'wasting_result': wasting_pred,
        'stunting_confidence': round(max(stunting_proba) * 100, 1),
        'wasting_confidence': round(max(wasting_proba) * 100, 1)
    }

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
