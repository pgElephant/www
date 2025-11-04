import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Security Best Practices | NeuronDB',
  description: 'Security guidelines, access control, and best practices for securing NeuronDB vector database deployments.'
};

export default function SecurityPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Security Best Practices</h1>
        <p className="text-lg text-muted-foreground">
          Guidelines for securing NeuronDB deployments, protecting API keys, managing access control, and following security best practices.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">API Key and Credentials Management</h2>
        
        <div className="space-y-6">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-red-700 dark:text-red-400">
              Critical: Never store API keys in application code or version control
            </h3>
            <p className="text-sm mb-3">
              LLM API keys (OpenAI, Cohere, etc.) grant access to paid services and should be treated as sensitive credentials.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Recommended: Use Database-Level Settings</h3>
            <p className="mb-3">
              Configure API keys at the database or role level, not in individual sessions or application code.
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
-- Database-level configuration (persists across sessions)
ALTER DATABASE mydb SET neurondb.llm_api_key = 'sk-...';
ALTER DATABASE mydb SET neurondb.llm_provider = 'openai';

-- Role-level configuration (applies to specific users)
ALTER ROLE app_user SET neurondb.llm_api_key = 'sk-...';

-- Verify settings without exposing the key
SELECT name, setting 
FROM pg_settings 
WHERE name = 'neurondb.llm_provider';`}</code></pre>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Best Practice: Environment Variables and Secrets Managers</h3>
            <p className="mb-3">
              For production deployments, use environment variables or secrets managers (AWS Secrets Manager, HashiCorp Vault, etc.).
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
-- In postgresql.conf or postgresql.auto.conf
neurondb.llm_api_key = '$OPENAI_API_KEY'
neurondb.llm_provider = 'openai'

-- Or use ALTER SYSTEM (requires superuser)
ALTER SYSTEM SET neurondb.llm_api_key = 'sk-...';
SELECT pg_reload_conf();`}</code></pre>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Security Tip: Rotate API Keys Regularly</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Rotate LLM API keys every 90 days or per organizational policy</li>
              <li>Use separate API keys for development, staging, and production</li>
              <li>Monitor API usage for anomalies (unexpected spikes, geographic locations)</li>
              <li>Revoke compromised keys immediately and update configuration</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Access Control and Permissions</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Principle of Least Privilege</h3>
            <p className="mb-3">
              Grant users only the permissions they need. Separate read-only and write roles for embedding functions and ML operations.
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
-- Read-only role for querying embeddings
CREATE ROLE reader_role;
GRANT SELECT ON documents TO reader_role;
GRANT EXECUTE ON FUNCTION neurondb_embed(text, text) TO reader_role;

-- Write role for inserting/updating embeddings
CREATE ROLE writer_role;
GRANT SELECT, INSERT, UPDATE ON documents TO writer_role;
GRANT EXECUTE ON FUNCTION neurondb_embed(text, text) TO writer_role;
GRANT EXECUTE ON FUNCTION neurondb_embed_batch(text[], text) TO writer_role;

-- ML analytics role
CREATE ROLE ml_analyst_role;
GRANT SELECT ON documents TO ml_analyst_role;
GRANT EXECUTE ON FUNCTION cluster_kmeans TO ml_analyst_role;
GRANT EXECUTE ON FUNCTION cluster_gmm TO ml_analyst_role;
GRANT EXECUTE ON FUNCTION detect_outliers_zscore TO ml_analyst_role;

-- Assign roles to users
GRANT reader_role TO app_readonly_user;
GRANT writer_role TO app_service_user;
GRANT ml_analyst_role TO data_scientist;`}</code></pre>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Row-Level Security (RLS)</h3>
            <p className="mb-3">
              Use PostgreSQL row-level security to enforce fine-grained access control on embedding data.
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
-- Enable RLS on embeddings table
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Policy: users can only see their own documents
CREATE POLICY user_documents ON documents
  FOR SELECT
  USING (user_id = current_user);

-- Policy: service role can see all documents
CREATE POLICY service_all_documents ON documents
  FOR ALL
  TO service_role
  USING (true);

-- Test RLS
SET ROLE app_user;
SELECT * FROM documents;  -- Only sees own rows`}</code></pre>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">GPU Access Control</h3>
            <p className="mb-3">
              Restrict GPU acceleration to authorized roles to prevent resource exhaustion.
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
-- Only allow specific roles to enable GPU
ALTER ROLE ml_power_user SET neurondb.gpu_enabled = true;

-- Prevent other users from enabling GPU
ALTER DATABASE mydb SET neurondb.gpu_enabled = false;

-- Grant GPU function execution to specific roles
REVOKE EXECUTE ON FUNCTION vector_l2_distance_gpu FROM PUBLIC;
GRANT EXECUTE ON FUNCTION vector_l2_distance_gpu TO gpu_user_role;`}</code></pre>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Data Protection and Privacy</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Encryption at Rest and in Transit</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Enable PostgreSQL SSL/TLS for all client connections</li>
              <li>Use encrypted storage for database files (LUKS, dm-crypt, cloud provider encryption)</li>
              <li>Configure LLM API calls to use HTTPS endpoints only</li>
              <li>Encrypt backups containing embedding data</li>
            </ul>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto mt-3">
              <code>{`
-- Enforce SSL connections (postgresql.conf)
ssl = on
ssl_cert_file = '/path/to/server.crt'
ssl_key_file = '/path/to/server.key'

-- Require SSL for specific roles
ALTER ROLE app_user SET ssl = on;

-- Verify SSL connection
SELECT * FROM pg_stat_ssl WHERE pid = pg_backend_pid();`}</code></pre>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Sensitive Data Handling</h3>
            <p className="mb-3">
              When embedding sensitive content, consider data minimization and anonymization.
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Redact PII (personally identifiable information) before embedding</li>
              <li>Use synthetic data for development and testing</li>
              <li>Implement data retention policies (auto-delete old embeddings)</li>
              <li>Audit access to sensitive embedding columns</li>
            </ul>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto mt-3">
              <code>{`
-- Redact PII before embedding
CREATE FUNCTION redact_pii(text) RETURNS text AS $$
  -- Replace emails, phone numbers, SSNs, etc.
  SELECT regexp_replace(
    regexp_replace($1, '\\S+@\\S+', '[EMAIL]', 'g'),
    '\\d{3}-\\d{2}-\\d{4}', '[SSN]', 'g'
  );
$$ LANGUAGE SQL IMMUTABLE;

-- Use redacted content for embeddings
INSERT INTO documents (content, embedding)
SELECT 
  content,
  neurondb_embed(redact_pii(content), 'text-embedding-ada-002')
FROM source_data;

-- Automated data retention
DELETE FROM documents 
WHERE created_at < NOW() - INTERVAL '365 days';`}</code></pre>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Audit Logging</h3>
            <p className="mb-3">
              Enable PostgreSQL audit logging to track access to embedding data and API key usage.
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
-- Enable pgaudit extension
CREATE EXTENSION pgaudit;

-- Audit all DDL and DML on embeddings table
ALTER DATABASE mydb SET pgaudit.log = 'ddl, write';
ALTER DATABASE mydb SET pgaudit.log_relation = on;

-- Log all function executions
ALTER DATABASE mydb SET pgaudit.log_function_calls = on;

-- Review audit logs
SELECT * FROM pg_catalog.pg_stat_activity
WHERE query LIKE '%neurondb_embed%';`}</code></pre>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Network Security</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Firewall and Network Segmentation</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Restrict PostgreSQL port (5432) to application servers only</li>
              <li>Use VPC/private networks for database-to-app communication</li>
              <li>Whitelist LLM API endpoints (e.g., api.openai.com) in egress firewall rules</li>
              <li>Disable public internet access to database instances</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">PostgreSQL Connection Security</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
-- pg_hba.conf: restrict connections by IP and authentication method
# Allow SSL connections from app subnet only
hostssl all all 10.0.1.0/24 scram-sha-256

# Deny all other connections
host all all 0.0.0.0/0 reject

-- Use strong authentication
# postgresql.conf
password_encryption = scram-sha-256`}</code></pre>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">LLM API Endpoint Security</h3>
            <p className="mb-3">
              Verify and pin LLM API endpoints to prevent MITM attacks.
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
-- Use official endpoints only
SET neurondb.llm_endpoint = 'https://api.openai.com/v1';

-- Avoid unencrypted HTTP
-- NEVER: SET neurondb.llm_endpoint = 'http://...';

-- Monitor outbound connections
SELECT * FROM pg_stat_activity
WHERE query LIKE '%neurondb_embed%';`}</code></pre>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Resource Limits and DoS Prevention</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Connection and Query Limits</h3>
            <p className="mb-3">
              Prevent resource exhaustion from excessive embedding requests or GPU operations.
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
-- Limit concurrent connections per role
ALTER ROLE app_user CONNECTION LIMIT 10;

-- Statement timeout to prevent runaway queries
ALTER DATABASE mydb SET statement_timeout = '30s';

-- Limit GPU batch size to prevent OOM
ALTER ROLE gpu_user SET neurondb.gpu_batch_size = 1000;
ALTER ROLE gpu_user SET neurondb.gpu_memory_pool_mb = 512;

-- Limit LLM API call timeout
ALTER DATABASE mydb SET neurondb.llm_timeout_ms = 15000;`}</code></pre>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Rate Limiting</h3>
            <p className="mb-3">
              Implement application-level rate limiting for embedding generation to avoid LLM API quota exhaustion.
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Use token bucket or sliding window rate limiting in application layer</li>
              <li>Monitor LLM API usage via provider dashboards</li>
              <li>Set up alerts for unusual embedding request patterns</li>
              <li>Consider caching embeddings to reduce API calls</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Monitoring and Incident Response</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Security Monitoring</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Monitor failed authentication attempts in PostgreSQL logs</li>
              <li>Track LLM API usage and spending for anomalies</li>
              <li>Alert on unexpected GPU usage or high memory consumption</li>
              <li>Review embedding function call frequency and patterns</li>
            </ul>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto mt-3">
              <code>{`
-- Monitor failed logins
SELECT * FROM pg_stat_database_conflicts;

-- Track function call statistics
SELECT 
  schemaname, funcname, calls, total_time
FROM pg_stat_user_functions
WHERE funcname LIKE 'neurondb%'
ORDER BY calls DESC;

-- Enable detailed logging
SET neurondb.log_level = 'info';
SET log_connections = on;
SET log_disconnections = on;
SET log_statement = 'ddl';`}</code></pre>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Incident Response Plan</h3>
            <div className="p-4 border rounded-lg">
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li><strong>API Key Compromise:</strong> Immediately revoke key at provider, rotate in database config, audit usage</li>
                <li><strong>Unauthorized Access:</strong> Terminate active sessions, review audit logs, reset credentials</li>
                <li><strong>Data Breach:</strong> Identify scope, notify stakeholders, review RLS policies, enhance encryption</li>
                <li><strong>DoS Attack:</strong> Enable rate limiting, review connection limits, block malicious IPs</li>
              </ol>
            </div>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto mt-3">
              <code>{`
-- Emergency: Revoke API key immediately
ALTER DATABASE mydb RESET neurondb.llm_api_key;
SELECT pg_reload_conf();

-- Terminate active sessions for compromised user
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE usename = 'compromised_user';

-- Reset user password
ALTER ROLE compromised_user PASSWORD 'new_strong_password';`}</code></pre>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Compliance Considerations</h2>
        
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">GDPR and Data Privacy</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Document what data is embedded and where embeddings are stored</li>
              <li>Implement right-to-erasure (delete embeddings for specific users)</li>
              <li>Provide data portability (export embeddings in standard format)</li>
              <li>Obtain consent before embedding user-generated content</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">SOC 2 and Access Control</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Maintain audit trails for all embedding operations</li>
              <li>Enforce least-privilege access to embedding functions</li>
              <li>Regular access reviews (quarterly) for database roles</li>
              <li>Secure API key rotation and storage procedures</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">HIPAA and Healthcare Data</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Ensure LLM provider is HIPAA-compliant (BAA required)</li>
              <li>Encrypt embeddings at rest and in transit</li>
              <li>De-identify PHI before embedding when possible</li>
              <li>Audit all access to healthcare-related embeddings</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Security Checklist</h2>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold mb-3">Pre-Production Security Review</h3>
          <ul className="list-none space-y-2">
            <li>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" disabled />
                <span>API keys stored in environment variables or secrets manager, not in code</span>
              </label>
            </li>
            <li>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" disabled />
                <span>SSL/TLS enabled for all PostgreSQL connections</span>
              </label>
            </li>
            <li>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" disabled />
                <span>Row-level security policies configured for embedding tables</span>
              </label>
            </li>
            <li>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" disabled />
                <span>Least-privilege roles created for read-only, write, and ML operations</span>
              </label>
            </li>
            <li>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" disabled />
                <span>Audit logging enabled for embedding function calls</span>
              </label>
            </li>
            <li>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" disabled />
                <span>Resource limits (connection, GPU batch size) configured per role</span>
              </label>
            </li>
            <li>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" disabled />
                <span>Network firewall rules restrict database access to application subnet</span>
              </label>
            </li>
            <li>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" disabled />
                <span>LLM API endpoint uses HTTPS and is pinned to official provider URL</span>
              </label>
            </li>
            <li>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" disabled />
                <span>PII redaction implemented before embedding sensitive content</span>
              </label>
            </li>
            <li>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" disabled />
                <span>Incident response plan documented and tested</span>
              </label>
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
        <ul className="space-y-2">
          <li>
            <a href="/docs/neurondb/configuration" className="text-blue-600 hover:underline">
              Configuration Guide
            </a> - Review all GUC settings for security implications
          </li>
          <li>
            <a href="/docs/neurondb/troubleshooting" className="text-blue-600 hover:underline">
              Troubleshooting
            </a> - Diagnose security-related errors
          </li>
          <li>
            <a href="/docs/neurondb/sql-api" className="text-blue-600 hover:underline">
              SQL API Reference
            </a> - Understand function permissions and access control
          </li>
        </ul>
      </section>
    </div>
  );
}
