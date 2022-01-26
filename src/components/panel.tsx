import { Menu, MenuItem } from '@mui/material';
import { memo, useCallback, useRef, useState } from 'react';

import { PanelEditorPreview } from '~/components/panel-editor-preview';
import { PanelConfig } from '~/types/panel';

export interface PanelProps {
    config: PanelConfig;
    onDelete?: () => void;
    onEdit?: () => void;
}

const _Panel = (props: PanelProps) => {
    const { config, onDelete, onEdit } = props;

    const [menuOpen, setMenuOpen] = useState(false);
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    const toggleMenu = useCallback(() => {
        setMenuOpen(open => !open);
    }, [setMenuOpen]);

    const onMenuClose = useCallback(() => {
        setMenuOpen(false);
    }, [setMenuOpen]);

    return (
        <>
            <PanelEditorPreview
                config={config}
                menuButtonRef={menuButtonRef}
                onMenuButtonClick={toggleMenu}
            ></PanelEditorPreview>
            <Menu
                anchorEl={menuButtonRef.current}
                onClose={onMenuClose}
                open={menuOpen}
                variant="menu"
            >
                <MenuItem onClick={onEdit}>Edit</MenuItem>
                <MenuItem onClick={onDelete}>Delete</MenuItem>
            </Menu>
        </>
    );
};

export const Panel = memo(_Panel);
