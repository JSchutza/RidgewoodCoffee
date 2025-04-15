import { FaInstagram, FaFacebook } from 'react-icons/fa'
import Link from 'next/link'

const hours = [
  { day: 'Monday - Friday', time: '7:00 AM - 8:00 PM' },
  { day: 'Saturday', time: '8:00 AM - 9:00 PM' },
  { day: 'Sunday', time: '8:00 AM - 6:00 PM' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hours</h3>
            <ul className="space-y-2">
              {hours.map((schedule) => (
                <li key={schedule.day}>
                  <p className="font-medium">{schedule.day}</p>
                  <p className="text-gray-400">{schedule.time}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic">
              <p>123 Main Street</p>
              <p>Ridgewood, NY 11385</p>
              <p className="mt-2">Phone: (555) 123-4567</p>
              <p>Email: hello@ridgewoodcoffee.com</p>
            </address>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link
                href="https://instagram.com/ridgewoodcoffee"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-brown-400 transition-colors"
              >
                <FaInstagram />
              </Link>
              <Link
                href="https://facebook.com/ridgewoodcoffee"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-brown-400 transition-colors"
              >
                <FaFacebook />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Ridgewood Coffee. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 