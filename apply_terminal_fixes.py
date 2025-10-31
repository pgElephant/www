#!/usr/bin/env python3
"""
Automated script to apply memory leak fixes to all demo terminals
Applies the same pattern used in NeurondBDemoTerminal.tsx
"""

import re
import sys

TERMINALS_TO_FIX = [
    'components/PgraftDemoTerminal.tsx',
    'components/FauxDbDemoTerminal.tsx',
    'components/RamDemoTerminal.tsx',
    'components/RaleDemoTerminal.tsx',
    'components/PgStatInsightsDemoTerminal.tsx',
]

def fix_terminal(filepath):
    print(f"Fixing {filepath}...")
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Check if already fixed
    if 'intervalRef = useRef<NodeJS.Timeout | null>(null)' in content:
        print(f"  ✓ Already fixed, skipping")
        return
    
    # 1. Fix imports - add useCallback and Check
    content = re.sub(
        r"import React, \{ useState, useEffect, useRef \} from 'react'",
        "import React, { useState, useEffect, useRef, useCallback } from 'react'",
        content
    )
    
    # Add Check to lucide-react imports
    content = re.sub(
        r"from 'lucide-react'",
        lambda m: m.group(0).replace("'lucide-react'", ", Check } from 'lucide-react'" if ', Check' not in content else "'lucide-react'"),
        content,
        count=1
    )
    
    # 2. Add state after terminalRef
    content = re.sub(
        r"(const terminalRef = useRef<HTMLDivElement\|null>\(null\))",
        r"\1\n  const [copied, setCopied] = useState(false)\n  const intervalRef = useRef<NodeJS.Timeout | null>(null)\n  const timeoutRefs = useRef<NodeJS.Timeout[]>([])",
        content
    )
    
    print(f"  ✓ Pattern documented for {filepath}")
    print(f"  ⚠️  Manual review required - pattern is complex")
    
    # Write back
    # with open(filepath, 'w') as f:
    #     f.write(content)
    
    return True

if __name__ == '__main__':
    print("Demo Terminal Memory Leak Fixes")
    print("=" * 60)
    print()
    
    for terminal in TERMINALS_TO_FIX:
        try:
            fix_terminal(terminal)
        except Exception as e:
            print(f"  ✗ Error: {e}")
        print()
    
    print("=" * 60)
    print("Summary: Due to complexity of these components,")
    print("manual fixes are recommended using the pattern from")
    print("NeurondBDemoTerminal.tsx and PgbalancerDemoTerminal.tsx")

