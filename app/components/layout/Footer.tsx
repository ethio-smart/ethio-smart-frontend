"use client"

import Link from "next/link"
import Image from "next/image"
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"
import { useTranslations } from "next-intl"

export default function Footer() {
  const t = useTranslations()
  const footer = t.raw("footer") 
  
  // Add error handling for undefined footer
  // if (!footer) {
  //   console.error("Footer translations not found:", footer)
  //   return (
  //     <footer className="bg-gray-900 text-white">
  //       <div className="max-w-7xl mx-auto px-4 py-12">
  //         <div className="text-center text-white">
  //           <p>Error loading footer content</p>
  //         </div>
  //       </div>
  //     </footer>
  //   )
  // }



  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/seralink-removebg-preview.png"
                alt="Ethio Smart Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold">Ethio Smart</span>
            </div>
            
            <p className="text-gray-400 text-sm">
              {footer.company?.description || "Ethiopia's leading service marketplace"}
            </p>
            
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <Link key={i} href="#" className="text-gray-400 hover:text-white transition">
                  <Icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {footer.quickLinks?.title || "Quick Links"}
            </h3>
            
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="footer-link">
                  {footer.quickLinks?.about || "About Us"}
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="footer-link">
                  {footer.quickLinks?.howItWorks || "How It Works"}
                </Link>
              </li>
              <li>
                <Link href="/services" className="footer-link">
                  {footer.quickLinks?.services || "Services"}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="footer-link">
                  {footer.quickLinks?.pricing || "Pricing"}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="footer-link">
                  {footer.quickLinks?.blog || "Blog"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {footer.services?.title || "Services"}
            </h3>
            
            <ul className="space-y-2">
              <li><Link href="/services/electrical" className="footer-link">{footer.services?.electrical || "Electrical Services"}</Link></li>
              <li><Link href="/services/plumbing" className="footer-link">{footer.services?.plumbing || "Plumbing Services"}</Link></li>
              <li><Link href="/services/cleaning" className="footer-link">{footer.services?.cleaning || "Cleaning Services"}</Link></li>
              <li><Link href="/services/repair" className="footer-link">{footer.services?.repair || "Home Repair"}</Link></li>
              <li><Link href="/services/landscaping" className="footer-link">{footer.services?.landscaping || "Landscaping"}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {footer.contact?.title || "Contact Info"}
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-gray-400" />
                <span className="text-gray-400 text-sm">
                  {footer.contact?.phone || "+251 911 234 567"}
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-gray-400" />
                <span className="text-gray-400 text-sm">
                  {footer.contact?.email || "info@ethiosmart.com"}
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="text-gray-400" />
                <span className="text-gray-400 text-sm">
                  {footer.contact?.address || "Bole, Addis Ababa, Ethiopia"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} {footer.bottom?.companyName || "Ethio Smart"}.{" "}
              {footer.bottom?.allRightsReserved || "All rights reserved."}
            </div>
            
            <div className="flex space-x-6">
              <Link href="/privacy" className="footer-link">
                {footer.bottom?.privacy || "Privacy Policy"}
              </Link>
              <Link href="/terms" className="footer-link">
                {footer.bottom?.terms || "Terms of Service"}
              </Link>
              <Link href="/cookies" className="footer-link">
                {footer.bottom?.cookies || "Cookie Policy"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}