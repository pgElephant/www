import React from 'react'
import Script from 'next/script'

const PerformanceOptimizations: React.FC = () => {
  return (
    <>
      {/* Core Web Vitals optimization scripts */}
      <Script
        id="web-vitals"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Preload critical fonts
            const fontPreloads = [
              'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhjp-Ek-_EeAmM.woff2',
              'https://fonts.gstatic.com/s/jetbrainsmono/v13/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjPVmUsaaDhw.woff2'
            ];
            
            fontPreloads.forEach(font => {
              const link = document.createElement('link');
              link.rel = 'preload';
              link.as = 'font';
              link.type = 'font/woff2';
              link.href = font;
              link.crossOrigin = 'anonymous';
              document.head.appendChild(link);
            });

            // Optimize images with intersection observer
            if ('IntersectionObserver' in window) {
              const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                  if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                      img.src = img.dataset.src;
                      img.classList.remove('lazy');
                      observer.unobserve(img);
                    }
                  }
                });
              });

              // Observe all lazy images
              document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
              });
            }

            // Preload critical resources
            const criticalResources = [
              '/api/health',
              '/og-image.jpg'
            ];

            criticalResources.forEach(resource => {
              const link = document.createElement('link');
              link.rel = 'prefetch';
              link.href = resource;
              document.head.appendChild(link);
            });

            // Service Worker registration for caching
            if ('serviceWorker' in navigator && typeof window !== 'undefined') {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                  .then(registration => {
                    console.log('SW registered: ', registration);
                  })
                  .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                  });
              });
            }

            // Performance monitoring
            if ('performance' in window && 'PerformanceObserver' in window) {
              // Monitor Largest Contentful Paint
              const lcpObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                  // Send to analytics
                  if (window.gtag) {
                    window.gtag('event', 'LCP', {
                      value: Math.round(entry.startTime),
                      custom_parameter: 'core_web_vitals'
                    });
                  }
                }
              });
              
              try {
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
              } catch (e) {
                // LCP not supported
              }

              // Monitor Cumulative Layout Shift
              let clsValue = 0;
              const clsObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                  if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                  }
                }
                
                if (window.gtag) {
                  window.gtag('event', 'CLS', {
                    value: Math.round(clsValue * 1000),
                    custom_parameter: 'core_web_vitals'
                  });
                }
              });
              
              try {
                clsObserver.observe({ entryTypes: ['layout-shift'] });
              } catch (e) {
                // CLS not supported
              }

              // Monitor First Input Delay
              const fidObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                  if (window.gtag) {
                    window.gtag('event', 'FID', {
                      value: Math.round(entry.processingStart - entry.startTime),
                      custom_parameter: 'core_web_vitals'
                    });
                  }
                }
              });
              
              try {
                fidObserver.observe({ entryTypes: ['first-input'] });
              } catch (e) {
                // FID not supported
              }
            }
          `
        }}
      />
    </>
  )
}

export default PerformanceOptimizations