import debounce from "lodash/debounce"
import { useState, useCallback, useEffect } from "react"

// Util to convert dot path into slash path: eg: address.country <-> /address/country
export const resolvePathToRoute = ( path ) => {
    return '/' + path.split( '.' ).join( '/' );
}

export const resolveRouteToPath = ( route ) => {
    return route.slice( 1 ).split( '/' ).join( '.' );
}

const eventToValue = ev => ev.target.value
export const useDebouncedChange = (
	handleChange,
	defaultValue,
	data,
	path,
	eventToValueFunction = eventToValue,
	timeout = 300
) => {
	const [input, setInput] = useState(data ?? defaultValue)
	useEffect(() => {
		setInput(data ?? defaultValue)
	}, [data])
	const debouncedUpdate = useCallback(
		debounce(newValue => handleChange(path, newValue), timeout),
		[handleChange, path, timeout]
	)
	const onChange = useCallback(
		ev => {
		const newValue = eventToValueFunction(ev)
		setInput(newValue ?? defaultValue)
		debouncedUpdate(newValue)
		},
		[debouncedUpdate, eventToValueFunction]
	)
	const onClear = useCallback(() => {
		setInput(defaultValue)
		handleChange(path, undefined)
	}, [defaultValue, handleChange, path])
	return [input, onChange, onClear]
}
