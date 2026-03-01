// Sorting algorithm definitions with code and step generation

export const ALGORITHMS = {
  bubble: {
    name: "Bubble Sort",
    color: "#00b894",
    lightColor: "#00a080",
    complexity: "O(n²)",
    best: "O(n)",
    description: "Adjacent elements bubble up to their correct position",
    code: [
      { line: "def bubble_sort(arr):", indent: 0, type: "def" },
      { line: "    n = len(arr)", indent: 1, key: "init" },
      { line: "    for i in range(n):", indent: 1, key: "outer" },
      { line: "        for j in range(0, n-i-1):", indent: 2, key: "inner" },
      { line: "            if arr[j] > arr[j+1]:", indent: 3, key: "compare" },
      { line: "                arr[j], arr[j+1] = arr[j+1], arr[j]", indent: 4, key: "swap" },
      { line: "    return arr", indent: 1, key: "done" },
    ],
    generate: (arr) => {
      const steps = [], a = [...arr], n = a.length;
      steps.push({ arr:[...a], line:"init", comparing:[], swapping:[], sorted:[] });
      for (let i = 0; i < n; i++) {
        const sf = Array.from({length:i},(_,k)=>n-k-1);
        steps.push({ arr:[...a], line:"outer", comparing:[], swapping:[], sorted:sf });
        for (let j = 0; j < n-i-1; j++) {
          steps.push({ arr:[...a], line:"inner",   comparing:[j,j+1], swapping:[], sorted:sf });
          steps.push({ arr:[...a], line:"compare", comparing:[j,j+1], swapping:[], sorted:sf });
          if (a[j] > a[j+1]) { [a[j],a[j+1]]=[a[j+1],a[j]];
            steps.push({ arr:[...a], line:"swap", comparing:[], swapping:[j,j+1], sorted:sf }); }
        }
      }
      steps.push({ arr:[...a], line:"done", comparing:[], swapping:[], sorted:Array.from({length:n},(_,k)=>k) });
      return steps;
    },
  },
  insertion: {
    name: "Insertion Sort",
    color: "#e84393",
    lightColor: "#c0306e",
    complexity: "O(n²)",
    best: "O(n)",
    description: "Each element is inserted into its correct sorted position",
    code: [
      { line: "def insertion_sort(arr):", indent: 0, type: "def" },
      { line: "    n = len(arr)", indent: 1, key: "init" },
      { line: "    for i in range(1, n):", indent: 1, key: "outer" },
      { line: "        key = arr[i]", indent: 2, key: "key" },
      { line: "        j = i - 1", indent: 2, key: "jset" },
      { line: "        while j >= 0 and key < arr[j]:", indent: 2, key: "while" },
      { line: "            arr[j + 1] = arr[j]", indent: 3, key: "shift" },
      { line: "            j -= 1", indent: 3, key: "jdec" },
      { line: "        arr[j + 1] = key", indent: 2, key: "insert" },
      { line: "    return arr", indent: 1, key: "done" },
    ],
    generate: (arr) => {
      const steps = [], a = [...arr], n = a.length;
      steps.push({ arr:[...a], line:"init", comparing:[], swapping:[], sorted:[0] });
      for (let i = 1; i < n; i++) {
        const sf = Array.from({length:i},(_,k)=>k);
        steps.push({ arr:[...a], line:"outer",  comparing:[i],   swapping:[], sorted:sf });
        const key = a[i];
        steps.push({ arr:[...a], line:"key",    comparing:[i],   swapping:[], sorted:sf });
        let j = i-1;
        steps.push({ arr:[...a], line:"jset",   comparing:[i,j], swapping:[], sorted:sf });
        steps.push({ arr:[...a], line:"while",  comparing:[j,i], swapping:[], sorted:sf });
        while (j >= 0 && key < a[j]) {
          a[j+1]=a[j];
          steps.push({ arr:[...a], line:"shift", comparing:[], swapping:[j,j+1], sorted:sf });
          j--;
          steps.push({ arr:[...a], line:"jdec",  comparing:[j>=0?j:0], swapping:[], sorted:sf });
          steps.push({ arr:[...a], line:"while", comparing:[j>=0?j:0,j+1], swapping:[], sorted:sf });
        }
        a[j+1]=key;
        steps.push({ arr:[...a], line:"insert", comparing:[], swapping:[j+1], sorted:Array.from({length:i+1},(_,k)=>k) });
      }
      steps.push({ arr:[...a], line:"done", comparing:[], swapping:[], sorted:Array.from({length:n},(_,k)=>k) });
      return steps;
    },
  },
  selection: {
    name: "Selection Sort",
    color: "#e67e22",
    lightColor: "#c0620e",
    complexity: "O(n²)",
    best: "O(n²)",
    description: "Finds the minimum and places it into sorted position",
    code: [
      { line: "def selection_sort(arr):", indent: 0, type: "def" },
      { line: "    n = len(arr)", indent: 1, key: "init" },
      { line: "    for i in range(n-1):", indent: 1, key: "outer" },
      { line: "        min_idx = i", indent: 2, key: "minset" },
      { line: "        for j in range(i+1, n):", indent: 2, key: "inner" },
      { line: "            if arr[j] < arr[min_idx]:", indent: 3, key: "compare" },
      { line: "                min_idx = j", indent: 4, key: "updatemin" },
      { line: "        arr[i], arr[min_idx] = arr[min_idx], arr[i]", indent: 2, key: "swap" },
      { line: "    return arr", indent: 1, key: "done" },
    ],
    generate: (arr) => {
      const steps = [], a = [...arr], n = a.length;
      steps.push({ arr:[...a], line:"init", comparing:[], swapping:[], sorted:[], minIdx:null });
      for (let i = 0; i < n-1; i++) {
        const sf = Array.from({length:i},(_,k)=>k);
        steps.push({ arr:[...a], line:"outer",  comparing:[],    swapping:[], sorted:sf, minIdx:i });
        let minIdx=i;
        steps.push({ arr:[...a], line:"minset", comparing:[i],   swapping:[], sorted:sf, minIdx });
        for (let j = i+1; j < n; j++) {
          steps.push({ arr:[...a], line:"inner",   comparing:[j,minIdx], swapping:[], sorted:sf, minIdx });
          steps.push({ arr:[...a], line:"compare", comparing:[j,minIdx], swapping:[], sorted:sf, minIdx });
          if (a[j]<a[minIdx]) { minIdx=j;
            steps.push({ arr:[...a], line:"updatemin", comparing:[j], swapping:[], sorted:sf, minIdx }); }
        }
        [a[i],a[minIdx]]=[a[minIdx],a[i]];
        steps.push({ arr:[...a], line:"swap", comparing:[], swapping:[i,minIdx], sorted:Array.from({length:i+1},(_,k)=>k), minIdx:null });
      }
      steps.push({ arr:[...a], line:"done", comparing:[], swapping:[], sorted:Array.from({length:n},(_,k)=>k), minIdx:null });
      return steps;
    },
  },
  quick: {
    name: "Quick Sort",
    color: "#6c5ce7",
    lightColor: "#5a4ec4",
    complexity: "O(n log n)",
    best: "O(n log n)",
    description: "Divide and conquer - pivot-based partitioning",
    code: [
      { line: "def quick_sort(arr, low, high):", indent: 0, type: "def" },
      { line: "    if low < high:", indent: 1, key: "check" },
      { line: "        pi = partition(arr, low, high)", indent: 2, key: "partition" },
      { line: "        quick_sort(arr, low, pi - 1)", indent: 2, key: "left" },
      { line: "        quick_sort(arr, pi + 1, high)", indent: 2, key: "right" },
      { line: "def partition(arr, low, high):", indent: 0, type: "def" },
      { line: "    pivot = arr[high]", indent: 1, key: "pivot" },
      { line: "    i = low - 1", indent: 1, key: "iset" },
      { line: "    for j in range(low, high):", indent: 1, key: "loop" },
      { line: "        if arr[j] <= pivot:", indent: 2, key: "compare" },
      { line: "            i += 1", indent: 3, key: "iinc" },
      { line: "            arr[i], arr[j] = arr[j], arr[i]", indent: 3, key: "iswap" },
      { line: "    arr[i+1], arr[high] = arr[high], arr[i+1]", indent: 1, key: "swap" },
      { line: "    return i + 1", indent: 1, key: "return" },
    ],
    generate: (arr) => {
      const steps = [], a = [...arr], n = a.length;
      const sorted = new Set();

      function partition(low, high) {
        steps.push({ arr:[...a], line:"partition", comparing:[], swapping:[], sorted:Array.from(sorted), low, high, pivot:high });
        steps.push({ arr:[...a], line:"pivot", comparing:[high], swapping:[], sorted:Array.from(sorted), low, high, pivot:high });
        let i = low - 1;
        steps.push({ arr:[...a], line:"iset", comparing:[], swapping:[], sorted:Array.from(sorted), low, high, pivot:high, i });

        for (let j = low; j < high; j++) {
          steps.push({ arr:[...a], line:"loop", comparing:[j,high], swapping:[], sorted:Array.from(sorted), low, high, pivot:high, i, j });
          steps.push({ arr:[...a], line:"compare", comparing:[j,high], swapping:[], sorted:Array.from(sorted), low, high, pivot:high, i, j });
          if (a[j] <= a[high]) {
            i++;
            if (i !== j) {
              [a[i], a[j]] = [a[j], a[i]];
              steps.push({ arr:[...a], line:"iinc", comparing:[], swapping:[i,j], sorted:Array.from(sorted), low, high, pivot:high, i, j });
              steps.push({ arr:[...a], line:"iswap", comparing:[], swapping:[i,j], sorted:Array.from(sorted), low, high, pivot:high, i, j });
            } else {
              steps.push({ arr:[...a], line:"iinc", comparing:[], swapping:[], sorted:Array.from(sorted), low, high, pivot:high, i, j });
            }
          }
        }
        if (i + 1 !== high) {
          [a[i + 1], a[high]] = [a[high], a[i + 1]];
          steps.push({ arr:[...a], line:"swap", comparing:[], swapping:[i+1,high], sorted:Array.from(sorted), low, high, pivot:high });
        }
        steps.push({ arr:[...a], line:"return", comparing:[], swapping:[], sorted:Array.from(sorted), low, high, pivot:i+1 });
        return i + 1;
      }

      function quickSort(low, high) {
        if (low < high) {
          steps.push({ arr:[...a], line:"check", comparing:[], swapping:[], sorted:Array.from(sorted), low, high });
          const pi = partition(low, high);
          sorted.add(pi);
          quickSort(low, pi - 1);
          quickSort(pi + 1, high);
        } else if (low === high && low >= 0 && low < n) {
          sorted.add(low);
        }
      }

      steps.push({ arr:[...a], line:"init", comparing:[], swapping:[], sorted:[], low:0, high:n-1 });
      quickSort(0, n - 1);

      // Mark all as sorted at the end
      for (let i = 0; i < n; i++) sorted.add(i);
      steps.push({ arr:[...a], line:"done", comparing:[], swapping:[], sorted:Array.from(sorted) });
      return steps;
    },
  },
  merge: {
    name: "Merge Sort",
    color: "#00cec9",
    lightColor: "#00b5b0",
    complexity: "O(n log n)",
    best: "O(n log n)",
    description: "Divide and conquer - merge sorted halves",
    code: [
      { line: "def merge_sort(arr, left, right):", indent: 0, type: "def" },
      { line: "    if left < right:", indent: 1, key: "check" },
      { line: "        mid = (left + right) // 2", indent: 2, key: "mid" },
      { line: "        merge_sort(arr, left, mid)", indent: 2, key: "left" },
      { line: "        merge_sort(arr, mid+1, right)", indent: 2, key: "right" },
      { line: "        merge(arr, left, mid, right)", indent: 2, key: "merge" },
      { line: "def merge(arr, left, mid, right):", indent: 0, type: "def" },
      { line: "    L = arr[left:mid+1]", indent: 1, key: "copy" },
      { line: "    R = arr[mid+1:right+1]", indent: 1, key: "copyr" },
      { line: "    i = j = 0, k = left", indent: 1, key: "minit" },
      { line: "    while i < len(L) and j < len(R):", indent: 1, key: "while" },
      { line: "        if L[i] <= R[j]:", indent: 2, key: "compare" },
      { line: "            arr[k] = L[i]; i += 1", indent: 3, key: "lcopy" },
      { line: "        else:", indent: 2, key: "else" },
      { line: "            arr[k] = R[j]; j += 1", indent: 3, key: "rcopy" },
      { line: "        k += 1", indent: 2, key: "kinc" },
      { line: "    while i < len(L):", indent: 1, key: "lrem" },
      { line: "        arr[k] = L[i]; i += 1; k += 1", indent: 2, key: "lremcpy" },
      { line: "    while j < len(R):", indent: 1, key: "rrem" },
      { line: "        arr[k] = R[j]; j += 1; k += 1", indent: 2, key: "rremcpy" },
    ],
    generate: (arr) => {
      const steps = [], a = [...arr], n = a.length;
      const sorted = new Set();

      function merge(left, mid, right) {
        steps.push({ arr:[...a], line:"merge", comparing:[], swapping:[], sorted:Array.from(sorted), left, mid, right });
        const L = a.slice(left, mid + 1);
        const R = a.slice(mid + 1, right + 1);
        steps.push({ arr:[...a], line:"copy", comparing:[], swapping:[], sorted:Array.from(sorted), left, mid, right, L, R });
        steps.push({ arr:[...a], line:"copyr", comparing:[], swapping:[], sorted:Array.from(sorted), left, mid, right, L, R });

        let i = 0, j = 0, k = left;
        steps.push({ arr:[...a], line:"minit", comparing:[], swapping:[], sorted:Array.from(sorted), left, mid, right, L, R });

        while (i < L.length && j < R.length) {
          steps.push({ arr:[...a], line:"while", comparing:[left + i, mid + 1 + j], swapping:[], sorted:Array.from(sorted), left, mid, right, L, R, i, j, k });
          steps.push({ arr:[...a], line:"compare", comparing:[left + i, mid + 1 + j], swapping:[], sorted:Array.from(sorted), left, mid, right, L, R, i, j, k });
          if (L[i] <= R[j]) {
            a[k] = L[i];
            steps.push({ arr:[...a], line:"lcopy", comparing:[], swapping:[k], sorted:Array.from(sorted), left, mid, right, L, R, i, j, k });
            i++;
          } else {
            a[k] = R[j];
            steps.push({ arr:[...a], line:"rcopy", comparing:[], swapping:[k], sorted:Array.from(sorted), left, mid, right, L, R, i, j, k });
            j++;
          }
          k++;
          steps.push({ arr:[...a], line:"kinc", comparing:[], swapping:[], sorted:Array.from(sorted), left, mid, right, L, R, i, j, k });
        }

        while (i < L.length) {
          a[k] = L[i];
          steps.push({ arr:[...a], line:"lrem", comparing:[], swapping:[k], sorted:Array.from(sorted), left, mid, right, L, R, i, j, k });
          steps.push({ arr:[...a], line:"lremcpy", comparing:[], swapping:[k], sorted:Array.from(sorted), left, mid, right, L, R, i, j, k });
          i++;
          k++;
        }

        while (j < R.length) {
          a[k] = R[j];
          steps.push({ arr:[...a], line:"rrem", comparing:[], swapping:[k], sorted:Array.from(sorted), left, mid, right, L, R, i, j, k });
          steps.push({ arr:[...a], line:"rremcpy", comparing:[], swapping:[k], sorted:Array.from(sorted), left, mid, right, L, R, i, j, k });
          j++;
          k++;
        }
      }

      function mergeSort(left, right) {
        if (left < right) {
          steps.push({ arr:[...a], line:"check", comparing:[], swapping:[], sorted:Array.from(sorted), left, right });
          const mid = Math.floor((left + right) / 2);
          steps.push({ arr:[...a], line:"mid", comparing:[], swapping:[], sorted:Array.from(sorted), left, right, mid });
          mergeSort(left, mid);
          mergeSort(mid + 1, right);
          merge(left, mid, right);
        } else if (left === right && left >= 0 && left < n) {
          sorted.add(left);
        }
      }

      steps.push({ arr:[...a], line:"init", comparing:[], swapping:[], sorted:[], left:0, right:n-1 });
      mergeSort(0, n - 1);

      // Mark all as sorted at the end
      for (let i = 0; i < n; i++) sorted.add(i);
      steps.push({ arr:[...a], line:"done", comparing:[], swapping:[], sorted:Array.from(sorted) });
      return steps;
    },
  },
};
