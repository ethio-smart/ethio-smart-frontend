"use client"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { useTranslations } from "next-intl"
import { LuFacebook } from "react-icons/lu"

export default function Footer() {
  const t = useTranslations('footer')

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
              {t('company.description')}
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition">
                <LuFacebook size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('quickLinks.title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition text-sm">
                  {t('quickLinks.about')}
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-400 hover:text-white transition text-sm">
                  {t('quickLinks.howItWorks')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition text-sm">
                  {t('quickLinks.services')}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-white transition text-sm">
                  {t('quickLinks.pricing')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition text-sm">
                  {t('quickLinks.blog')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('services.title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/electrical" className="text-gray-400 hover:text-white transition text-sm">
                  {t('services.electrical')}
                </Link>
              </li>
              <li>
                <Link href="/services/plumbing" className="text-gray-400 hover:text-white transition text-sm">
                  {t('services.plumbing')}
                </Link>
              </li>
              <li>
                <Link href="/services/cleaning" className="text-gray-400 hover:text-white transition text-sm">
                  {t('services.cleaning')}
                </Link>
              </li>
              <li>
                <Link href="/services/repair" className="text-gray-400 hover:text-white transition text-sm">
                  {t('services.repair')}
                </Link>
              </li>
              <li>
                <Link href="/services/landscaping" className="text-gray-400 hover:text-white transition text-sm">
                  {t('services.landscaping')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contact.title')}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-gray-400" />
                <span className="text-gray-400 text-sm">{t('contact.phone')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-gray-400" />
                <span className="text-gray-400 text-sm">{t('contact.email')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="text-gray-400" />
                <span className="text-gray-400 text-sm">{t('contact.address')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              {t('bottom.copyright')} {new Date().getFullYear()} {t('bottom.companyName')}. {t('bottom.allRightsReserved')}
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition text-sm">
                {t('bottom.privacy')}
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition text-sm">
                {t('bottom.terms')}
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition text-sm">
                {t('bottom.cookies')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
