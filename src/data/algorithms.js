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
};
