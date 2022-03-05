import { Checkbox as MuiCheckbox, FormControlLabel } from '@mui/material';
import { memo, useCallback } from 'react';

export interface CheckboxProps {
    checked?: boolean | undefined;
    label: string;
    onChange?: ((value: boolean) => void) | undefined;
}

const _Checkbox = (props: CheckboxProps) => {
    const { checked, label, onChange } = props;

    const muiOnChange = useCallback(
        (_event: unknown, value: boolean) => {
            onChange?.(value);
        },
        [onChange],
    );

    return (
        <FormControlLabel
            control={<MuiCheckbox checked={!!checked} onChange={muiOnChange}></MuiCheckbox>}
            label={label}
        ></FormControlLabel>
    );
};

export const Checkbox = memo(_Checkbox);
