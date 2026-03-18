
## 1. What is Time Complexity?

**Time complexity** measures how the running time of an algorithm increases as the input size (n) grows. It helps us compare algorithms and predict their performance for large inputs.

**n** denotes the **size of the input** (for example, number of elements in an array, or dimension of an n×n matrix).

For large inputs, we study growth using **asymptotic analysis**.

---

## 2. Asymptotic Analysis

In asymptotic analysis, we focus on how a function grows as n → ∞.

We **ignore**:
1. Constant factors (e.g., 2n and 100n grow the same way)
2. Lower-order terms (e.g., n² + n + 1 behaves like n² for large n)

This gives machine-independent comparisons between algorithms.

### 2.1 Big-O, Big-Ω, and Big-Θ

Let T(n) be running time and f(n) be a reference growth function.

- **Big-O**: T(n) = O(f(n)) means asymptotic **upper bound**.
    There exist constants c > 0 and n₀ such that:
    0 ≤ T(n) ≤ c·f(n), for all n ≥ n₀

- **Big-Ω**: T(n) = Ω(f(n)) means asymptotic **lower bound**.
    There exist constants c > 0 and n₀ such that:
    0 ≤ c·f(n) ≤ T(n), for all n ≥ n₀

- **Big-Θ**: T(n) = Θ(f(n)) means **tight bound** (both upper and lower).
    There exist constants c₁, c₂ > 0 and n₀ such that:
    0 ≤ c₁f(n) ≤ T(n) ≤ c₂f(n), for all n ≥ n₀

So, Θ(f(n)) precisely captures the asymptotic order, while O(f(n)) only gives an upper limit.

### 2.2 Little-o and Little-ω (Strict Bounds)

- **Little-o**: T(n) = o(f(n)) means T(n) grows strictly slower than f(n).
    Equivalent limit form:
    lim(n→∞) T(n)/f(n) = 0

- **Little-ω**: T(n) = ω(f(n)) means T(n) grows strictly faster than f(n).
    Equivalent limit form:
    lim(n→∞) T(n)/f(n) = ∞

### 2.3 Example of Asymptotic Simplification

If
T(n) = 4n² + 7n + 10
then asymptotically T(n) = Θ(n²), because the n² term dominates for large n.

---

## 3. Common Time Complexities

| Notation | Name | Example | Running Time |
|----------|------|---------|--------|
| O(1) | Constant | Array access | Fastest |
| O(log n) | Logarithmic | Binary Search | Very Fast |
| O(n) | Linear | Linear Search | Moderate |
| O(n log n) | Linearithmic | Quick Sort, Merge Sort | Good |
| O(n²) | Quadratic | Bubble Sort, Matrix Addition | Slow |
| O(n³) | Cubic | Matrix Multiplication | Very Slow |
| O(2ⁿ) | Exponential | Subset Generation | Extremely Slow |
| O(n!) | Factorial | Permutation Generation | Impractical |

![Big O Complexity Chart](images/tc-flow.png)

---

## 4. Algorithms Covered in This Experiment

### 4.1 Binary Search – O(log n)

Searches a **sorted array** by repeatedly dividing the search interval in half.

**Pseudocode:**
```
BinarySearch(arr, target):
    left = 0
    right = n - 1
    while left <= right:
        mid = left + (right - left) // 2
        if arr[mid] == target:
            return mid
        else if arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
```

**Why O(log n)?** Each comparison eliminates half the remaining elements.

---

### 4.2 Linear Search – O(n)

Searches an array by checking each element one by one.

**Pseudocode:**
```
LinearSearch(arr, target):
    for i = 0 to n - 1:
        if arr[i] == target:
            return i
    return -1
```

**Why O(n)?** In the worst case, we check all n elements.

---

### 4.3 Quick Sort – O(n log n) average

Divides array using a pivot and recursively sorts partitions.

**Pseudocode:**
```
QuickSort(arr, low, high):
    if low < high:
        p = Partition(arr, low, high)
        QuickSort(arr, low, p - 1)
        QuickSort(arr, p + 1, high)

// Initial call: QuickSort(arr, 0, n - 1)

Partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j = low to high - 1:
        if arr[j] <= pivot:
            i = i + 1
            swap(arr[i], arr[j])
    swap(arr[i + 1], arr[high])
    return i + 1
```

**Why O(n log n)?** Each partition takes O(n), and there are O(log n) levels of recursion on average.

---

### 4.4 Bubble Sort – O(n²)

Repeatedly swaps adjacent elements if they are in wrong order.

**Pseudocode:**
```
BubbleSort(arr):
    for i = 0 to n - 2:
        for j = 0 to n - i - 2:
            if arr[j] > arr[j + 1]:
                swap(arr[j], arr[j + 1])
```

**Why O(n²)?** Two nested loops, each running up to n times.

---

### 4.5 Matrix Addition – O(n²)

Adds two n×n matrices element by element.

**Pseudocode:**
```
MatrixAdd(A, B):
    for i = 0 to n - 1:
        for j = 0 to n - 1:
            C[i][j] = A[i][j] + B[i][j]
    return C
```

**Why O(n²)?** We visit each of the n² elements once.

---

### 4.6 Matrix Multiplication – O(n³)

Multiplies two n×n matrices using the standard algorithm.

**Pseudocode:**
```
MatrixMultiply(A, B):
    for i = 0 to n - 1:
        for j = 0 to n - 1:
            C[i][j] = 0
            for k = 0 to n - 1:
                C[i][j] += A[i][k] * B[k][j]
    return C
```

**Why O(n³)?** Three nested loops, each running n times.

---

### 4.7 Subset Generation – O(2ⁿ)

Generates all possible subsets of a set with n elements.

**Pseudocode:**
```
GenerateSubsets(arr, index, current):
    if index == n:
        output current subset
        return
    GenerateSubsets(arr, index + 1, current)                       // exclude
    GenerateSubsets(arr, index + 1, current ∪ {arr[index]})        // include
```

**Why O(2ⁿ)?** Each element has 2 choices (include/exclude), giving 2ⁿ subsets.

---

### 4.8 Permutation Generation – O(n!)

Generates all possible arrangements of n elements.

**Pseudocode:**
```
GeneratePermutations(arr, left):
    if left == n - 1:
        output arr
        return
    for i = left to n - 1:
        swap(arr[left], arr[i])
        GeneratePermutations(arr, left + 1)
        swap(arr[left], arr[i])  // backtrack
```

**Why O(n!)?** There are n! permutations of n distinct elements.

---

## 5. Comparison Table

| Algorithm | Best Case | Average Case | Worst Case | Space |
|-----------|-----------|--------------|------------|-------|
| Binary Search | O(1) | O(log n) | O(log n) | O(1) |
| Linear Search | O(1) | O(n) | O(n) | O(1) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) |
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Matrix Addition | O(n²) | O(n²) | O(n²) | O(n²) |
| Matrix Multiplication | O(n³) | O(n³) | O(n³) | O(n²) |
| Subset Generation | O(2ⁿ) | O(2ⁿ) | O(2ⁿ) | O(n) |
| Permutations | O(n!) | O(n!) | O(n!) | O(n) |

---

## 6. Key Takeaways

1. **Logarithmic algorithms** (Binary Search) are much faster than linear ones for large inputs.
2. **O(n log n) sorting** algorithms like Quick Sort vastly outperform O(n²) algorithms like Bubble Sort.
3. **Polynomial time** algorithms (O(n²), O(n³)) are practical for moderate input sizes.
4. **Exponential and factorial** algorithms become impractical even for small n (e.g., n > 20).
5. Always consider **time complexity** when choosing an algorithm for large-scale problems.