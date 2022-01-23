import { StrictMode } from 'react';
import { render } from 'react-dom';

import { App } from './components/app';
import './index.css';

render(
    <StrictMode>
        <App></App>
    </StrictMode>,
    document.getElementById('root'),
);
