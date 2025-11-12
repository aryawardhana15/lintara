import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

export const Modal = ({ open, onClose, title, children, actions }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-neutral-900/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl rounded-3xl border border-white/40 bg-white p-8 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full bg-neutral-100 p-2 text-neutral-500 transition hover:bg-neutral-200 hover:text-neutral-900 dark:bg-neutral-800 dark:hover:bg-neutral-700"
            >
              <X size={18} />
            </button>
            <div className="space-y-6">
              {title && (
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                    {title}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Lengkapi detail integrasi di bawah.
                  </p>
                </div>
              )}
              <div className="max-h-[60vh] space-y-4 overflow-y-auto pr-2">{children}</div>
              {actions && <div className="flex justify-end gap-3">{actions}</div>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


