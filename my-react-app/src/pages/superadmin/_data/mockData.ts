export const revenueData = [
  { month: 'Baisakh', revenue: 8240000, mrr: 7650000 },
  { month: 'Jestha', revenue: 8980000, mrr: 8120000 },
  { month: 'Asar', revenue: 9470000, mrr: 8600000 },
  { month: 'Shrawan', revenue: 10460000, mrr: 9560000 },
  { month: 'Bhadra', revenue: 11100000, mrr: 10420000 },
  { month: 'Asoj', revenue: 12090000, mrr: 11130000 },
]

export const tenantsByPlan = [
  { name: 'Starter', value: 89, color: '#93C5FD' },
  { name: 'Professional', value: 112, color: '#2E86AB' },
  { name: 'Enterprise', value: 46, color: '#1A3C5E' },
]

export const ticketVolumeData = [
  { day: 'Mon', open: 12, resolved: 18 },
  { day: 'Tue', open: 8, resolved: 14 },
  { day: 'Wed', open: 15, resolved: 11 },
  { day: 'Thu', open: 6, resolved: 20 },
  { day: 'Fri', open: 19, resolved: 15 },
  { day: 'Sat', open: 4, resolved: 7 },
  { day: 'Sun', open: 2, resolved: 3 },
]

export interface Tenant {
  id: string; name: string; domain: string; plan: string; status: string
  rooms: number; arr: string; joined: string; owner: string
}

export const tenantData: Tenant[] = [
  { id: 'T-001', name: 'Hotel Himalaya Pvt. Ltd.', domain: 'hotelhimalaya.com', plan: 'Enterprise', status: 'Active', rooms: 847, arr: 'Rs. 63,36,000', joined: 'Baisakh 12, 2079', owner: 'Ramesh Adhikari' },
  { id: 'T-002', name: 'Pokhara Lakeview Resort', domain: 'pokharalakeview.com', plan: 'Professional', status: 'Active', rooms: 312, arr: 'Rs. 23,76,000', joined: 'Falgun 5, 2079', owner: 'Sita Sharma' },
  { id: 'T-003', name: 'Nagarkot Heights Hotel', domain: 'nagarkotheights.com', plan: 'Professional', status: 'Active', rooms: 198, arr: 'Rs. 23,76,000', joined: 'Baisakh 22, 2079', owner: 'Binod Thapa' },
  { id: 'T-004', name: 'Chitwan Safari Inn', domain: 'chitwansafari.com', plan: 'Starter', status: 'Trial', rooms: 54, arr: 'Rs. 3,16,800', joined: 'Jestha 1, 2081', owner: 'Anita Gurung' },
  { id: 'T-005', name: 'Lumbini Garden Lodge', domain: 'lumbinigarden.com', plan: 'Starter', status: 'Active', rooms: 87, arr: 'Rs. 3,16,800', joined: 'Bhadra 8, 2080', owner: 'Prakash Neupane' },
  { id: 'T-006', name: 'Everest View Suites', domain: 'everestview.com', plan: 'Enterprise', status: 'Active', rooms: 1203, arr: 'Rs. 63,36,000', joined: 'Mangsir 14, 2079', owner: 'Kamala Devi' },
  { id: 'T-007', name: 'Mustang Sky Hotel', domain: 'mustangsky.com', plan: 'Starter', status: 'Suspended', rooms: 34, arr: 'Rs. 3,16,800', joined: 'Falgun 28, 2080', owner: 'Rajendra Poudel' },
  { id: 'T-008', name: 'Bardia Jungle Resort', domain: 'bardiajungle.com', plan: 'Professional', status: 'Active', rooms: 267, arr: 'Rs. 23,76,000', joined: 'Shrawan 19, 2080', owner: 'Deepa Tamang' },
]

export interface Ticket {
  id: string; subject: string; tenant: string; priority: string; status: string
  created: string; assignee: string
}

export const ticketData: Ticket[] = [
  { id: '#4521', subject: 'बिलिङ एक्सपोर्ट PDF जेनरेट गर्न सकेन', tenant: 'Hotel Himalaya Pvt. Ltd.', priority: 'High', status: 'Open', created: '२ घण्टा अघि', assignee: 'Sophie L.' },
  { id: '#4520', subject: 'रेट प्यारिटी सिङ्क रातिको जबमा फेल', tenant: 'Pokhara Lakeview Resort', priority: 'Critical', status: 'In Progress', created: '४ घण्टा अघि', assignee: 'Dev Team' },
  { id: '#4519', subject: 'गेस्ट पोर्टल कस्टम डोमेन सेटअप', tenant: 'Nagarkot Heights Hotel', priority: 'Medium', status: 'Open', created: '६ घण्टा अघि', assignee: 'Unassigned' },
  { id: '#4518', subject: 'रिभेन्यु रिपोर्टमा मंसिरको डाटा छैन', tenant: 'Everest View Suites', priority: 'High', status: 'Open', created: '१ दिन अघि', assignee: 'Alex M.' },
  { id: '#4517', subject: 'SAML २.० को लागि SSO कन्फिगरेसन', tenant: 'Bardia Jungle Resort', priority: 'Low', status: 'Resolved', created: '२ दिन अघि', assignee: 'Sophie L.' },
  { id: '#4516', subject: 'च्यानल म्यानेजर API रेट लिमिट एक्सिडेड', tenant: 'Lumbini Garden Lodge', priority: 'Medium', status: 'Resolved', created: '३ दिन अघि', assignee: 'Dev Team' },
]

export interface AuditEntry {
  id: number; action: string; user: string; resource: string
  timestamp: string; ip: string; status: string
}

export const auditData: AuditEntry[] = [
  { id: 1, action: 'टेनन्ट प्लान अपग्रेड', user: 'admin@stayeasy.io', resource: 'Tenant T-002', timestamp: '२०८१ असार १४, १४:३२:११', ip: '192.168.1.1', status: 'Success' },
  { id: 2, action: 'फिचर फ्ल्याग सक्षम गरियो', user: 'admin@stayeasy.io', resource: 'advanced_analytics', timestamp: '२०८१ असार १४, १३:१८:४४', ip: '192.168.1.1', status: 'Success' },
  { id: 3, action: 'प्रशासक भूमिका तोकियो', user: 'ops@stayeasy.io', resource: 'User u-9821', timestamp: '२०८१ असार १४, ११:५४:२२', ip: '10.0.0.45', status: 'Success' },
  { id: 4, action: 'टेनन्ट निलम्बित', user: 'admin@stayeasy.io', resource: 'Tenant T-007', timestamp: '२०८१ असार १४, १०:०२:०९', ip: '192.168.1.1', status: 'Success' },
  { id: 5, action: 'बल्क एक्सपोर्ट ट्रिगर', user: 'reports@stayeasy.io', resource: 'सबै टेनन्ट', timestamp: '२०८१ असार १४, ०९:३०:००', ip: '10.0.0.12', status: 'Success' },
  { id: 6, action: 'लगइन प्रयास असफल', user: 'unknown@external.com', resource: 'Auth', timestamp: '२०८१ असार १४, ०८:४४:१७', ip: '203.45.67.89', status: 'Failed' },
  { id: 7, action: 'इनभ्वाइस जेनरेट', user: 'billing@stayeasy.io', resource: 'Invoice INV-2847', timestamp: '२०८१ असार १३, २३:००:००', ip: '10.0.0.12', status: 'Success' },
]

export interface FeatureFlag {
  name: string; description: string; status: boolean
  tier: string; rollout: string; modified: string
}

export const featureFlagData: FeatureFlag[] = [
  { name: 'advanced_analytics', description: 'भविष्यवाणी सहितको उन्नत ड्यासबोर्ड', status: true, tier: 'Enterprise', rollout: '100%', modified: 'Jun 15' },
  { name: 'ai_rate_optimization', description: 'AI-संचालित गतिशील मूल्य निर्धारण इन्जिन', status: true, tier: 'Enterprise', rollout: '80%', modified: 'Jun 22' },
  { name: 'channel_manager_v2', description: 'अर्को-पुस्ताको OTA च्यानल वितरण एकीकरण', status: false, tier: 'Professional', rollout: '0%', modified: 'Jun 10' },
  { name: 'guest_messaging_hub', description: 'सबै अतिथि सञ्चारको लागि एकीकृत इनबक्स', status: true, tier: 'Professional', rollout: '100%', modified: 'May 30' },
  { name: 'revenue_forecasting', description: '३०/६०/९० दिनको राजस्व प्रक्षेपण मोडेल', status: true, tier: 'Enterprise', rollout: '60%', modified: 'Jun 28' },
  { name: 'white_label_portal', description: 'पूर्ण ब्रान्डेबल अतिथि बुकिङ पोर्टल', status: false, tier: 'Enterprise', rollout: '0%', modified: 'Jun 1' },
  { name: 'sso_saml', description: 'SAML २.० एकल साइन-अन इन्टरप्राइज टेनन्टका लागि', status: true, tier: 'Enterprise', rollout: '100%', modified: 'Apr 12' },
  { name: 'api_webhooks_v2', description: 'पुनः प्रयास तर्क सहितको उन्नत वेबहुक डेलिभरी', status: true, tier: 'Professional', rollout: '100%', modified: 'May 18' },
]

export interface Announcement {
  id: number; title: string; type: string; status: string; audience: string; sent: string
}

export const announcementData: Announcement[] = [
  { id: 1, title: 'अनुसूचित मर्मत: असार ३०, २:००–४:०० बजे राति', type: 'Maintenance', status: 'Scheduled', audience: 'सबै टेनन्ट', sent: 'असार २९, २०८१' },
  { id: 2, title: 'नयाँ फिचर: AI रेट अप्टिमाइजेसन अब उपलब्ध', type: 'Feature Release', status: 'Published', audience: 'Enterprise', sent: 'असार २२, २०८१' },
  { id: 3, title: 'StayEasy प्लेटफर्म v४.२ रिलिज नोट्स', type: 'Release Notes', status: 'Published', audience: 'सबै टेनन्ट', sent: 'असार १५, २०८१' },
  { id: 4, title: 'मूल्य समायोजन: साउन १, २०८१ देखि लागू', type: 'Billing', status: 'Draft', audience: 'Starter Plan', sent: '—' },
]

export interface Role {
  name: string; description: string; users: number; permissions: string; color: string
}

export const roleData: Role[] = [
  { name: 'Super Admin', description: 'सबै प्रशासनिक अधिकार सहितको पूर्ण पहुँच', users: 3, permissions: 'All', color: '#1A3C5E' },
  { name: 'Operations', description: 'टेनन्ट, सदस्यता र सपोर्ट टिकट व्यवस्थापन', users: 8, permissions: 'Most', color: '#2E86AB' },
  { name: 'Billing Admin', description: 'बिलिङ, इनभ्वाइस र वित्तीय रिपोर्टहरूमा पहुँच', users: 4, permissions: 'Financial', color: '#059669' },
  { name: 'Support Agent', description: 'टेनन्ट हेर्ने र सपोर्ट टिकट क्यू व्यवस्थापन', users: 12, permissions: 'Limited', color: '#D97706' },
  { name: 'Analyst', description: 'एनालिटिक्स र रिपोर्टमा रिड-अन्ली पहुँच', users: 6, permissions: 'Read-only', color: '#7C3AED' },
  { name: 'Auditor', description: 'अडिट लग र कम्प्लायन्स रिपोर्टहरूमा पहुँच', users: 2, permissions: 'Audit', color: '#DC2626' },
]

export const kpiData = {
  totalTenants: '247',
  activeTenants: '198',
  activeRate: '८०.२%',
  mrr: 'Rs. १,११,३०,०००',
  mrrChange: '+९.४%',
  mrrTrend: 'up' as const,
  uptime: '९९.८७%',
  tenantChange: '+१२ यो महिना',
  tenantTrend: 'up' as const,
}
