import { PageHdr } from '../../../components/layoutSA/PageHdr'
import { Btn } from '../../../components/common/Button'
import { Badge } from '../../../components/ui/Badge'
import { Card, CardHead, CardBody } from '../../../components/common/Card'
import { roleData } from '../_data/mockData'

export default function RolesPermissions() {
  return (
    <div className="space-y-5">
      <PageHdr
        title="Roles & Permissions"
        subtitle="Manage admin roles and their platform access levels"
        action={<Btn variant="accent" size="sm">+ Add Role</Btn>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {roleData.map(role => (
          <Card key={role.name}>
            <CardBody>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${role.color}18` }}>
                  <div className="w-5 h-5 rounded-full" style={{ backgroundColor: role.color }} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{role.name}</h3>
                  <p className="text-xs text-muted-foreground">{role.users} users</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{role.description}</p>
              <div className="flex items-center justify-between">
                <Badge variant={role.permissions === 'All' ? 'info' : role.permissions === 'Most' ? 'default' : role.permissions === 'Read-only' ? 'muted' : role.permissions === 'Audit' ? 'warning' : 'muted'}>
                  {role.permissions}
                </Badge>
                <Btn variant="ghost" size="sm">Edit</Btn>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}
