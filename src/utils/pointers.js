// Pointer labels - maps index to variable name for the current step

export function getPointers(cur, algo) {
  const ptrs = {};
  const { comparing=[], swapping=[], minIdx, line } = cur;

  if (algo === "bubble") {
    const src = swapping.length ? swapping : comparing;
    if (src.length >= 2) { ptrs[src[0]] = "j"; ptrs[src[1]] = "j+1"; }
  } else if (algo === "insertion") {
    if (line === "outer"  && comparing.length)        ptrs[comparing[0]] = "i";
    if (line === "key"    && comparing.length)        ptrs[comparing[0]] = "key";
    if (line === "jset"   && comparing.length >= 2)  { ptrs[comparing[0]] = "i"; ptrs[comparing[1]] = "j"; }
    if (line === "while"  && comparing.length >= 2)  { ptrs[comparing[0]] = "j"; ptrs[comparing[1]] = "key"; }
    if (line === "while"  && comparing.length === 1)   ptrs[comparing[0]] = "j";
    if (line === "shift"  && swapping.length >= 2)   { ptrs[swapping[0]] = "j"; ptrs[swapping[1]] = "←"; }
    if (line === "jdec"   && comparing.length)         ptrs[comparing[0]] = "j";
    if (line === "insert" && swapping.length)          ptrs[swapping[0]] = "key";
  } else if (algo === "selection") {
    if (minIdx != null)                                ptrs[minIdx] = "min";
    if (swapping.length >= 2) { ptrs[swapping[0]] = "i"; ptrs[swapping[1]] = "min"; }
    else if (comparing.length >= 2)                    ptrs[comparing[0]] = "j";
    else if (comparing.length === 1 && line === "minset") ptrs[comparing[0]] = "i";
  } else if (algo === "quick") {
    // Quick Sort pointers
    if (cur.pivot != null) ptrs[cur.pivot] = "pivot";
    if (cur.i != null && line === "iset") ptrs[cur.i + 1] = "i";
    if (cur.j != null) ptrs[cur.j] = "j";
    if (cur.low != null && cur.high != null) {
      ptrs[cur.low] = "low";
      ptrs[cur.high] = "high";
    }
    if (swapping.length >= 2) {
      ptrs[swapping[0]] = "i+1";
      ptrs[swapping[1]] = "pivot";
    }
  } else if (algo === "merge") {
    // Merge Sort pointers
    if (cur.left != null && cur.right != null) {
      ptrs[cur.left] = "left";
      ptrs[cur.right] = "right";
    }
    if (cur.mid != null) ptrs[cur.mid] = "mid";
    if (cur.k != null) ptrs[cur.k] = "k";
    if (cur.i != null && line === "while") ptrs[cur.left + cur.i] = "L[i]";
    if (cur.j != null && line === "while") ptrs[cur.mid + 1 + cur.j] = "R[j]";
    if (swapping.length) ptrs[swapping[0]] = "writing";
  }
  return ptrs;
}
