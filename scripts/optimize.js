const fs = require('fs');
const path = require('path');
const { minify } = require('terser');
const CleanCSS = require('clean-css');

// Performance optimization script for mobile
async function optimizeAssets() {
  console.log('🚀 Starting performance optimization...');
  
  try {
    // Minify CSS
    const cssPath = path.join(__dirname, '../src/app/globals.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    
    const cleanCSS = new CleanCSS({
      level: 2,
      format: 'beautify'
    });
    
    const minifiedCSS = cleanCSS.minify(cssContent);
    
    if (minifiedCSS.errors.length === 0) {
      fs.writeFileSync(cssPath, minifiedCSS.styles);
      console.log('✅ CSS minified successfully');
    } else {
      console.log('⚠️ CSS minification warnings:', minifiedCSS.warnings);
    }
    
    // Create mobile-specific optimizations
    const mobileOptimizations = `
/* Mobile Performance Optimizations */
@media (max-width: 640px) {
  /* Reduce animations on mobile for better performance */
  * {
    animation-duration: 0.2s !important;
    transition-duration: 0.2s !important;
  }
  
  /* Optimize images for mobile */
  img {
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }
  
  /* Reduce shadow complexity on mobile */
  .shadow-xl, .shadow-2xl {
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1) !important;
  }
  
  /* Optimize backdrop blur for mobile */
  .backdrop-blur-md {
    backdrop-filter: blur(4px) !important;
  }
  
  /* Reduce border radius for better mobile performance */
  .rounded-xl {
    border-radius: 0.5rem !important;
  }
  
  /* Optimize hover effects for touch devices */
  .hover\\:scale-105:hover {
    transform: scale(1.02) !important;
  }
  
  .hover\\:-translate-y-2:hover {
    transform: translateY(-0.25rem) !important;
  }
}

/* Critical CSS for above-the-fold content */
.critical-css {
  /* Header styles */
  .header {
    contain: layout style paint;
  }
  
  /* Navigation styles */
  .nav {
    contain: layout style paint;
  }
  
  /* Card styles */
  .card {
    contain: layout style paint;
  }
}
`;

    // Append mobile optimizations to globals.css
    fs.appendFileSync(cssPath, mobileOptimizations);
    console.log('✅ Mobile performance optimizations added');
    
    console.log('🎉 Performance optimization completed!');
    console.log('📱 Mobile optimizations applied:');
    console.log('   - Reduced animation durations');
    console.log('   - Optimized image rendering');
    console.log('   - Simplified shadows');
    console.log('   - Reduced backdrop blur complexity');
    console.log('   - Optimized hover effects for touch');
    console.log('   - Added CSS containment for better performance');
    
  } catch (error) {
    console.error('❌ Error during optimization:', error);
  }
}

// Run optimization
optimizeAssets();
