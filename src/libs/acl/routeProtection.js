import ability from './ability'

export const canNavigate = to => to.matched.some(route => ability.can(route.meta.action || 'read', route.meta.resource))
// export const canNavigate = to => to.matched.some(route => ability.can(route.meta.role || 'read', 'all'))

export const _ = undefined
