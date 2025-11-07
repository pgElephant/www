import { Metadata } from 'next'
import { Brain } from 'lucide-react'
import GettingStartedLayout from '../../../../components/GettingStartedLayout'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'Install NeurondB PostgreSQL Vector Database | Step-by-Step Guide',
  description:
    'Complete installation guide for NeurondB on PostgreSQL 16–18. Includes Linux, macOS, and RHEL builds plus GPU-ready configuration and verification steps.',
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/neurondb/installation',
  },
}

export default function NeurondBInstallationPage() {
  return (
    <GettingStartedLayout
      product="NeurondB"
      hero={{
        label: 'NeurondB',
        labelIcon: <Brain className="h-4 w-4" />, 
        labelAccent: 'indigo',
        title: 'Install NeurondB on PostgreSQL 16–18',
        description:
          'Follow platform-specific build instructions for Ubuntu, Debian, macOS, and Rocky Linux. Prepare dependencies, compile the extension, and verify the installation in minutes.',
        cta: {
          href: '/docs/neurondb/getting-started',
          label: 'View getting started guide',
        },
      }}
      theme={{
        pageBackground:
          'bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900',
        heroOverlay:
          'bg-gradient-to-r from-indigo-600/20 to-purple-600/20 dark:from-indigo-500/10 dark:to-purple-500/10',
        requirementsBorder: 'indigo',
        requirementsBackground: 'bg-white/90 dark:bg-slate-900/60',
      }}
      requirements={{
        title: 'Prerequisites',
        items: [
          'PostgreSQL 16, 17, or 18 with superuser access',
          'gcc/clang toolchain, make, autoconf, libtool',
          'PostgreSQL server development headers',
          'Optional: CUDA or ROCm drivers for GPU acceleration',
        ],
        note: (
          <span>
            Verify that <code className="rounded bg-slate-800 px-1 text-xs text-white">pg_config</code> points to your target PostgreSQL installation before compiling.
          </span>
        ),
      }}
      sections={[
        {
          title: 'Ubuntu / Debian',
          description: 'Install system packages, fetch NeurondB sources, and compile against PostgreSQL 17 deb packages.',
          cards: [
            {
              id: 'ubuntu-postgres',
              title: 'Install PostgreSQL',
              accent: 'indigo',
              content: (
                <BashCodeBlock
                  title="PostgreSQL packages"
                  code={`sudo apt-get update
sudo apt-get install -y postgresql-17 \
    postgresql-server-dev-17 \
    postgresql-contrib-17`}
                />
              ),
            },
            {
              id: 'ubuntu-deps',
              title: 'Install build dependencies',
              accent: 'emerald',
              content: (
                <BashCodeBlock
                  title="Build prerequisites"
                  code={`sudo apt-get install -y build-essential \
    libcurl4-openssl-dev \
    libssl-dev \
    zlib1g-dev \
    pkg-config`}
                />
              ),
            },
            {
              id: 'ubuntu-build',
              title: 'Compile & install',
              accent: 'purple',
              content: (
                <BashCodeBlock
                  title="Build NeurondB"
                  code={`git clone https://github.com/pgElephant/NeurondB.git
cd NeurondB
make PG_CONFIG=/usr/lib/postgresql/17/bin/pg_config
sudo make install PG_CONFIG=/usr/lib/postgresql/17/bin/pg_config`}
                />
              ),
            },
            {
              id: 'ubuntu-verify',
              title: 'Verify artifacts',
              accent: 'blue',
              content: (
                <BashCodeBlock
                  title="Installed files"
                  code={`ls -lh /usr/lib/postgresql/17/lib/neurondb.so
ls -lh /usr/share/postgresql/17/extension/neurondb*`}
                />
              ),
            },
          ],
        },
        {
          title: 'macOS (Homebrew)',
          description: 'Build NeurondB against Homebrew PostgreSQL. Requires Xcode CLI tools and sudo for installation.',
          cards: [
            {
              id: 'macos-postgres',
              title: 'Install PostgreSQL 17',
              accent: 'indigo',
              content: (
                <BashCodeBlock
                  title="Homebrew setup"
                  code={`brew install postgresql@17
brew services start postgresql@17`}
                />
              ),
            },
            {
              id: 'macos-build',
              title: 'Compile & install',
              accent: 'emerald',
              content: (
                <BashCodeBlock
                  title="Build NeurondB"
                  code={`git clone https://github.com/pgElephant/NeurondB.git
cd NeurondB
make PG_CONFIG=/opt/homebrew/opt/postgresql@17/bin/pg_config
sudo make install PG_CONFIG=/opt/homebrew/opt/postgresql@17/bin/pg_config`}
                />
              ),
            },
          ],
        },
        {
          title: 'Rocky Linux / RHEL',
          description: 'Install PostgreSQL from the PGDG repository, then build NeurondB against the RPM tooling.',
          cards: [
            {
              id: 'rocky-postgres',
              title: 'Install PostgreSQL packages',
              accent: 'blue',
              content: (
                <BashCodeBlock
                  title="PostgreSQL 17"
                  code={`sudo dnf install -y \
    postgresql17-server \
    postgresql17-devel \
    postgresql17-contrib`}
                />
              ),
            },
            {
              id: 'rocky-deps',
              title: 'Install build dependencies',
              accent: 'purple',
              content: (
                <BashCodeBlock
                  title="Build prerequisites"
                  code={`sudo dnf install -y \
    gcc \
    make \
    curl-devel \
    openssl-devel \
    zlib-devel`}
                />
              ),
            },
            {
              id: 'rocky-build',
              title: 'Compile & install',
              accent: 'emerald',
              content: (
                <BashCodeBlock
                  title="Build NeurondB"
                  code={`git clone https://github.com/pgElephant/NeurondB.git
cd NeurondB
make PG_CONFIG=/usr/pgsql-17/bin/pg_config
sudo make install PG_CONFIG=/usr/pgsql-17/bin/pg_config`}
                />
              ),
            },
          ],
        },
        {
          title: 'Post-installation checks',
          description: 'Enable the extension, verify metadata, and confirm NeurondB is available across your cluster.',
          cards: [
            {
              id: 'create-extension',
              title: 'Register extension',
              accent: 'cyan',
              content: (
                <SqlCodeBlock
                  title="Initialize NeurondB"
                  code={`-- Connect to target database
\c my_database

-- Create extension
CREATE EXTENSION neurondb;

-- Confirm version
SELECT extversion
FROM   pg_extension
WHERE  extname = 'neurondb';`}
                />
              ),
            },
            {
              id: 'gpu-note',
              title: 'Optional GPU configuration',
              accent: 'rose',
              content: (
                <BashCodeBlock
                  title="postgresql.conf"
                  code={`# Enable GPU acceleration
neurondb.gpu_enabled = on
neurondb.gpu_backend = 'cuda'  # or 'rocm'
neurondb.gpu_memory_pool_mb = 2048`}
                />
              ),
            },
          ],
        },
      ]}
      nextSteps={[
        {
          href: '/docs/neurondb/getting-started',
          title: '📘 Getting Started',
          description: 'Load sample data, create vector indexes, and run first searches.',
        },
        {
          href: '/docs/neurondb/configuration',
          title: '⚙️ Configuration Reference',
          description: 'Tune GUC parameters for CPU/GPU execution paths and logging.',
        },
        {
          href: '/docs/neurondb/troubleshooting',
          title: '🛠 Troubleshooting Guide',
          description: 'Resolve build failures, GPU driver issues, and deployment blockers.',
        },
      ]}
      supportLinks={[
        {
          href: 'https://github.com/pgElephant/NeurondB/issues',
          label: 'GitHub Issues',
          description: 'Report build problems or request platform support.',
          external: true,
        },
        {
          href: 'https://github.com/pgElephant/NeurondB/discussions',
          label: 'GitHub Discussions',
          description: 'Ask community questions or share installation tips.',
          external: true,
        },
      ]}
      footerNote={
        <div className="text-xs text-slate-500 dark:text-slate-400">
          Need a hardened production build? Contact pgElephant support for pre-built binaries and GPU-tuned configurations.
        </div>
      }
    />
  )
}

