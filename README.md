# Stuntify - Stunting Detection Web Application

## About the Project

Stuntify is a web application designed to detect and provide recommendations for stunting in children. This application uses machine learning models to analyze growth data and provide personalized recommendations.

## Technology Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, JavaScript
- **Module Bundling**: Webpack 
- **Machine Learning**: Scikit-learn

## Webpack Integration

This project uses Webpack for modern frontend asset management. Benefits include:

- **Modular JavaScript**: Code split into reusable modules
- **CSS Processing**: Structured CSS organization with component-based approach
- **Asset Optimization**: Minification and optimization of assets for production
- **Development Experience**: Hot reloading during development

### Project Structure

```
src/
  ├── css/
  │   ├── components/      # Reusable UI component styles
  │   ├── pages/           # Page-specific styles
  │   ├── main.css         # Global styles and imports
  │   ├── articel.css      # Article page entry point
  │   └── stunting.css     # Stunting page entry point
  │
  └── js/
      ├── modules/         # Reusable JavaScript modules
      ├── index.js         # Home page entry point
      ├── articel.js       # Article page entry point
      └── stunting.js      # Stunting page entry point
```

## Development Setup

### Prerequisites

- Python 3.8+
- Node.js and npm

### Installation

1. Clone the repository
2. Install Python dependencies:
```
pip install -r requirements.txt
```
3. Install Node.js dependencies:
```
npm install
```

### Running the Application

For development with hot-reloading:
```
start-dev.bat
```

This will start both the Flask server (port 5000) and Webpack dev server (port 3000).

### Building for Production

```
npm run build
```

This will generate optimized assets in the `static/dist` folder.

## Project Structure

- `app.py`: Main Flask application
- `webpack.config.js`: Webpack configuration
- `src/`: Source files for JavaScript and CSS
- `static/`: Static assets and compiled files
- `templates/`: HTML templates
