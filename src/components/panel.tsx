/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu, MenuItem, Paper, Typography } from '@mui/material';
import { memo, useCallback, useRef, useState } from 'react';

import { Chart } from '~/components/chart';
import { dragClassName } from '~/data/panel';
import { PanelConfig } from '~/types/panel';

export interface PanelProps {
    config: PanelConfig;
    onDelete: () => void;
}

const _Panel = (props: PanelProps) => {
    const { config, onDelete } = props;

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLButtonElement>(null);

    const toggleMenu = useCallback(() => {
        setMenuOpen(open => !open);
    }, [setMenuOpen]);

    const onMenuClose = useCallback(() => {
        setMenuOpen(false);
    }, [setMenuOpen]);

    const panelCss = css`
        display: flex;
        flex-direction: column;
        height: 100%;
    `;

    const headerCss = css`
        display: flex;
        align-items: center;
    `;

    const titleCss = css`
        flex: 1 0;
        align-self: stretch;
        display: flex;
        align-items: center;
        cursor: move;
        width: 0;
        padding: 8px 8px 8px 16px;
    `;

    const menuCss = css`
        padding: 8px 8px 8px 0;
    `;

    const chartCss = css`
        flex: 1 0;
        height: 0;
    `;

    return (
        <Paper css={panelCss} elevation={2}>
            <div css={headerCss}>
                <div css={titleCss} className={dragClassName}>
                    <Typography variant="subtitle1" noWrap>
                        {config.title}
                    </Typography>
                </div>
                <div css={menuCss}>
                    <IconButton ref={menuRef} onClick={toggleMenu}>
                        <MoreVert></MoreVert>
                    </IconButton>
                    <Menu
                        anchorEl={menuRef.current}
                        onClose={onMenuClose}
                        open={menuOpen}
                        variant="menu"
                    >
                        <MenuItem>Edit</MenuItem>
                        <MenuItem onClick={onDelete}>Delete</MenuItem>
                    </Menu>
                </div>
            </div>
            <div css={chartCss}>
                <Chart panel={config}></Chart>
            </div>
        </Paper>
    );
};

export const Panel = memo(_Panel);
