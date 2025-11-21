import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'Install NeurondB PostgreSQL Vector Database | Step-by-Step Guide',
  description:
    'Complete installation guide for NeurondB on PostgreSQL 16–18. Includes Linux, macOS, and RHEL builds plus GPU-ready configuration and verification steps.',
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/neurondb/installation',
  },
}

const tableOfContents: TocItem[] = [
  { id: 'prerequisites', title: 'Prerequisites' },
  { id: 'ubuntu-debian', title: 'Ubuntu / Debian' },
  { id: 'macos', title: 'macOS (Homebrew)' },
  { id: 'rocky-rhel', title: 'Rocky Linux / RHEL' },
  { id: 'post-installation', title: 'Post-installation checks' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/getting-started',
  label: 'Getting Started',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/configuration',
  label: 'Configuration',
}

export default function NeurondBInstallationPage() {
  return (
    <PostgresDocsLayout
      title="Install NeurondB on PostgreSQL 16–18"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="prerequisites">
        <h2>Prerequisites</h2>
        <p>Before installing NeurondB, ensure you have:</p>
        <ul>
          <li>PostgreSQL 16, 17, or 18 with superuser access</li>
          <li>gcc/clang toolchain, make, autoconf, libtool</li>
          <li>PostgreSQL server development headers</li>
          <li>Optional: CUDA or ROCm drivers for GPU acceleration</li>
        </ul>
        <p>
          Verify that <code>pg_config</code> points to your target PostgreSQL installation before compiling.
        </p>
      </section>

      <section id="ubuntu-debian">
        <h2>Ubuntu / Debian</h2>
        <p>Install system packages, fetch NeurondB sources, and compile against PostgreSQL 17 deb packages.</p>

        <h3>Install PostgreSQL</h3>
        <BashCodeBlock
          title="PostgreSQL packages"
          code={`sudo apt-get update
sudo apt-get install -y postgresql-17 \\
    postgresql-server-dev-17 \\
    postgresql-contrib-17`}
        />

        <h3>Install build dependencies</h3>
        <BashCodeBlock
          title="Build prerequisites"
          code={`sudo apt-get install -y build-essential \\
    libcurl4-openssl-dev \\
    libssl-dev \\
    zlib1g-dev \\
    pkg-config`}
        />

        <h3>Compile & install</h3>
        <BashCodeBlock
          title="Build NeurondB"
          code={`git clone https://github.com/pgElephant/NeurondB.git
cd NeurondB
make PG_CONFIG=/usr/lib/postgresql/17/bin/pg_config
sudo make install PG_CONFIG=/usr/lib/postgresql/17/bin/pg_config`}
        />

        <h3>Verify artifacts</h3>
        <BashCodeBlock
          title="Installed files"
          code={`ls -lh /usr/lib/postgresql/17/lib/neurondb.so
ls -lh /usr/share/postgresql/17/extension/neurondb*`}
        />
      </section>

      <section id="macos">
        <h2>macOS (Homebrew)</h2>
        <p>Build NeurondB against Homebrew PostgreSQL. Requires Xcode CLI tools and sudo for installation.</p>

        <h3>Install PostgreSQL 17</h3>
        <BashCodeBlock
          title="Homebrew setup"
          code={`brew install postgresql@17
brew services start postgresql@17`}
        />

        <h3>Compile & install</h3>
        <BashCodeBlock
          title="Build NeurondB"
          code={`git clone https://github.com/pgElephant/NeurondB.git
cd NeurondB
make PG_CONFIG=/opt/homebrew/opt/postgresql@17/bin/pg_config
sudo make install PG_CONFIG=/opt/homebrew/opt/postgresql@17/bin/pg_config`}
        />
      </section>

      <section id="rocky-rhel">
        <h2>Rocky Linux / RHEL</h2>
        <p>Install PostgreSQL from the PGDG repository, then build NeurondB against the RPM tooling.</p>

        <h3>Install PostgreSQL packages</h3>
        <BashCodeBlock
          title="PostgreSQL 17"
          code={`sudo dnf install -y \\
    postgresql17-server \\
    postgresql17-devel \\
    postgresql17-contrib`}
        />

        <h3>Install build dependencies</h3>
        <BashCodeBlock
          title="Build prerequisites"
          code={`sudo dnf install -y \\
    gcc \\
    make \\
    curl-devel \\
    openssl-devel \\
    zlib-devel`}
        />

        <h3>Compile & install</h3>
        <BashCodeBlock
          title="Build NeurondB"
          code={`git clone https://github.com/pgElephant/NeurondB.git
cd NeurondB
make PG_CONFIG=/usr/pgsql-17/bin/pg_config
sudo make install PG_CONFIG=/usr/pgsql-17/bin/pg_config`}
        />
      </section>

      <section id="post-installation">
        <h2>Post-installation checks</h2>
        <p>Enable the extension, verify metadata, and confirm NeurondB is available across your cluster.</p>

        <h3>Register extension</h3>
        <SqlCodeBlock
          title="Initialize NeurondB"
          code={`-- Connect to target database
\\c my_database

-- Create extension
CREATE EXTENSION neurondb;

-- Confirm version
SELECT extversion
FROM   pg_extension
WHERE  extname = 'neurondb';`}
        />

        <h3>Optional GPU configuration</h3>
        <BashCodeBlock
          title="postgresql.conf"
          code={`# Enable GPU acceleration
neurondb.gpu_enabled = on
neurondb.gpu_backend = 'cuda'  # or 'rocm'
neurondb.gpu_memory_pool_mb = 2048`}
        />
      </section>

      <section>
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/neurondb/getting-started">Getting Started</a> - Load sample data, create vector indexes, and run first searches.</li>
          <li><a href="/docs/neurondb/configuration">Configuration Reference</a> - Tune GUC parameters for CPU/GPU execution paths and logging.</li>
          <li><a href="/docs/neurondb/troubleshooting">Troubleshooting Guide</a> - Resolve build failures, GPU driver issues, and deployment blockers.</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
