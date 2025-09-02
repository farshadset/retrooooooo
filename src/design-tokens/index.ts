// Material Design 3 Design Tokens
// Mobile-first design for 1080x1920 viewport

export const designTokens = {
  // Color Tokens - Material Design 3
  colors: {
    // Primary Colors
    primary: {
      0: '#000000',
      10: '#21005D',
      20: '#381E72',
      30: '#4F378B',
      40: '#6750A4',
      50: '#7F67BE',
      60: '#9A82DB',
      70: '#B69DF8',
      80: '#D0BCFF',
      90: '#EADDFF',
      95: '#F6EDFF',
      99: '#FFFBFE',
      100: '#FFFFFF',
    },
    
    // Secondary Colors
    secondary: {
      0: '#000000',
      10: '#1D192B',
      20: '#332D41',
      30: '#4A4458',
      40: '#625B71',
      50: '#7A7289',
      60: '#958DA5',
      70: '#B0A7C0',
      80: '#CCC2DC',
      90: '#E8DEF8',
      95: '#F6EDFF',
      99: '#FFFBFE',
      100: '#FFFFFF',
    },
    
    // Tertiary Colors
    tertiary: {
      0: '#000000',
      10: '#31111D',
      20: '#492532',
      30: '#633B48',
      40: '#7D5260',
      50: '#986977',
      60: '#B58392',
      70: '#D29DAC',
      80: '#F0B8C8',
      90: '#FFD8E4',
      95: '#FFECF1',
      99: '#FFFBFE',
      100: '#FFFFFF',
    },
    
    // Error Colors
    error: {
      0: '#000000',
      10: '#410E0B',
      20: '#601410',
      30: '#8C1D18',
      40: '#B3261E',
      50: '#DC362E',
      60: '#E46962',
      70: '#EC928E',
      80: '#F2B8B5',
      90: '#F9DEDC',
      95: '#FCEEEE',
      99: '#FFFBFE',
      100: '#FFFFFF',
    },
    
    // Neutral Colors
    neutral: {
      0: '#000000',
      4: '#0F0D13',
      6: '#151218',
      10: '#1C1B1F',
      12: '#211F26',
      17: '#2B2930',
      20: '#313033',
      22: '#36343A',
      24: '#3B383E',
      25: '#3D3A40',
      30: '#484649',
      35: '#534F52',
      40: '#5F5B62',
      50: '#79747E',
      60: '#938F99',
      70: '#AEA9B4',
      80: '#CAC4D0',
      87: '#D6D0DD',
      90: '#E6E0E9',
      92: '#ECE6F0',
      94: '#F2ECF4',
      95: '#F5EFF7',
      96: '#F7F2FA',
      98: '#FEF7FF',
      99: '#FFFBFE',
      100: '#FFFFFF',
    },
    
    // Surface Colors
    surface: {
      dim: '#DDD8E1',
      default: '#FEF7FF',
      bright: '#FEF7FF',
      container: {
        lowest: '#FFFFFF',
        low: '#F7F2FA',
        default: '#F2ECF4',
        high: '#ECE6F0',
        highest: '#E6E0E9',
      },
      variant: {
        default: '#E7E0EC',
        dim: '#E7E0EC',
        bright: '#E7E0EC',
      },
    },
    
    // Outline Colors
    outline: {
      default: '#79747E',
      variant: '#CAC4D0',
    },
  },
  
  // Typography Tokens
  typography: {
    // Display Styles
    display: {
      large: {
        fontFamily: 'Vazirmatn, Roboto, sans-serif',
        fontSize: '57px',
        fontWeight: 400,
        lineHeight: '64px',
        letterSpacing: '-0.25px',
      },
      medium: {
        fontFamily: 'Vazirmatn, Roboto, sans-serif',
        fontSize: '45px',
        fontWeight: 400,
        lineHeight: '52px',
        letterSpacing: '0px',
      },
      small: {
        fontFamily: 'Vazirmatn, Roboto, sans-serif',
        fontSize: '36px',
        fontWeight: 400,
        lineHeight: '44px',
        letterSpacing: '0px',
      },
    },
    
    // Headline Styles
    headline: {
      large: {
        fontFamily: 'Vazirmatn, Roboto, sans-serif',
        fontSize: '32px',
        fontWeight: 400,
        lineHeight: '40px',
        letterSpacing: '0px',
      },
      medium: {
        fontFamily: 'Vazirmatn, Roboto, sans-serif',
        fontSize: '28px',
        fontWeight: 400,
        lineHeight: '36px',
        letterSpacing: '0px',
      },
      small: {
        fontFamily: 'Vazirmatn, Roboto, sans-serif',
        fontSize: '24px',
        fontWeight: 400,
        lineHeight: '32px',
        letterSpacing: '0px',
      },
    },
    
    // Title Styles
    title: {
      large: {
        fontFamily: 'Vazirmatn, Roboto, sans-serif',
        fontSize: '22px',
        fontWeight: 400,
        lineHeight: '28px',
        letterSpacing: '0px',
      },
      medium: {
        fontFamily: 'Vazirmatn, Roboto, sans-serif',
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '24px',
        letterSpacing: '0.15px',
      },
      small: {
        fontFamily: 'Vazirmatn, Roboto, sans-serif',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '20px',
        letterSpacing: '0.1px',
      },
    },
    
    // Body Styles
    body: {
      large: {
        fontFamily: 'Vazirmatn, Roboto, sans-serif',
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: '24px',
        letterSpacing: '0.5px',
      },
      medium: {
        fontFamily: 'Vazirmatn, Roboto, sans-serif',
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '20px',
        letterSpacing: '0.25px',
      },
      small: {
        fontFamily: 'Vazirmatn, Roboto, sans-serif',
        fontSize: '12px',
        fontWeight: 400,
        lineHeight: '16px',
        letterSpacing: '0.4px',
      },
    },
    
    // Label Styles
    label: {
      large: {
        fontFamily: 'Vazirmatn, Roboto, sans-serif',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '20px',
        letterSpacing: '0.1px',
      },
      medium: {
        fontFamily: 'Vazirmatn, Roboto, sans-serif',
        fontSize: '12px',
        fontWeight: 500,
        lineHeight: '16px',
        letterSpacing: '0.5px',
      },
      small: {
        fontFamily: 'Vazirmatn, Roboto, sans-serif',
        fontSize: '11px',
        fontWeight: 500,
        lineHeight: '16px',
        letterSpacing: '0.5px',
      },
    },
  },
  
  // Spacing Tokens (8px base unit)
  spacing: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    7: '28px',
    8: '32px',
    9: '36px',
    10: '40px',
    11: '44px',
    12: '48px',
    14: '56px',
    16: '64px',
    20: '80px',
    24: '96px',
    28: '112px',
    32: '128px',
    36: '144px',
    40: '160px',
    44: '176px',
    48: '192px',
    52: '208px',
    56: '224px',
    60: '240px',
    64: '256px',
    72: '288px',
    80: '320px',
    96: '384px',
  },
  
  // Corner Radius Tokens
  radius: {
    none: '0px',
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '28px',
    full: '9999px',
  },
  
  // Elevation Tokens
  elevation: {
    0: 'none',
    1: '0px 1px 2px 0px rgba(0, 0, 0, 0.30), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
    2: '0px 1px 2px 0px rgba(0, 0, 0, 0.30), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
    3: '0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
    4: '0px 2px 3px 0px rgba(0, 0, 0, 0.30), 0px 6px 10px 4px rgba(0, 0, 0, 0.15)',
    5: '0px 4px 4px 0px rgba(0, 0, 0, 0.30), 0px 8px 12px 6px rgba(0, 0, 0, 0.15)',
  },
  
  // Motion Tokens
  motion: {
    duration: {
      short1: '50ms',
      short2: '100ms',
      short3: '150ms',
      short4: '200ms',
      medium1: '250ms',
      medium2: '300ms',
      medium3: '350ms',
      medium4: '400ms',
      long1: '450ms',
      long2: '500ms',
      long3: '550ms',
      long4: '600ms',
      extraLong1: '700ms',
      extraLong2: '800ms',
      extraLong3: '900ms',
      extraLong4: '1000ms',
    },
    easing: {
      standard: 'cubic-bezier(0.2, 0, 0, 1)',
      standardAccelerate: 'cubic-bezier(0.3, 0, 1, 1)',
      standardDecelerate: 'cubic-bezier(0, 0, 0, 1)',
      emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
      emphasizedAccelerate: 'cubic-bezier(0.3, 0, 0.8, 0.15)',
      emphasizedDecelerate: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
    },
  },
  
  // Breakpoints for responsive design
  breakpoints: {
    xs: '0px',
    sm: '600px',
    md: '840px',
    lg: '1200px',
    xl: '1600px',
  },
  
  // Mobile-specific tokens for 1080x1920
  mobile: {
    viewport: {
      width: '1080px',
      height: '1920px',
    },
    safeArea: {
      top: '44px',
      bottom: '34px',
      left: '0px',
      right: '0px',
    },
    touchTarget: {
      min: '48px',
      recommended: '56px',
    },
  },
} as const

// Theme variants
export const lightTheme = {
  ...designTokens,
  mode: 'light' as const,
  palette: {
    primary: designTokens.colors.primary,
    secondary: designTokens.colors.secondary,
    tertiary: designTokens.colors.tertiary,
    error: designTokens.colors.error,
    neutral: designTokens.colors.neutral,
    surface: designTokens.colors.surface,
    outline: designTokens.colors.outline,
  },
}

export const darkTheme = {
  ...designTokens,
  mode: 'dark' as const,
  palette: {
    primary: {
      ...designTokens.colors.primary,
      // Dark mode adjustments
    },
    secondary: {
      ...designTokens.colors.secondary,
      // Dark mode adjustments
    },
    tertiary: {
      ...designTokens.colors.tertiary,
      // Dark mode adjustments
    },
    error: designTokens.colors.error,
    neutral: designTokens.colors.neutral,
    surface: {
      ...designTokens.colors.surface,
      // Dark mode adjustments
    },
    outline: designTokens.colors.outline,
  },
}

export type DesignTokens = typeof designTokens
export type LightTheme = typeof lightTheme
export type DarkTheme = typeof darkTheme
