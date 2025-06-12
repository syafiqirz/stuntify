import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
import joblib

def load_and_explore_data():
    """Load and explore the dataset"""
    df = pd.read_csv('stunting_generated.csv')
    print("Dataset shape:", df.shape)
    print("\nFirst few rows:")
    print(df.head())
    print("\nTarget distributions:")
    print("Stunting:", df['Stunting'].value_counts())
    print("\nWasting:", df['Wasting'].value_counts())
    return df

def preprocess_data(df):
    """Preprocess the data for machine learning"""
    processed_df = df.copy()
    
    # Encode gender
    gender_encoder = LabelEncoder()
    processed_df['Jenis_Kelamin_Encoded'] = gender_encoder.fit_transform(df['Jenis Kelamin'])
    
    # Encode target variables
    stunting_encoder = LabelEncoder()
    wasting_encoder = LabelEncoder()
    
    processed_df['Stunting_Encoded'] = stunting_encoder.fit_transform(df['Stunting'])
    processed_df['Wasting_Encoded'] = wasting_encoder.fit_transform(df['Wasting'])
    
    # Select features for modeling
    feature_columns = ['Jenis_Kelamin_Encoded', 'Umur (bulan)', 'Tinggi Badan (cm)', 'Berat Badan (kg)']
    X = processed_df[feature_columns]
    
    # Scale features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    return X_scaled, processed_df['Stunting_Encoded'], processed_df['Wasting_Encoded'], gender_encoder, stunting_encoder, wasting_encoder, scaler

def train_models(X, y_stunting, y_wasting):
    """Train the machine learning models"""
    # Split data
    X_train, X_test, y_stunting_train, y_stunting_test, y_wasting_train, y_wasting_test = train_test_split(
        X, y_stunting, y_wasting, test_size=0.2, random_state=42
    )
    
    # Train Stunting model
    stunting_model = RandomForestClassifier(n_estimators=100, random_state=42, max_depth=10)
    stunting_model.fit(X_train, y_stunting_train)
    
    # Train Wasting model
    wasting_model = RandomForestClassifier(n_estimators=100, random_state=42, max_depth=10)
    wasting_model.fit(X_train, y_wasting_train)
    
    # Evaluate models
    stunting_pred = stunting_model.predict(X_test)
    wasting_pred = wasting_model.predict(X_test)
    
    print("\n=== MODEL EVALUATION ===")
    print("Stunting Model Accuracy:", accuracy_score(y_stunting_test, stunting_pred))
    print("Wasting Model Accuracy:", accuracy_score(y_wasting_test, wasting_pred))
    
    return stunting_model, wasting_model

def save_models(stunting_model, wasting_model, gender_encoder, stunting_encoder, wasting_encoder, scaler):
    """Save all models and encoders"""
    joblib.dump(stunting_model, 'stunting_model.pkl')
    joblib.dump(wasting_model, 'wasting_model.pkl')
    joblib.dump(gender_encoder, 'gender_encoder.pkl')
    joblib.dump(stunting_encoder, 'stunting_encoder.pkl')
    joblib.dump(wasting_encoder, 'wasting_encoder.pkl')
    joblib.dump(scaler, 'scaler.pkl')
    print("\nAll models and encoders saved successfully!")

def main():
    print("Starting model training...")
    
    # Load data
    df = load_and_explore_data()
    
    # Preprocess data
    X, y_stunting, y_wasting, gender_encoder, stunting_encoder, wasting_encoder, scaler = preprocess_data(df)
    
    # Train models
    stunting_model, wasting_model = train_models(X, y_stunting, y_wasting)
    
    # Save everything
    save_models(stunting_model, wasting_model, gender_encoder, stunting_encoder, wasting_encoder, scaler)
    
    print("\n=== TRAINING COMPLETED ===")
    print("Files created:")
    print("- stunting_model.pkl")
    print("- wasting_model.pkl") 
    print("- gender_encoder.pkl")
    print("- stunting_encoder.pkl")
    print("- wasting_encoder.pkl")
    print("- scaler.pkl")
    print("\nYou can now run the Flask app with: python app.py")

if __name__ == "__main__":
    main()