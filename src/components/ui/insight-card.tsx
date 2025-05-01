'use client'

import { motion } from 'framer-motion'
import { Card } from './card'
import { cn } from '@/lib/utils'
import { Info } from 'lucide-react'

interface InsightCardProps {
  title: string
  content: string
  className?: string
}

export function InsightCard({ title, content, className }: InsightCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={cn('p-6 bg-muted/50', className)}>
        <div className="flex items-start gap-4">
          <div className="mt-1">
            <Info className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{content}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
} 