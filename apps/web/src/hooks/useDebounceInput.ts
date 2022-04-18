import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useCallback,
    useState,
} from "react";
import { debounce } from "lodash";

const useDebounceInput = (
    initialValue: string
): [
    string,
    Dispatch<SetStateAction<string>>,
    (event: ChangeEvent<HTMLInputElement>) => void,
    string
] => {
    const [state, setState] = useState<string>(initialValue);
    const [debounceState, setDebounceState] = useState<string>(initialValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSetState = useCallback(debounce(setDebounceState, 1000), []);

    const handleSetState = useCallback(
        (value: SetStateAction<string>) => {
            setState(value);
            debouncedSetState(value);
        },
        [debouncedSetState]
    );

    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            handleSetState(event.target.value);
        },
        [handleSetState]
    );

    return [debounceState, handleSetState, handleChange, state];
};

export default useDebounceInput;
