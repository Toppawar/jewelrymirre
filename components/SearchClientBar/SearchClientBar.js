import { useState, useEffect, useMemo, useCallback } from 'react';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useDebouncedCallback } from 'use-debounce';

import { searchClient } from '../../actions/clients';


const SearchClientBar = ({
    type = 'firstName',
    searchClient,
    onSelect,
    onModalOpen,
    clearValue,
}) => {

    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [inputText, setInputText] = useState('');
    const loading = useMemo(
        () => open && options.length === 0
        , [open, options]
    );

    useEffect(
        () => {
            if (!open) {
                setOptions([]);
            }
        }, [open, setOptions]
    )

    useEffect(
        () => {
            onModalOpen(open)
        }, [open]
    )

    useEffect(
        () => {
            if (clearValue) {
                setInputText('');
            }
        }, [clearValue, setInputText]
    );

    const debounced = useDebouncedCallback(
        (event) => {
            const { target: { value } } = event;
            searchClient({
                type,
                query: value,
            })
                .then((options) => setOptions(options))
                .catch((error) => console.error(error))
        }, 1000
    )

    const toggleAutocomplete = useCallback(
        () => {
            setOpen(prevState => !prevState)
        }, [setOpen]
    );

    const handleOptionChange = useCallback(
        (_, value) => {
            onSelect(value);
            setInputText(value ? `${value[type]} - ${value.email}` : '')
        }, [setInputText]
    );

    const handleInputTextChange = useCallback(
        (event) => {
            const { target: { value } } = event;
            setInputText(value)
        }, [setInputText]
    );

    return (
        <Autocomplete
            id="search-bar"
            style={{ width: 400 }}
            open={open}
            onOpen={toggleAutocomplete}
            onClose={toggleAutocomplete}
            getOptionSelected={(option, value) => option[type] === value[type]}
            getOptionLabel={(option) => `${option[type]} - ${option.email}`}
            options={options}
            loading={loading}
            // inputValue=""
            loadingText="Cargando..."
            onChange={handleOptionChange}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Buscador de clientes"
                    variant="outlined"
                    onChange={(event) => debounced.callback(event)}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                    inputProps={{
                        ...params.inputProps,
                        onChange: handleInputTextChange,
                        value: inputText,
                    }}
                />
            )
            }
        />
    )
}

const mapDispatchToProps = {
    searchClient,
};


export default connect(undefined, mapDispatchToProps)(SearchClientBar);