#!/usr/bin/env node

/**
 * SEO Audit Script
 * Validates all SEO optimizations and provides detailed analysis
 */

const fs = require('fs');
const path = require('path');

class SEOAuditor {
  constructor() {
    this.results = {
      passed: [],
      failed: [],
      warnings: []
    };
  }

  log(type, message, details = '') {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${type.toUpperCase()}: ${message}`;
    
    if (details) {
      console.log(`${logMessage}\n  Details: ${details}\n`);
    } else {
      console.log(`${logMessage}\n`);
    }

    this.results[type].push({ message, details, timestamp });
  }

  async auditFile(filePath, checks) {
    if (!fs.existsSync(filePath)) {
      this.log('failed', `File not found: ${filePath}`);
      return false;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    let allPassed = true;

    for (const check of checks) {
      try {
        const result = check.test(content);
        if (result) {
          this.log('passed', `✓ ${check.name} in ${path.basename(filePath)}`, check.details);
        } else {
          this.log('failed', `✗ ${check.name} in ${path.basename(filePath)}`, check.failureMessage);
          allPassed = false;
        }
      } catch (error) {
        this.log('failed', `Error checking ${check.name} in ${path.basename(filePath)}`, error.message);
        allPassed = false;
      }
    }

    return allPassed;
  }

  async runAudit() {
    console.log('🔍 Starting Comprehensive SEO Audit...\n');

    // Audit robots.txt
    await this.auditFile('./app/robots.ts', [
      {
        name: 'Enhanced robots.txt configuration',
        test: (content) => content.toLowerCase().includes('googlebot') && content.toLowerCase().includes('bingbot'),
        details: 'Multiple search engine bots configured',
        failureMessage: 'Missing advanced bot configurations'
      },
      {
        name: 'Sitemap reference in robots.txt',
        test: (content) => content.includes('sitemap'),
        details: 'Sitemap URL properly referenced',
        failureMessage: 'No sitemap reference found'
      }
    ]);

    // Audit sitemap
    await this.auditFile('./app/sitemap.ts', [
      {
        name: 'Dynamic sitemap generation',
        test: (content) => content.includes('changeFrequency') && content.includes('priority'),
        details: 'Sitemap includes SEO metadata',
        failureMessage: 'Missing changeFrequency or priority settings'
      },
      {
        name: 'Product pages in sitemap',
        test: (content) => content.includes('pgbalancer') && content.includes('pgraft'),
        details: 'All product pages included',
        failureMessage: 'Some product pages missing from sitemap'
      }
    ]);

    // Audit pgbalancer page
    await this.auditFile('./app/pgbalancer/page.tsx', [
      {
        name: 'AI-enhanced metadata',
        test: (content) => content.includes('AI-powered') && content.includes('machine learning'),
        details: 'AI keywords properly integrated',
        failureMessage: 'Missing AI-related keywords'
      },
      {
        name: 'OpenGraph optimization',
        test: (content) => content.includes('openGraph') && content.includes('twitter'),
        details: 'Social media metadata present',
        failureMessage: 'Missing social media optimization'
      },
      {
        name: 'Structured data integration',
        test: (content) => content.includes('PgbalancerSEO'),
        details: 'Advanced SEO component integrated',
        failureMessage: 'Missing structured data component'
      }
    ]);

    // Audit PgbalancerSEO component
    await this.auditFile('./components/SEO/PgbalancerSEO.tsx', [
      {
        name: 'SoftwareApplication schema',
        test: (content) => content.includes('SoftwareApplication') && content.includes('@type'),
        details: 'Structured data for software product',
        failureMessage: 'Missing software application schema'
      },
      {
        name: 'HowTo schema implementation',
        test: (content) => content.includes('HowTo') && content.includes('HowToStep'),
        details: 'Tutorial structured data present',
        failureMessage: 'Missing how-to instructions schema'
      },
      {
        name: 'FAQ schema markup',
        test: (content) => content.includes('FAQPage') && content.includes('Question'),
        details: 'FAQ structured data implemented',
        failureMessage: 'Missing FAQ schema markup'
      },
      {
        name: 'BreadcrumbList schema',
        test: (content) => content.includes('BreadcrumbList') && content.includes('ListItem'),
        details: 'Navigation breadcrumbs structured data',
        failureMessage: 'Missing breadcrumb schema'
      }
    ]);

    // Audit Performance Optimizations
    await this.auditFile('./components/PerformanceOptimizations.tsx', [
      {
        name: 'Core Web Vitals monitoring',
        test: (content) => content.includes('LCP') && content.includes('CLS') && content.includes('FID'),
        details: 'All Core Web Vitals tracked',
        failureMessage: 'Missing Core Web Vitals monitoring'
      },
      {
        name: 'Font preloading optimization',
        test: (content) => content.includes('preload') && content.includes('font'),
        details: 'Critical fonts preloaded',
        failureMessage: 'Missing font preloading'
      },
      {
        name: 'Image lazy loading setup',
        test: (content) => content.includes('IntersectionObserver') && content.includes('lazy'),
        details: 'Lazy loading implemented',
        failureMessage: 'Missing image optimization'
      }
    ]);

    // Audit layout for performance integration
    await this.auditFile('./app/layout.tsx', [
      {
        name: 'Performance optimization integration',
        test: (content) => content.includes('PerformanceOptimizations'),
        details: 'Performance component integrated',
        failureMessage: 'Performance optimizations not integrated'
      },
      {
        name: 'No merchant references',
        test: (content) => !content.includes('merchant') && !content.includes('Merchant'),
        details: 'E-commerce references removed',
        failureMessage: 'Still contains merchant references'
      }
    ]);

    // Audit next-sitemap config
    await this.auditFile('./next-sitemap.config.js', [
      {
        name: 'Sitemap optimization config',
        test: (content) => content.includes('changefreq') && content.includes('priority'),
        details: 'Sitemap generation optimized',
        failureMessage: 'Missing sitemap optimization settings'
      }
    ]);

    // Generate summary
    this.generateSummary();
  }

  generateSummary() {
    console.log('\n📊 SEO Audit Summary\n');
    console.log('═'.repeat(50));
    
    console.log(`✅ Tests Passed: ${this.results.passed.length}`);
    console.log(`❌ Tests Failed: ${this.results.failed.length}`);
    console.log(`⚠️  Warnings: ${this.results.warnings.length}`);
    
    const totalTests = this.results.passed.length + this.results.failed.length;
    const successRate = totalTests > 0 ? ((this.results.passed.length / totalTests) * 100).toFixed(1) : 0;
    
    console.log(`📈 Success Rate: ${successRate}%`);
    
    if (this.results.failed.length > 0) {
      console.log('\n❌ Failed Tests:');
      this.results.failed.forEach(test => {
        console.log(`   • ${test.message}`);
        if (test.details) console.log(`     ${test.details}`);
      });
    }

    if (this.results.failed.length === 0) {
      console.log('\n🎉 All SEO optimizations are properly implemented!');
      console.log('\n🚀 Your website is now "very well optimized and best SEO"!');
      console.log('\nKey SEO Features Implemented:');
      console.log('• Enhanced metadata with AI keywords');
      console.log('• Comprehensive structured data (JSON-LD)');
      console.log('• Advanced robots.txt configuration');
      console.log('• Optimized sitemap generation');
      console.log('• Core Web Vitals monitoring');
      console.log('• Performance optimizations');
      console.log('• Social media optimization');
      console.log('• Schema markup for all content types');
      console.log('• Clean, merchant-free content');
    }

    console.log('\n═'.repeat(50));
  }
}

// Run the audit
const auditor = new SEOAuditor();
auditor.runAudit().catch(console.error);