/** @jsxImportSource @emotion/react */

import {
    Autocomplete as MuiAutocomplete,
    AutocompleteRenderInputParams,
    TextField as MuiTextfield,
    TextFieldProps as MuiTextfieldProps,
} from '@mui/material';
import { memo, useCallback } from 'react';

import { textfieldCss } from './textfield';

export interface AutocompleteProps {
    label: string;
    onChange?: ((value?: string) => void) | undefined;
    options: readonly string[];
    value?: string | undefined;
}

const _Autocomplete = (props: AutocompleteProps) => {
    const { label, options, onChange, value } = props;

    const renderInput = useCallback(
        (params: AutocompleteRenderInputParams) => (
            <MuiTextfield
                {...(params as MuiTextfieldProps)}
                css={textfieldCss}
                label={label}
            ></MuiTextfield>
        ),
        [label],
    );

    const muiOnChange = useCallback(
        (_event: unknown, value: string | null) => {
            onChange?.(value ?? undefined);
        },
        [onChange],
    );

    return (
        <MuiAutocomplete
            renderInput={renderInput}
            options={options}
            onChange={muiOnChange}
            value={value ?? null}
        ></MuiAutocomplete>
    );
};

export const Autocomplete = memo(_Autocomplete);
