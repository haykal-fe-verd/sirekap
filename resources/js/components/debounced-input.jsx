import React from "react";
import { Input } from "./ui/input";

function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}) {
    const [value, setValue] = React.useState(initialValue);

    React.useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounce);

        return () => clearTimeout(timeout);
    }, [value]);

    return (
        <Input
            {...props}
            type="search"
            value={value}
            placeholder="Cari data..."
            onChange={(e) => setValue(e.target.value)}
        />
    );
}

export default DebouncedInput;
