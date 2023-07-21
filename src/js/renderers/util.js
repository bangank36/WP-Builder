// Util to convert dot path into slash path: eg: address.country <-> /address/country
export const resolvePathToRoute = ( path ) => {
    return '/' + path.split( '.' ).join( '/' );
}

export const resolveRouteToPath = ( route ) => {
    return route.slice( 1 ).split( '/' ).join( '.' );
}
