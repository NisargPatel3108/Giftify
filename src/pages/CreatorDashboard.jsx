import React from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { Package, DollarSign, TrendingUp, Clock, Eye } from 'lucide-react'

const CreatorDashboard = () => {
  const stats = [
    { label: 'Total Gifts', value: '128', icon: Package, color: '#3B82F6' },
    { label: 'Earnings', value: '$4,250', icon: DollarSign, color: '#10B981' },
    { label: 'Pending', value: '12', icon: Clock, color: '#F59E0B' },
    { label: 'Fan Reach', value: '+15%', icon: TrendingUp, color: '#8B5CF6' },
  ]

  const recentGifts = [
    { id: 1, item: 'Sony A7III Camera', fan: 'Anonymous Fan', date: '2 mins ago', status: 'Pending', price: '$1,999' },
    { id: 2, item: 'Mechanical Keyboard', fan: '@tech_guy', date: '2 hours ago', status: 'Processing', price: '$149' },
    { id: 3, item: 'Custom Sneakers', fan: 'Sarah J.', date: '1 day ago', status: 'Delivered', price: '$250' },
    { id: 4, item: 'Gaming Mouse', fan: '@gamer123', date: '1 day ago', status: 'Delivered', price: '$89' },
  ]

  return (
    <DashboardLayout role="creator">
       {/* Stats Grid */}
       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
           {stats.map((stat, i) => {
               const Icon = stat.icon
               return (
                   <div key={i} style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                       <div style={{ width: 48, height: 48, borderRadius: '12px', background: `${stat.color}20`, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                           <Icon size={24} />
                       </div>
                       <div>
                           <div style={{ fontSize: '0.9rem', color: '#64748B' }}>{stat.label}</div>
                           <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A' }}>{stat.value}</div>
                       </div>
                   </div>
               )
           })}
       </div>

       {/* Recent Gifts Area */}
       <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '2rem' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
               <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Incoming Gifts</h2>
               <button className="btn-small" style={{ background: 'transparent', color: '#3B82F6' }}>View All</button>
           </div>
           
           <div style={{ overflowX: 'auto' }}>
               <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                   <thead>
                       <tr style={{ borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.9rem', textAlign: 'left' }}>
                           <th style={{ padding: '1rem 0', fontWeight: 500 }}>Item Name</th>
                           <th style={{ padding: '1rem 0', fontWeight: 500 }}>Sent By</th>
                           <th style={{ padding: '1rem 0', fontWeight: 500 }}>Value</th>
                           <th style={{ padding: '1rem 0', fontWeight: 500 }}>Status</th>
                           <th style={{ padding: '1rem 0', fontWeight: 500 }}>Action</th>
                       </tr>
                   </thead>
                   <tbody>
                       {recentGifts.map((gift) => (
                           <tr key={gift.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                               <td style={{ padding: '1rem 0', fontWeight: 600 }}>{gift.item}</td>
                               <td style={{ padding: '1rem 0', color: '#64748B' }}>{gift.fan}</td>
                               <td style={{ padding: '1rem 0' }}>{gift.price}</td>
                               <td style={{ padding: '1rem 0' }}>
                                   <span style={{ 
                                       padding: '4px 12px', 
                                       borderRadius: '99px', 
                                       fontSize: '0.8rem', 
                                       fontWeight: 600,
                                       background: gift.status === 'Pending' ? '#FEF3C7' : gift.status === 'Delivered' ? '#DCFCE7' : '#EFF6FF',
                                       color: gift.status === 'Pending' ? '#D97706' : gift.status === 'Delivered' ? '#16A34A' : '#3B82F6'
                                    }}>
                                       {gift.status}
                                   </span>
                               </td>
                               <td style={{ padding: '1rem 0' }}>
                                   <button className="btn-small" style={{ background: 'none', border: '1px solid #E2E8F0', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                       <Eye size={14} /> View
                                   </button>
                               </td>
                           </tr>
                       ))}
                   </tbody>
               </table>
           </div>
       </div>
    </DashboardLayout>
  )
}

export default CreatorDashboard
