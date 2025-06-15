# Stuntify - Developer Guide

## Working with the Webpack Setup

This guide provides information for developers on how to work with the new Webpack-based frontend setup for the Stuntify application.

## Getting Started

### First-time setup

1. Make sure you have Node.js and npm installed
2. Install dependencies:
   ```
   npm install
   ```

### Development Workflow

1. Start the development servers:
   ```
   .\start-dev.bat
   ```
   
   This will start both:
   - Flask server at http://localhost:5000
   - Webpack dev server at http://localhost:3000

2. Make changes to files in the `src/` directory:
   - JavaScript files in `src/js/`
   - CSS files in `src/css/`

3. The browser will automatically reload when you save changes

### Building for Production

Run the production build:
```
npm run build
```

This will generate optimized files in the `static/dist/` directory.

## Project Structure Guide

### JavaScript Files

- **Entry Points**:
  - `src/js/index.js`: Home page
  - `src/js/articel.js`: Article listing page
  - `src/js/stunting.js`: Stunting calculator page

- **Modules**: Reusable functions are in `src/js/modules/`
  - Example: `src/js/modules/navbar-scroll.js`

### CSS Files

- **Main Stylesheets**:
  - `src/css/main.css`: Global styles shared across the app
  - `src/css/articel.css`: Article page styles
  - `src/css/stunting.css`: Stunting calculator styles

- **Component Styles**: Reusable UI component styles
  - `src/css/components/navbar.css`
  - `src/css/components/footer.css`
  - `src/css/components/forms.css`

- **Page-Specific Styles**:
  - `src/css/pages/index.css`
  - `src/css/pages/articel.css`
  - `src/css/pages/stunting.css`
  - `src/css/pages/responsive.css`

### Adding New Pages

1. Create a new entry point JS file in `src/js/`
2. Add the entry point to `webpack.config.js`
3. Create a corresponding CSS file if needed
4. Update the HTML template to reference the new bundled files

### Adding New Components

1. Create component CSS in `src/css/components/`
2. Import the component CSS in the relevant main CSS file
3. If needed, create component JS in `src/js/components/`
4. Import and use the component in your entry point JS file

## Best Practices

1. **Modular Code**: Keep components and functionality modular
2. **CSS Organization**: Use the component-based approach
3. **Asset Management**: Place new images in the `static/img/` directory
4. **Documentation**: Document new components and functionality
5. **Testing**: Test your changes before committing

## Common Issues

### Missing Module

If you get an error about a missing module, check that:
- The import path is correct
- The module exists in the specified location
- You've installed all required npm packages

### CSS Not Applying

If your CSS changes aren't showing:
- Make sure you're importing the CSS in the correct entry point
- Check that the bundle is correctly referenced in the HTML template
- Try clearing your browser cache

### Webpack Build Errors

If you encounter build errors:
- Check the console output for specific error messages
- Validate your JavaScript and CSS syntax
- Make sure all required dependencies are installed

## Resources

- [Webpack Documentation](https://webpack.js.org/concepts/)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [Flask Documentation](https://flask.palletsprojects.com/)
