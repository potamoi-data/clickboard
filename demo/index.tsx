import { Global, css } from '@emotion/react';
import { StrictMode } from 'react';
import { render } from 'react-dom';

import { App } from './pages/app';

const globalCss = css`
    html,
    body,
    #root {
        height: 100%;
    }
    body {
        margin: 0;
    }
`;

render(
    <StrictMode>
        <Global styles={globalCss}></Global>
        <App></App>
    </StrictMode>,
    document.getElementById('root'),
);
