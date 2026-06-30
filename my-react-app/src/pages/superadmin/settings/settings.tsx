import { useState } from 'react'
import { PageHdr } from '../../../components/layoutSA/PageHdr'
import { Btn } from '../../../components/common/Button'
import { Card, CardHead, CardBody } from '../../../components/common/Card'

const tabs = ['General', 'Branding', 'Security', 'Email', 'Integrations']

export default function Settings() {
  const [activeTab, setActiveTab] = useState('General')

  return (
    <div className="space-y-5">
      <PageHdr title="Settings" subtitle="Configure platform-wide settings" />

      <div className="flex gap-1 border-b border-border pb-0.5">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-medium rounded-t-lg transition-colors ${
              activeTab === tab
                ? 'bg-white text-[#1A3C5E] border border-border border-b-white -mb-px'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <Card>
        <CardHead><h3 className="text-sm font-semibold text-foreground">{activeTab} Settings</h3></CardHead>
        <CardBody className="space-y-4">
          {activeTab === 'General' && (
            <>
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">Platform Name</label>
                <input className="w-full max-w-md px-3 py-2 text-sm bg-white border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-[#2E86AB]/25 focus:border-[#2E86AB] transition-colors" defaultValue="StayEasy" />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">Support Email</label>
                <input className="w-full max-w-md px-3 py-2 text-sm bg-white border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-[#2E86AB]/25 focus:border-[#2E86AB] transition-colors" defaultValue="support@stayeasy.io" />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">Default Timezone</label>
                <select className="w-full max-w-md px-3 py-2 text-sm bg-white border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-[#2E86AB]/25 cursor-pointer">
                  <option>UTC (Coordinated Universal Time)</option>
                  <option>America/New_York (EST)</option>
                  <option>Asia/Kathmandu (NPT +05:45)</option>
                </select>
              </div>
            </>
          )}
          {activeTab === 'Security' && (
            <>
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">Session Timeout (minutes)</label>
                <input type="number" className="w-full max-w-xs px-3 py-2 text-sm bg-white border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-[#2E86AB]/25 focus:border-[#2E86AB] transition-colors" defaultValue={60} />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">Max Login Attempts</label>
                <input type="number" className="w-full max-w-xs px-3 py-2 text-sm bg-white border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-[#2E86AB]/25 focus:border-[#2E86AB] transition-colors" defaultValue={5} />
              </div>
            </>
          )}
          {(activeTab === 'Branding' || activeTab === 'Email' || activeTab === 'Integrations') && (
            <p className="text-sm text-muted-foreground">{activeTab} settings will be available in the next update.</p>
          )}
          <div className="pt-2">
            <Btn variant="primary">Save Changes</Btn>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
