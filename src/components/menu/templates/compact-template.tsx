'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { M3Card, M3CardContent } from '@/components/ui/m3-card'
import { M3Button } from '@/components/ui/m3-button'
import { M3Typography } from '@/components/ui/m3-typography'
import { MenuItem } from '@/types/menu'
import { Edit3 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CategoryDiscount {
  isActive: boolean
  percentage: number
}

interface CompactTemplateProps {
  item: MenuItem
  className?: string
  isAdmin?: boolean
  onEditItem?: ((item: MenuItem) => void) | null
  categoryDiscounts?: Record<string, CategoryDiscount>
}

export function CompactTemplate({ 
  item, 
  className, 
  isAdmin = false, 
  onEditItem, 
  categoryDiscounts = {} 
}: CompactTemplateProps) {
  const [imageError, setImageError] = useState(false)

  const handleEditClick = () => {
    if (onEditItem) {
      onEditItem(item)
    }
  }

  const renderPrice = () => {
                // Check for individual discount first
                if (item.hasIndividualDiscount && item.discountedPrice) {
                  return (
        <div className="flex items-center gap-[var(--md-sys-spacing-xs)]">
          <M3Typography variant="title-medium" color="primary">
            {item.discountedPrice.toLocaleString('fa-IR')} تومان
          </M3Typography>
          <M3Typography 
            variant="body-small" 
            color="on-surface-variant"
            className="line-through"
          >
            {item.price.toLocaleString('fa-IR')} تومان
          </M3Typography>
                    </div>
                  )
                }
                
                // Check for category discount
                const categoryDiscount = categoryDiscounts[item.category]
                if (categoryDiscount?.isActive) {
                  const originalPrice = Number(item.price) || 0
                  const discountPercentage = Number(categoryDiscount.percentage) || 0
                  
                  if (originalPrice > 0 && discountPercentage > 0 && discountPercentage < 100) {
                    const discountedPrice = originalPrice - (discountPercentage * originalPrice / 100)
                    
                    if (!isNaN(discountedPrice) && discountedPrice > 0) {
                      return (
            <div className="flex items-center gap-[var(--md-sys-spacing-xs)]">
              <M3Typography variant="title-medium" color="primary">
                {discountedPrice.toLocaleString('fa-IR')} تومان
              </M3Typography>
              <M3Typography 
                variant="body-small" 
                color="on-surface-variant"
                className="line-through"
              >
                {item.price.toLocaleString('fa-IR')} تومان
              </M3Typography>
                        </div>
                      )
                    }
                  }
                }
                
                // Default price display
                return (
      <M3Typography variant="title-medium" color="primary">
        {item.price.toLocaleString('fa-IR')} تومان
      </M3Typography>
    )
  }

  return (
    <M3Card 
      variant="outlined" 
      elevation={0}
      className={cn(
        "relative overflow-hidden transition-all duration-200 hover:shadow-[var(--md-sys-elevation-level2)]",
        className
      )}
    >
      {/* Edit Button - Only visible when admin is logged in */}
      {isAdmin && onEditItem && (
        <div className="absolute top-[var(--md-sys-spacing-sm)] right-[var(--md-sys-spacing-sm)] z-10">
          <M3Button
            variant="filled"
            size="small"
            icon={<Edit3 className="w-4 h-4" />}
            onClick={handleEditClick}
            className="bg-[var(--md-sys-color-error)] text-[var(--md-sys-color-on-error)] hover:bg-[var(--md-sys-color-error)]/90"
          />
        </div>
      )}

      <M3CardContent padding="small">
        <div className="flex flex-row-reverse gap-[var(--md-sys-spacing-sm)]">
              {/* Image Section */}
          <div className="w-16 h-16 flex-shrink-0">
            <div className="relative w-full h-full rounded-[var(--md-sys-shape-corner-small)] overflow-hidden">
                    <Image
                src={imageError ? '/placeholder-food.jpg' : item.image}
                alt={item.title}
                      fill
                      className="object-cover"
                sizes="64px"
                onError={() => setImageError(true)}
              />
                    </div>
                  </div>
                  
          {/* Content Section */}
          <div className="flex-1 min-w-0">
            <div className="space-y-[var(--md-sys-spacing-xs)]">
              <M3Typography 
                variant="title-small" 
                color="on-surface"
                className="line-clamp-1"
              >
                {item.title}
              </M3Typography>
              
              {item.description && (
                <M3Typography 
                  variant="body-small" 
                  color="on-surface-variant"
                  className="line-clamp-1"
                >
                  {item.description}
                </M3Typography>
              )}
              
              <div className="mt-[var(--md-sys-spacing-xs)]">
                {renderPrice()}
              </div>
            </div>
          </div>
        </div>
      </M3CardContent>
    </M3Card>
  )
}