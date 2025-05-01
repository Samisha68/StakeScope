'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ChartBarIcon,
  UserGroupIcon,
  GlobeAltIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'
import { clsx } from 'clsx'

const navigation = [
  { name: 'Overview', href: '/', icon: ChartBarIcon },
  { name: 'Validators', href: '/validators', icon: UserGroupIcon },
  { name: 'Network', href: '/network', icon: GlobeAltIcon },
  { name: 'Alerts', href: '/alerts', icon: ExclamationTriangleIcon },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="flex-1 space-y-1 px-2 py-4">
      {navigation.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.name}
            href={item.href}
            className={clsx(
              isActive
                ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white',
              'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
            )}
          >
            <item.icon
              className={clsx(
                isActive
                  ? 'text-gray-500 dark:text-gray-300'
                  : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300',
                'mr-3 flex-shrink-0 h-6 w-6'
              )}
              aria-hidden="true"
            />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
} 