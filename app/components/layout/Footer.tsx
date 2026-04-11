"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  MapPin, 
  Phone, 
  Mail, 

  HelpCircle,
  FileText,
  Shield,
  Download,

  ChevronDown,
  ChevronUp
} from "lucide-react"

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Become a Tasker", href: "/tasker/onboarding" },
  { name: "Contact", href: "/contact" }
]

const taskerLinks = [
  { name: "Apply as Tasker", href: "/tasker/onboarding" },
  { name: "Create Service", href: "/tasker/services" },
  { name: "Manage Requests", href: "/tasker/requests" }
]

const supportLinks = [
  { name: "Help Center", href: "/help", icon: HelpCircle },
  { name: "Terms & Conditions", href: "/terms", icon: FileText },
  { name: "Privacy Policy", href: "/privacy", icon: Shield }
]

const socialLinks = [
  { name: "Twitter", href: "#", color: "hover:text-blue-400" },
  { name: "LinkedIn", href: "#", color: "hover:text-blue-600" },
  { name: "Facebook", href: "#", color: "hover:text-blue-500" }
]

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Link href="/" className="inline-block">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Service<span className="text-primary">Link</span>
                </h3>
              </Link>
              <p className="text-gray-300 leading-relaxed mb-6">
                Connecting clients with trusted professionals, fast and securely.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center text-gray-400">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">Addis Ababa, Ethiopia</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Phone className="h-4 w-4 mr-2" />
                  <span className="text-sm">+251 123 4567</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="text-sm">support@servicelink.com</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className={`text-gray-400 hover:text-white transition-colors ${social.color}`}
                  aria-label={social.name}
                >
                  <span className="sr-only">{social.name}</span>
                  <div className="w-5 h-5 bg-gray-700 rounded"></div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Taskers */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">For Taskers</h4>
              <button
                onClick={() => toggleSection('tasker')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {openSection === 'tasker' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
            
            <div className={`space-y-2 overflow-hidden transition-all duration-300 ${openSection === 'tasker' ? 'max-h-48' : 'max-h-0'}`}>
              {taskerLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">Support</h4>
              <button
                onClick={() => toggleSection('support')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {openSection === 'support' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
            
            <div className={`space-y-2 overflow-hidden transition-all duration-300 ${openSection === 'support' ? 'max-h-48' : 'max-h-0'}`}>
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm flex items-center"
                  >
                    {link.icon && <link.icon className="h-4 w-4 mr-2" />}
                    {link.name}
                  </Link>
                </li>
              ))}
            </div>
          </div>

          {/* Warnings Section */}
     
        </div>

        {/* Get the App Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Get the App
              </h3>
              <p className="text-gray-300 mb-6 text-lg">
                Manage jobs, accept requests, and get paid — anytime, anywhere.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="#"
                  className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download on App Store
                </Link>
                <a
                  href="#"
                  className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Get it on Google Play
                </a>
              </div>
            </div>
            
           
       
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2026 Ethio Smart Service Link. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
