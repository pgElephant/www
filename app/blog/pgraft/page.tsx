import { BlogMarkdown } from '../../_components/BlogMarkdown';

export const metadata = {
  title: 'pgraft: Bringing Raft Consensus to PostgreSQL',
  description: 'How pgraft brings automatic leader election, split-brain prevention, and high availability to PostgreSQL clusters.'
};

const markdown = `
![pgraft blog header](/blog/pgraft/header.svg)

# pgraft: Bringing Raft Consensus to PostgreSQL

## Introduction

In the world of distributed databases, achieving high availability while preventing data inconsistencies is one of the most challenging problems to solve. Split-brain scenarios, where multiple nodes believe they are the leader, can lead to data corruption and system failures.

> **Key Point:**
> 
> **pgraft** brings the Raft consensus protocol directly into PostgreSQL, providing automatic leader election, deterministic failover, and mathematical guarantees against split-brain conditions—all as a native extension.

---

## What is pgraft?


**pgraft** is a PostgreSQL extension that embeds the Raft consensus protocol to deliver enterprise-grade cluster coordination capabilities. Built on top of the battle-tested \`etcd-io/raft\` library, pgraft provides a robust foundation for building highly available PostgreSQL clusters with automatic failover and 100% split-brain prevention.

The extension is part of the pgElephant high-availability suite and supports PostgreSQL versions 16, 17, and 18. It's designed with production workloads in mind, featuring zero compilation errors or warnings, 100% PostgreSQL C standards compliance, and comprehensive test coverage.

---

## Core Features

- **Automatic Leader Election:** Quorum-based, deterministic, and fully automated. When a cluster starts or a leader fails, nodes elect a new leader to coordinate operations.
- **Crash-Safe Log Replication:** All state changes are replicated and persisted, ensuring cluster consistency even after crashes or restarts.
- **100% Split-Brain Prevention:** Raft guarantees only one leader per term, majority voting, and conflict resolution by term. No split-brain, ever.
- **Zero-Downtime Failover:** Sub-second detection and recovery with seamless leader election and minimal service disruption.
- **Leader-Driven Cluster Management:** All configuration changes are performed by the leader and replicated to all nodes, ensuring consistency.

---

## Architecture Overview

- **C Layer:** PostgreSQL integration via background workers and SQL functions. Manages shared memory and exposes cluster operations.
- **Go Layer:** Implements Raft using \`etcd-io/raft\` for proven consensus and reliability.
- **Storage:** Persists Raft log, hard state, and snapshots for crash safety.
- **Network:** Handles TCP communication for elections, heartbeats, and replication.

---

## How It Works

The extension runs a PostgreSQL background worker every 100ms, driving the Raft engine through state transitions, persisting state, replicating logs, and applying committed entries. This ensures high performance and reliability within PostgreSQL's process model.

---

## Summary

pgraft represents a significant advancement in PostgreSQL high availability tooling. By embedding the Raft consensus protocol directly into PostgreSQL as an extension, it provides enterprise-grade cluster coordination without requiring external coordination services or complex infrastructure.

The mathematical guarantees against split-brain scenarios, combined with automatic leader election and zero-downtime failover, make pgraft an excellent choice for organizations that need reliable, highly available PostgreSQL deployments.

---
`;

export default function PgraftBlogPost() {
  return <BlogMarkdown>{markdown}</BlogMarkdown>;
}
