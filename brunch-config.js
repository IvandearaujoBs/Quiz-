// brunch-config.js
module.exports = {
  files: {
    javascripts: {
      joinTo: 'app.js'
    },
    stylesheets: {
      joinTo: 'app.css'
    }
  },
  paths: {
    watched: ['js', 'css'],
    public: 'public'
  }
};