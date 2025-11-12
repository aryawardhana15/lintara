import { Outlet } from 'react-router-dom'
import clsx from 'classnames'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { useAuth } from '../../context/AuthContext'

export const DashboardLayout = () => {
  const { role } = useAuth()

  const roleThemeClass =
    role === 'group_cfo'
      ? 'bg-neutral-950 text-neutral-100'
      : role === 'corporate_cio'
        ? 'bg-gradient-to-br from-secondary/5 via-neutral-50 to-neutral-50 text-neutral-900'
        : 'bg-gradient-to-br from-primary/5 via-neutral-50 to-neutral-50 text-neutral-900'

  return (
    <div className={clsx('min-h-screen', roleThemeClass)}>
      <Sidebar />
      <div className="lg:pl-72">
        <Topbar />
        <main className="px-3 py-4 sm:px-4 sm:py-6 lg:px-6 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}


