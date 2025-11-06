#!/usr/bin/env python3
"""
Script to fix missing </pre> tags in TSX files.
Finds <pre> tags followed by <code> and adds </pre> after </code> if missing.
"""

import re
import sys
from pathlib import Path

def find_missing_pre_tags(filepath, preview=False):
    """Find and optionally fix missing </pre> tags in a TSX file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    content = ''.join(lines)
    original_content = content
    fixes = []
    
    # Find all <pre> tags and check if they're properly closed
    # Pattern: <pre ...> followed eventually by </code> but NOT immediately followed by </pre>
    pattern = r'(<pre[^>]*>.*?</code>)\s*(?!</pre>)'
    
    for match in re.finditer(pattern, content, flags=re.DOTALL):
        start_pos = match.start()
        end_pos = match.end()
        
        # Find line numbers for this match
        line_num = content[:start_pos].count('\n') + 1
        
        # Get context
        context_start = max(0, start_pos - 100)
        context_end = min(len(content), end_pos + 50)
        context = content[context_start:context_end]
        
        fixes.append({
            'line': line_num,
            'match': match.group(1),
            'context': context
        })
    
    if preview:
        print(f"\n{'='*80}")
        print(f"File: {filepath}")
        print(f"{'='*80}")
        print(f"Found {len(fixes)} missing </pre> tags\n")
        
        for i, fix in enumerate(fixes[:3], 1):  # Show first 3 examples
            print(f"Fix #{i} around line {fix['line']}:")
            print(f"  Will add </pre> after </code>")
            print(f"  Context: ...{fix['context'][:150]}...")
            print()
        
        if len(fixes) > 3:
            print(f"  ... and {len(fixes) - 3} more fixes")
        
        return len(fixes)
    else:
        # Actually fix the file
        content = re.sub(pattern, r'\1\n            </pre>', content, flags=re.DOTALL)
        
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✓ Fixed {len(fixes)} missing </pre> tags in {filepath}")
            return len(fixes)
        else:
            print(f"  No changes needed in {filepath}")
            return 0

if __name__ == '__main__':
    preview = '--preview' in sys.argv or '-p' in sys.argv
    apply = '--apply' in sys.argv or '-a' in sys.argv
    
    if len(sys.argv) > 1:
        files = [Path(arg) for arg in sys.argv[1:] if not arg.startswith('-')]
    else:
        print("Usage: python fix_pre_tags.py [--preview|-p] [--apply|-a] <file1> [file2 ...]")
        print("\n  --preview, -p : Show what would be fixed without making changes")
        print("  --apply, -a   : Actually apply the fixes")
        sys.exit(1)
    
    if not files:
        print("Error: No files specified")
        sys.exit(1)
    
    total_fixes = 0
    for filepath in files:
        if not filepath.exists():
            print(f"Error: File not found: {filepath}")
            continue
        
        count = find_missing_pre_tags(filepath, preview=preview)
        total_fixes += count
    
    print(f"\n{'='*80}")
    if preview:
        print(f"PREVIEW MODE: Would fix {total_fixes} missing </pre> tags across {len(files)} file(s)")
        print(f"Run with --apply to actually make changes")
    else:
        print(f"Total fixes applied: {total_fixes} across {len(files)} file(s)")
