/** Matches RolesGuard: any requested role suffices; admin is not an implicit wildcard. */
export function hasAnyRole(
    roles: readonly string[],
    allowedRoles: readonly string[],
): boolean {
    return (
        allowedRoles.length === 0 ||
        allowedRoles.some((role) => roles.includes(role))
    )
}

export function hasAllRoles(
    roles: readonly string[],
    requiredRoles: readonly string[],
): boolean {
    return requiredRoles.every((role) => roles.includes(role))
}
