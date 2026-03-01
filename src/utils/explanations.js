// Explanation text for each algorithm step

export function getExplanation(line, step, algo) {
  // Pre-extract values to avoid nested template literal issues
  const comparing0 = step.comparing?.[0];
  const comparing1 = step.comparing?.[1];
  const swapping0 = step.swapping?.[0];
  const swapping1 = step.swapping?.[1];
  const arr0 = step.arr?.[comparing0];
  const arr1 = step.arr?.[comparing1];
  const minVal = step.arr?.[step.minIdx];

  const m = {
    bubble: {
      init: "Initializing — measuring array length n",
      outer: "Outer loop — starting a new pass to push the largest unsorted element rightward",
      inner: "Inner loop — scanning adjacent pairs in the unsorted region",
      compare: comparing0 != null
        ? `Comparing arr[${comparing0}]=${arr0} vs arr[${comparing1}]=${arr1} — out of order?`
        : "Comparing adjacent elements",
      swap: swapping0 != null
        ? `Swapping arr[${swapping0}] ↔ arr[${swapping1}] — larger bubbles right!`
        : "Swapping elements",
      done: "✓ Sorted! Every pass placed the next-largest in its correct spot.",
    },
    insertion: {
      init: "Initializing — index 0 is trivially sorted on its own",
      outer: comparing0 != null
        ? `Picking arr[${comparing0}]=${arr0} to insert into sorted portion`
        : "Picking next element to insert",
      key: "Storing current element as 'key' before shifting begins",
      jset: "Setting j to the last element of the sorted portion",
      while: "Checking: is there a sorted element larger than key to shift?",
      shift: swapping0 != null
        ? `Shifting arr[${swapping0}] right to open a slot`
        : "Shifting element right to make room",
      jdec: "Moving j one step left to compare the next sorted element",
      insert: swapping0 != null
        ? `Inserting key into correct position at index ${swapping0}`
        : "Placing key into correct position",
      done: "✓ Sorted! Each element was inserted into its rightful place.",
    },
    selection: {
      init: "Initializing — preparing to scan for minimums",
      outer: "Outer loop — scanning the unsorted region to find its minimum",
      minset: comparing0 != null
        ? `Assuming index ${comparing0} (value ${arr0}) is the current minimum`
        : "Setting starting minimum",
      inner: comparing0 != null
        ? `Scanning index ${comparing0} (${arr0}), current min at ${comparing1} (${arr1})`
        : "Scanning for smaller element",
      compare: comparing0 != null
        ? `Is arr[${comparing0}]=${arr0} smaller than min arr[${comparing1}]=${arr1}?`
        : "Comparing with current minimum",
      updatemin: step.minIdx != null
        ? `New minimum at index ${step.minIdx} (value ${minVal})!`
        : "Updating minimum index",
      swap: swapping0 != null
        ? `Placing minimum into sorted position ${swapping0} — locked in!`
        : "Swapping minimum into sorted position",
      done: "✓ Sorted! Every minimum was selected and placed correctly.",
    },
    quick: {
      init: "Initializing Quick Sort with the full array range",
      check: "Checking if the current subarray has more than one element",
      partition: "Partitioning the array around the pivot element",
      pivot: `Selecting pivot: arr[${step.high}]=${step.arr?.[step.high]} as the pivot`,
      iset: `Setting i to ${step.i} (points to smaller elements)`,
      loop: step.j != null
        ? `Checking if arr[${step.j}]=${step.arr?.[step.j]} <= pivot`
        : "Scanning for elements smaller than pivot",
      compare: step.j != null
        ? `Is arr[${step.j}]=${step.arr?.[step.j]} <= pivot?`
        : "Comparing with pivot",
      iinc: "Incrementing i - found element smaller than pivot",
      iswap: step.swapping?.length
        ? `Swapping arr[${step.swapping[0]}] ↔ arr[${step.swapping[1]}]`
        : "Swapping element into the smaller partition",
      swap: step.swapping?.length
        ? `Placing pivot in its correct position at index ${step.swapping[0]}`
        : "Placing pivot in correct position",
      return: `Partition complete! Pivot is now at index ${step.pivot}`,
      left: "Recursively sorting the left partition (elements smaller than pivot)",
      right: "Recursively sorting the right partition (elements larger than pivot)",
      done: "✓ Sorted! Quick Sort has partitioned all elements around their pivots.",
    },
    merge: {
      init: "Initializing Merge Sort with the full array range",
      check: "Checking if the current subarray has more than one element",
      mid: `Calculating middle index: mid = (${step.left} + ${step.right}) // 2 = ${step.mid}`,
      left: "Recursively sorting the left half",
      right: "Recursively sorting the right half",
      merge: `Merging sorted halves [${step.left}-${step.mid}] and [${step.mid+1}-${step.right}]`,
      copy: `Copying left half: [${step.L?.join(', ')}]`,
      copyr: `Copying right half: [${step.R?.join(', ')}]`,
      minit: "Setting up merge pointers",
      while: step.i != null && step.j != null
        ? `Comparing L[${step.i}]=${step.L?.[step.i]} with R[${step.j}]=${step.R?.[step.j]}`
        : "Merging sorted halves",
      compare: step.i != null && step.j != null
        ? `Is L[${step.i}]=${step.L?.[step.i]} <= R[${step.j}]=${step.R?.[step.j]}?`
        : "Comparing elements",
      lcopy: step.k != null
        ? `Placing L[${step.i}]=${step.L?.[step.i]} at arr[${step.k}]`
        : "Copying from left array",
      rcopy: step.k != null
        ? `Placing R[${step.j}]=${step.R?.[step.j]} at arr[${step.k}]`
        : "Copying from right array",
      kinc: "Moving to next position in merged array",
      lrem: "Copying remaining elements from left array",
      lremcpy: "Copying remaining left element",
      rrem: "Copying remaining elements from right array",
      rremcpy: "Copying remaining right element",
      done: "✓ Sorted! Merge Sort has combined all sorted subarrays.",
    },
  };
  return m[algo]?.[line] || "Ready — press Play or step through manually";
}
