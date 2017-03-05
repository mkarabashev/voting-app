const path = require('path');

module.exports = {
  root: path.join(process.cwd(), 'src'),
  styles: path.join(process.cwd(), 'src', 'styles'),
  dist: path.join(process.cwd(), 'dist'),
  public: '/public/'
};
