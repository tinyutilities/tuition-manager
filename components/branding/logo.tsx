'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LogoProps {
  size?: number
  showText?: boolean
  className?: string
}

export function Logo({ size = 32, showText = true, className }: LogoProps) {
  const markSize = Math.round(size * 0.58)

  return (
    <motion.div
      className={cn('flex items-center gap-2.5 select-none', className)}
      whileHover="hover"
      initial="rest"
      animate="rest"
      role="img"
      aria-label="BatchPilot logo"
    >
      <motion.div
        variants={{
          rest: { rotate: 0, scale: 1 },
          hover: { rotate: -6, scale: 1.06 },
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        style={{ width: size, height: size }}
        className={cn(
          'flex items-center justify-center rounded-2xl',
          'bg-indigo-600 dark:bg-indigo-500',
          'shadow-sm'
        )}
      >
        {/* Custom mark: open book with a checkmark bookmark — distinctive to BatchPilot */}
        <svg
          width={markSize}
          height={markSize}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          {/* Open book base, drawn as two joined page shapes */}
          <path
            d="M12 6.5C10.4 5.3 8.2 4.7 6 4.7c-0.55 0-1 0.36-1 0.9v10.6c0 0.5 0.4 0.9 0.9 0.95 2.1 0.2 4.1 0.85 5.6 1.9 0.3 0.2 0.7 0.2 1 0 1.5-1.05 3.5-1.7 5.6-1.9 0.5-0.05 0.9-0.45 0.9-0.95V5.6c0-0.54-0.45-0.9-1-0.9-2.2 0-4.4 0.6-6 1.8Z"
            fill="white"
            fillOpacity={0.95}
          />
          <path
            d="M12 6.5V18.5"
            stroke="#4F46E5"
            strokeWidth="1.15"
            strokeLinecap="round"
          />
          {/* Checkmark bookmark tab on the spine top */}
          <path
            d="M9.4 2.6h5.2v3.5l-2.6-1.5-2.6 1.5V2.6Z"
            fill="white"
          />
          <path
            d="M10.6 4.05 11.9 5.2l1.6-2"
            stroke="#4F46E5"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {showText && (
        <motion.span
          variants={{
            rest: { opacity: 1, x: 0 },
            hover: { x: 1 },
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={cn(
            'font-semibold tracking-tight',
            'text-gray-900 dark:text-white'
          )}
          style={{ fontSize: Math.max(14, Math.round(size * 0.5)) }}
        >
          BatchPilot
        </motion.span>
      )}
    </motion.div>
  )
}