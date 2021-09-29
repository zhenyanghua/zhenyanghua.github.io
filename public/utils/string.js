export function kmpSearch(pattern, text) {
    const result = [];
   let m = pattern.length;
   let n = text.length;
   const lps = new Array(m);
   preProcess(lps, pattern);

   // point to the text
   let i = 0;
   // point to the pattern
   let j = 0;
   while (i < n) {
       if (text.charAt(i) === pattern.charAt(j)) {
           i++;
           j++;
       } else {
           if (j === 0) {
               i++;
           } else {
                j = lps[j - 1];
           }
       }
       // a pattern matching occurrence is found
       if (j === m) {
           if (j !== 0) {
               result.push(i - j);
               // reset j to account for overlapping
               j = lps[j - 1];
           }
       }
   }
   return result;
}

function preProcess(lps, pattern) {
    let len = 0;
    let i = 1;
    lps[0] = 0;

    while(i < lps.length) {
        if (pattern.charAt(i) === pattern.charAt(len)) {
            lps[i] = len + 1;
            len++;
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
}