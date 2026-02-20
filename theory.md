
## 1. What is Time Complexity?

**Time complexity** measures how the running time of an algorithm increases as the input size (n) grows. It helps us compare algorithms and predict their performance for large inputs.

We express time complexity using **Big-O notation**, which describes the upper bound (worst-case) growth rate.

---

## 2. Common Time Complexities

| Notation | Name | Example | Growth |
|----------|------|---------|--------|
| O(1) | Constant | Array access | Fastest |
| O(log n) | Logarithmic | Binary Search | Very Fast |
| O(n) | Linear | Linear Search | Moderate |
| O(n log n) | Linearithmic | Quick Sort, Merge Sort | Good |
| O(n²) | Quadratic | Bubble Sort, Matrix Addition | Slow |
| O(n³) | Cubic | Matrix Multiplication | Very Slow |
| O(2ⁿ) | Exponential | Subset Generation | Extremely Slow |
| O(n!) | Factorial | Permutation Generation | Impractical |

![Big O Complexity Chart](images/big_o_chart2.png)

---

## 3. Algorithms Covered in This Experiment

### 3.1 Binary Search – O(log n)

Searches a **sorted array** by repeatedly dividing the search interval in half.

**Pseudocode:**
```
BinarySearch(arr, target):
    left = 0, right = n - 1
    while left <= right:
        mid = (left + right) / 2
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

### 3.2 Linear Search – O(n)

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

### 3.3 Quick Sort – O(n log n) average

Divides array using a pivot and recursively sorts partitions.

**Pseudocode:**
```
QuickSort(arr):
    if length(arr) <= 1:
        return arr
    pivot = arr[last]
    left = elements < pivot
    right = elements >= pivot
    return QuickSort(left) + pivot + QuickSort(right)
```

**Why O(n log n)?** Each partition takes O(n), and there are O(log n) levels of recursion on average.

---

### 3.4 Bubble Sort – O(n²)

Repeatedly swaps adjacent elements if they are in wrong order.

**Pseudocode:**
```
BubbleSort(arr):
    for i = 0 to n - 1:
        for j = 0 to n - i - 1:
            if arr[j] > arr[j + 1]:
                swap(arr[j], arr[j + 1])
```

**Why O(n²)?** Two nested loops, each running up to n times.

---

### 3.5 Matrix Addition – O(n²)

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

### 3.6 Matrix Multiplication – O(n³)

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

### 3.7 Subset Generation – O(2ⁿ)

Generates all possible subsets of a set with n elements.

**Pseudocode:**
```
GenerateSubsets(arr, index, current):
    if index == n:
        output current subset
        return
    GenerateSubsets(arr, index + 1, current)           // exclude
    GenerateSubsets(arr, index + 1, current + arr[index])  // include
```

**Why O(2ⁿ)?** Each element has 2 choices (include/exclude), giving 2ⁿ subsets.

---

### 3.8 Permutation Generation – O(n!)

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

## 4. Comparison Table

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

## 5. Key Takeaways

1. **Logarithmic algorithms** (Binary Search) are much faster than linear ones for large inputs.
2. **O(n log n) sorting** algorithms like Quick Sort vastly outperform O(n²) algorithms like Bubble Sort.
3. **Polynomial time** algorithms (O(n²), O(n³)) are practical for moderate input sizes.
4. **Exponential and factorial** algorithms become impractical even for small n (e.g., n > 20).
5. Always consider **time complexity** when choosing an algorithm for large-scale problems.