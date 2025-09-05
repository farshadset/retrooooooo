'use client'

import React from 'react'
import { M3Card, M3CardContent, M3CardHeader } from '@/components/ui/m3-card'
import { M3Typography } from '@/components/ui/m3-typography'
import { TemplateRenderer } from './template-renderer'
import { Category, MenuItem } from '@/types/menu'
import { cn } from '@/lib/utils'

interface MenuSectionProps {
  category: Category
  items: MenuItem[]
  className?: string
}

export function MenuSection({ category, items, className }: MenuSectionProps) {
  if (items.length === 0) return null

  return (
    <M3Card variant="elevated" elevation={1} className={cn("overflow-hidden", className)}>
      <M3CardHeader
        title={category.name}
        subtitle={`${items.length} آیتم`}
        className="bg-[var(--md-sys-color-primary-container)]"
      />
      
      <M3CardContent padding="none">
        <div className="grid grid-cols-1 gap-[var(--md-sys-spacing-xs)] p-[var(--md-sys-spacing-md)]">
          {items.map((item) => (
            <div key={item.id} className="mb-[var(--md-sys-spacing-sm)] last:mb-0">
              <TemplateRenderer
                item={item}
                template="default"
                isAdmin={false}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </M3CardContent>
    </M3Card>
  )
}