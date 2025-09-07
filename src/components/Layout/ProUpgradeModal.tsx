import React from 'react'
import { X, Crown, Check, Zap, BarChart3, Shield, Headphones } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

interface ProUpgradeModalProps {
  isOpen: boolean
  onClose: () => void
}

const ProUpgradeModal: React.FC<ProUpgradeModalProps> = ({ isOpen, onClose }) => {
  const { upgradeToPro } = useAuth()

  if (!isOpen) return null

  const proFeatures = [
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Detailed reports, forecasting, and custom dashboards'
    },
    {
      icon: Zap,
      title: 'Automation Workflows',
      description: 'Automated lead scoring, email sequences, and task assignments'
    },
    {
      icon: Shield,
      title: 'Enhanced Security',
      description: 'Advanced encryption, audit logs, and compliance features'
    },
    {
      icon: Headphones,
      title: 'Priority Support',
      description: '24/7 dedicated support with 1-hour response time'
    }
  ]

  const handleUpgrade = async () => {
    await upgradeToPro()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3 mb-4">
            <Crown className="w-8 h-8 text-yellow-300" />
            <h2 className="text-3xl font-bold">Upgrade to CRM Pro</h2>
          </div>
          
          <p className="text-purple-100 text-lg">
            Unlock powerful features to supercharge your sales process
          </p>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {proFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="flex items-start space-x-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                $29<span className="text-lg text-gray-600">/month</span>
              </div>
              <p className="text-gray-600 mb-4">Everything you need to scale your business</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Unlimited contacts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Advanced reporting</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>API access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Custom integrations</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Maybe Later
            </button>
            <button
              onClick={handleUpgrade}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
            >
              <Crown className="w-5 h-5" />
              <span>Upgrade Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProUpgradeModal