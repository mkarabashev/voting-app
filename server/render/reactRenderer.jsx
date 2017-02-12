import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext } from 'react-router';
import AppRouter from '../../src/router';

module.exports = props => renderToString(<RouterContext {...props} />);
