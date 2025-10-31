# Demo Terminal Components - Issues & Fixes

## 🐛 Issues Found

All demo terminal components (except NeurondB which was just fixed) have **memory leaks** from:
1. Uncleaned `setInterval` in `typeCommand()`
2. Uncleaned `setInterval` in `showOutput()`
3. Uncleaned `setTimeout` in demo sequences
4. Missing cleanup on component unmount

## 📋 Terminals to Fix

| Terminal | Lines | Status | Issues |
|----------|-------|--------|--------|
| NeurondBDemoTerminal.tsx | 733 | ✅ FIXED | All intervals cleaned |
| LiveDemoTerminal.tsx | 391 | ❌ NEEDS FIX | 5+ uncleaned intervals |
| PgraftDemoTerminal.tsx | 482 | ❌ NEEDS FIX | 5+ uncleaned intervals |
| FauxDbDemoTerminal.tsx | 740 | ❌ NEEDS FIX | 5+ uncleaned intervals |
| PgbalancerDemoTerminal.tsx | 805 | ❌ NEEDS FIX | 5+ uncleaned intervals |
| RamDemoTerminal.tsx | 546 | ❌ NEEDS FIX | 5+ uncleaned intervals |
| RaleDemoTerminal.tsx | 600 | ❌ NEEDS FIX | 5+ uncleaned intervals |
| PgStatInsightsDemoTerminal.tsx | 470 | ❌ NEEDS FIX | 5+ uncleaned intervals |

## 🔧 Required Fixes

### 1. Add Refs for Cleanup
```typescript
const intervalRef = useRef<NodeJS.Timeout | null>(null)
const timeoutRefs = useRef<NodeJS.Timeout[]>([])
```

### 2. Create Cleanup Function
```typescript
const cleanup = useCallback(() => {
  if (intervalRef.current) {
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }
  timeoutRefs.current.forEach(timeout => clearTimeout(timeout))
  timeoutRefs.current = []
}, [])
```

### 3. Add Unmount Cleanup
```typescript
useEffect(() => {
  return () => cleanup()
}, [cleanup])
```

### 4. Update typeCommand
```typescript
const typeCommand = useCallback((command: string, onComplete: () => void) => {
  setIsTyping(true)
  setCurrentCommand('')
  let index = 0
  
  const interval = setInterval(() => {
    // ... typing logic
  }, speed)
  
  intervalRef.current = interval  // Store for cleanup!
}, [dependencies])
```

### 5. Update showOutput
```typescript
const showOutput = useCallback((output: string[], onComplete: () => void) => {
  let outputIndex = 0
  
  const interval = setInterval(() => {
    // ... output logic
  }, speed)
  
  intervalRef.current = interval  // Store for cleanup!
}, [dependencies])
```

### 6. Track Timeouts
```typescript
const timeout = setTimeout(() => {
  // ... logic
}, delay)
timeoutRefs.current.push(timeout)  // Track for cleanup!
```

### 7. Call Cleanup in stopDemo/resetDemo
```typescript
const stopDemo = useCallback(() => {
  cleanup()
  setIsRunning(false)
  // ...
}, [cleanup])
```

## 🎯 Pattern Used in NeurondBDemoTerminal (Reference)

The fixed NeurondBDemoTerminal.tsx demonstrates the correct pattern with:
- ✅ intervalRef and timeoutRefs tracking
- ✅ cleanup() function
- ✅ useCallback for optimization
- ✅ Unmount cleanup
- ✅ Proper ref assignment in intervals
- ✅ Timeout tracking in arrays

This pattern should be applied to all 7 remaining terminals.

