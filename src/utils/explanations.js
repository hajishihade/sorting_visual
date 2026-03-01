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
  };
  return m[algo]?.[line] || "Ready — press Play or step through manually";
}
