import { defineAbilityFor } from '@saas/auth'

const ability = defineAbilityFor({ role: 'MEMBER', id: 'user-id' })

const userCanInviteSomeoneElse = ability.can('get', 'User')
const userCanDeleteOtherUser = ability.can('delete', 'User')

console.log(userCanInviteSomeoneElse)
console.log('userCanDeleteOtherUser:', userCanDeleteOtherUser)
