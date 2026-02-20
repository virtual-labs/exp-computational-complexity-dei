function getElement(id) {
  return document.getElementById(id);
}

const setText = (id, text) => {
  document.getElementById(id).innerText = text;
};

var selectedAlgorithms = [];
var n = -1;
var max_simulation_time = 5; // In seconds
var curr_step = 1;
const MAX_STEP = 5;

const lockButton = getElement("lock-button");
const availableAlgoDiv = getElement("available-algorithms");
const nselectorDiv = getElement("n-selector");

var algorithmsMapping = {
  a1: "Binary Search",
  a2: "Linear Search",
  a3: "Quick Sort",
  a4: "Bubble Sort",
  a5: "Matrix Addition",
  a6: "Matrix Multiplication",
  a7: "Subset Generation",
  a8: "Permutations Generation",
};

var timeComplexityMapping = {
  a1: "O(log N)",
  a2: "O(N)",
  a3: "O(N log N)",
  a4: "O(N²)",
  a5: "O(N²)",
  a6: "O(N³)",
  a7: "O(2ⁿ)",
  a8: "O(N!)",
};

var infoMapping = {
  1: "Binary search runs in O(log N), while linear search runs in O(N). Notice how binary search becomes significantly faster as N grows.",
  2: "Quicksort has an average-case time complexity of O(N log N), whereas bubble sort is O(N²). The difference becomes dramatic even for moderately large N.",
  3: "Matrix addition takes O(N²), while matrix multiplication takes O(N³). Space usage also becomes an important factor in matrix operations.",
  4: "Generating all subsets takes O(2ⁿ), and generating all permutations takes O(N!). Even for small values of N, these operations grow extremely fast.",
  5: "The graph may appear distorted or visually inaccurate due to the significantly different execution times of algorithms for various values of N. Therefore, it is better to compare algorithms that have similar or closely related time complexities."
};

const updateAvailableAlgorithms = () => {
  let element = getElement("selected-algorithms");

  let selected = "";
  selectedAlgorithms.sort();

  selectedAlgorithms.map((algo, idx) => {
    selected += `${String(algo).charAt(1)}. ${algorithmsMapping[algo]}  `;
    if (!getElement(algo).hidden) {
      getElement(algo).hidden = true;
    }
  });

  element.innerText = selected;
  getElement("selected-len").innerText = selectedAlgorithms.length;
};

const updateAvailableCustomAlgo = () => {
  let element = getElement("selected-algorithms");

  let selected = "";
  selectedAlgorithms.sort();

  selectedAlgorithms.map((algo, idx) => {
    selected += `${String(algo).charAt(1)}. ${algorithmsMapping[algo]}  `;
    let algoId = algo + "1";
    if (!getElement(algoId).hidden) {
      getElement(algoId).hidden = true;
    }
  });

  element.innerText = selected;
  getElement("selected-len").innerText = selectedAlgorithms.length;
};

const clearAvailable = () => {
  let element = getElement("selected-algorithms");

  var ids = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8']

  ids.forEach((id) => {
    getElement(id).hidden = false;
  })

  selectedAlgorithms = [];
  element.innerText = "";
  getElement("selected-len").innerText = 0;
};

const clearCustomAvailable = () => {
  let element = getElement("selected-algorithms");

  var ids = ['a11', 'a21', 'a31', 'a41', 'a51', 'a61', 'a71', 'a81']

  ids.forEach((id) => {
    getElement(id).hidden = false;
  })

  selectedAlgorithms = [];
  element.innerText = "";
  getElement("selected-len").innerText = 0;
}

const reset = () => {

  clearCustomAvailable();
  clearAvailable();

  n = -1;
  getElement("n-value").innerText = "";
  document.querySelectorAll('input[name="nValue"]').forEach((radio) => {
    radio.checked = false;
  });

  getElement("status").innerText = "";
  getElement("status-heading").hidden = true;
  getElement("results").innerHTML = "";
  getElement("table-heading").hidden = true;
  lockButton.checked = false;
  availableAlgoDiv.hidden = false;
  nselectorDiv.querySelectorAll("input").forEach((input) => {
    input.disabled = false;
  });
  getElement("select-time").disabled = false;
  getElement("clear").hidden = false;
  getElement("results").innerHTML = "";
  getElement("status-heading").hidden = true;
  getElement("table-heading").hidden = true;
  getElement("run").disabled = true;
  getElement("info-text").innerText = "Graph will be shown here";
  getElement('radio-div').hidden = false;
  getElement('select-time').selectedIndex = 0
  getElement('run').hidden = true;
  getElement('complexity-info').hidden = true;
  getElement('complexity-info').innerHTML = '';

  graphContent = {};

  const canvas = document.getElementById("graph-canvas");
  const ctx = canvas.getContext("2d");

  if (chartInstance !== null) {
    chartInstance.destroy();
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hanldeNSizeBasedOnStep();
};

const handleAddAlgorithm = (e) => {
  selectedAlgorithms.push(e.target.id);
  limitN(e.target.id);
  updateAvailableAlgorithms();

  n = -1;
  getElement("n-value").innerText = "";
  document.querySelectorAll('input[name="nValue"]').forEach((radio) => {
    radio.checked = false;
  });
};

const handleAddCustomAlgorithm = (e) => {
  var algoId = String(e.target.id).substring(0, 2);
  selectedAlgorithms.push(algoId);
  updateAvailableCustomAlgo();

  n = -1;
  getElement("n-value").innerText = "";
  document.querySelectorAll('input[name="nValue"]').forEach((radio) => {
    radio.checked = false;
  });

  if (algoId == 'a1' || algoId == 'a2') {
    getElement('n1000000').hidden = false;
  }
  else if (algoId == 'a3' || algoId == 'a4') {
    getElement('n3000').hidden = false;
  }
  else if (algoId == 'a5') {
    getElement('n1500').hidden = false;
  }
  else if (algoId == 'a6') {
    getElement('n300').hidden = false;
  }
  else if (algoId == 'a7') {
    getElement('n22').hidden = false;
  }
  else if (algoId == 'a8') {
    getElement('n10').hidden = false;
  }
};

const showAllSize = (algo) => {
  var ids = [
    "n10",
    "n15",
    "n22",
    "n300",
    "n1500",
    "n100000",
    "n200000",
    "n1000000",
  ];

  ids.map((id, idx) => {
    getElement(id).hidden = false;
  });
};

const limitN = (algo) => {
  n = -1;
};

function updateButtons() {
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  // Hide prev at step 1
  if (curr_step === 1) {
    prevBtn.style.display = "none";
  } else {
    prevBtn.style.display = "inline-block";
  }

  // Hide next at step 4
  if (curr_step === MAX_STEP) {
    nextBtn.style.display = "none";
  } else {
    nextBtn.style.display = "inline-block";
  }

  showAlgoBasedOnStep();
  hanldeNSizeBasedOnStep();
  clearCustomAvailable()
  reset();
}

function showAlgoBasedOnStep() {
  const step = curr_step;

  // Groups
  const linear = document.getElementById("algo-group-linear");
  const polynomial = document.getElementById("algo-group-polynomial");
  const sorting = document.getElementById("algo-sorting");
  const matrix = document.getElementById("algo-matrix");
  const exponential = document.getElementById("algo-group-exponential");
  const custom = document.getElementById("algo-group-custom");

  // Hide everything first
  linear.style.display = "none";
  polynomial.style.display = "none";
  sorting.style.display = "none";
  matrix.style.display = "none";
  exponential.style.display = "none";
  custom.style.display = "none";

  // Show based on step
  switch (step) {
    case 1:
      linear.style.display = "block";
      break;

    case 2:
      // Show sorting ONLY
      sorting.style.display = "block";
      // Keep polynomial container visible so layout doesn’t break
      polynomial.style.display = "block";
      break;

    case 3:
      // Show matrix ONLY
      matrix.style.display = "block";
      // Keep polynomial parent visible
      polynomial.style.display = "block";
      break;

    case 4:
      exponential.style.display = "block";
      break;
    case 5:
      custom.style.display = "block";
      break;
  }
}

function hanldeNSizeBasedOnStep() {
  getElement("n10").hidden = false;
  getElement("n15").hidden = false;
  getElement("n22").hidden = false;
  getElement("n200").hidden = false;
  getElement("n300").hidden = false;
  getElement("n500").hidden = false;
  getElement("n1000").hidden = false;
  getElement("n1500").hidden = false;
  getElement("n3000").hidden = false;
  getElement("n8000").hidden = false;
  getElement("n10000").hidden = false;
  getElement("n100000").hidden = false;
  getElement("n200000").hidden = false;
  getElement("n1000000").hidden = false;
  getElement("n10000000").hidden = false;

  if (curr_step == 1) {
    getElement("n10").hidden = true;
    getElement("n15").hidden = true;
    getElement("n22").hidden = true;
    getElement("n200").hidden = true;
    getElement("n300").hidden = true;
    getElement("n500").hidden = true;
    getElement("n1000").hidden = true;
    getElement("n1500").hidden = true;
    getElement("n3000").hidden = true;
    getElement("n8000").hidden = true;
    getElement("n10000").hidden = true;
  } else if (curr_step == 2) {
    // Sorting: show 1000, 1500, 3000, 8000, 10000
    getElement("n10").hidden = true;
    getElement("n15").hidden = true;
    getElement("n22").hidden = true;
    getElement("n200").hidden = true;
    getElement("n300").hidden = true;
    getElement("n500").hidden = true;
    getElement("n100000").hidden = true;
    getElement("n200000").hidden = true;
    getElement("n1000000").hidden = true;
    getElement("n10000000").hidden = true;
  } else if (curr_step == 3) {
    getElement("n10").hidden = true;
    getElement("n15").hidden = true;
    getElement("n22").hidden = true;
    getElement("n3000").hidden = true;
    getElement("n8000").hidden = true;
    getElement("n10000").hidden = true;
    getElement("n100000").hidden = true;
    getElement("n200000").hidden = true;
    getElement("n1000000").hidden = true;
    getElement("n10000000").hidden = true;
  } else if (curr_step == 4) {
    getElement("n200").hidden = true;
    getElement("n300").hidden = true;
    getElement("n500").hidden = true;
    getElement("n1000").hidden = true;
    getElement("n1500").hidden = true;
    getElement("n3000").hidden = true;
    getElement("n8000").hidden = true;
    getElement("n10000").hidden = true;
    getElement("n100000").hidden = true;
    getElement("n200000").hidden = true;
    getElement("n1000000").hidden = true;
    getElement("n10000000").hidden = true;
  }
  else if (curr_step == 5) {
    getElement("n10").hidden = true;
    getElement("n15").hidden = true;
    getElement("n22").hidden = true;
    getElement("n200").hidden = true;
    getElement("n300").hidden = true;
    getElement("n500").hidden = true;
    getElement("n1000").hidden = true;
    getElement("n1500").hidden = true;
    getElement("n3000").hidden = true;
    getElement("n8000").hidden = true;
    getElement("n10000").hidden = true;
    getElement("n100000").hidden = true;
    getElement("n200000").hidden = true;
    getElement("n1000000").hidden = true;
    getElement("n10000000").hidden = true;
  }
}

const handleNext = () => {
  if (curr_step < MAX_STEP) {
    curr_step += 1;
    console.log("Step:", curr_step);
    updateButtons();
  }
};

const handlePrev = () => {
  if (curr_step > 1) {
    curr_step -= 1;
    console.log("Step:", curr_step);
    updateButtons();
  }
};

// Call once on load
window.onload = updateButtons;

const handleMaxTime = (val) => {
  max_simulation_time = val;
};

getElement("n-selector").addEventListener("change", function (e) {
  if (e.target.name === "nValue") {
    n = e.target.value;
    getElement("n-value").innerText = n;
  }
});

var graphContent = {};


const runAlgo = async () => {
  const sizes = [
    5, 8, 10, 12, 15, 20, 22, 30, 40, 50, 100, 150, 200, 250, 300, 350, 400,
    500, 600, 800, 1000, 1200, 1500, 2000, 2500, 3000, 5000, 8000, 10000,
    15000, 25000, 50000, 100000, 150000, 200000, 250000, 500000, 1000000, 10000000,
  ];

  graphContent = {};
  getElement("steps-div").hidden = true;
  getElement("run").disabled = true;

  for (let size of sizes) {
    if (size <= n) {
      for (let algo of selectedAlgorithms) {
        // UI Update
        getElement(
          "status"
        ).innerText = `Running ${algorithmsMapping[algo]} for size ${size}`;

        // Allow repaint
        await new Promise((resolve) => setTimeout(resolve, 0));

        // Run algorithm
        let time = functionMapping[algo](size);

        console.log(algorithmsMapping[algo], time, size);

        // Init graph content if needed
        graphContent[algo] = graphContent[algo] || [[], []];

        // Push values
        if (time !== null && time < (max_simulation_time * 1000) + 0.002) {
          graphContent[algo][0].push(size);
          graphContent[algo][1].push(time);
        }

        // Table update
        const id = `${algo}+${size}`;
        if (time == null) {
          getElement(id).innerText = "Time/Memory Limit";
        }
        else {
          getElement(id).innerText = Number(time).toFixed(5);
        }
      }
    }
  }

  plotGraph();
  getElement("status").innerText = "Completed";
  getElement('status').after = ""
  getElement("steps-div").hidden = false;
  getElement("info-text").innerText = infoMapping[curr_step];
};

function convertToDataset() {
  const datasets = [];
  const colors = [
    "red",
    "blue",
    "green",
    "purple",
    "orange",
    "violet",
    "pink",
    "yellow",
  ];

  let index = 0;
  for (let algo in graphContent) {
    const xVals = graphContent[algo][0];
    const yVals = graphContent[algo][1];

    // Create points array with x and y paired together
    let points = [];
    xVals.forEach((x, i) => {
      points.push({ x: x, y: Number(yVals[i]) });
    });

    // Sort points by x (input size n) to ensure correct ordering
    points.sort((a, b) => a.x - b.x);

    // Now apply monotonicity fix based on sorted x order
    let prevY = -Infinity;
    points = points.map((point) => {
      let y = point.y;
      if (y <= prevY) {
        y = prevY + 0.001;
      }
      prevY = y;
      return { x: point.x, y: y };
    });

    datasets.push({
      label: algorithmsMapping[algo],
      data: points,
      borderColor: colors[index % colors.length],
      borderWidth: 2,
      fill: false,
    });

    index++;
  }

  return datasets;
}


let chartInstance = null;

function plotGraph() {
  const canvas = document.getElementById("graph-canvas");
  const ctx = canvas.getContext("2d");

  console.log(graphContent);

  // 🔥 1. Destroy previous chart (IMPORTANT)
  if (chartInstance !== null) {
    chartInstance.destroy();
  }

  // 🔥 2. Clear canvas (optional but clean)
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const pointStyles = [
    "circle",
    "triangle",
    "rect",
    "rectRounded",
    "rectRot",
    "cross",
    "crossRot",
    "star",
    "dash",
  ];

  const cleanedDatasets = convertToDataset(graphContent).map((ds) => {
    const maxN = Math.max(...ds.data.map((p) => p.x));

    return {
      ...ds,
      maxN,
    };
  });

  console.log(cleanedDatasets)

  const datasets = cleanedDatasets.map((ds, index) => ({
    ...ds,
    pointStyle: pointStyles[index % pointStyles.length],
    pointRadius: ds.data.map((p) => {
      if (ds.maxN >= 300) {
        return p.x < 100 ? 0 : 5;
      }
      return 5;
    }),
    pointHoverRadius: 5,
    borderWidth: 2,
    tension: 0.35,
  }));

  // 🔥 3. Create new chart and store instance
  chartInstance = new Chart(ctx, {
    type: "line",
    data: { datasets },
    options: {
      responsive: true,

      plugins: {
        legend: {
          labels: {
            color: "#000000ff",
            font: { size: 13 },
            usePointStyle: true,
          },
        },
        tooltip: {
          backgroundColor: "#ffffff",
          titleColor: "#000",
          bodyColor: "#000",
          borderColor: "#000",
          borderWidth: 1,
        },
      },

      scales: {
        x: {
          type: "linear",
          title: {
            display: true,
            text: "Input Size (n)",
            color: "#111",
            font: { size: 14, weight: "bold" },
          },
          grid: { color: "#ddd" },
          ticks: { color: "#000" },
          border: {
            color: "#000",
            width: 2,
          },
        },
        y: {
          title: {
            display: true,
            text: "Execution Time (ms)",
            color: "#111",
            font: { size: 14, weight: "bold" },
          },
          grid: { color: "#ddd" },
          ticks: { color: "#000" },
          border: {
            color: "#000",
            width: 2,
          },
        },
      },
    },
  });
}

const generateTable = () => {
  var n_sizes = [
    5, 8, 10, 12, 15, 20, 22, 30, 40, 50, 100, 150, 200, 250, 300, 350, 400,
    500, 600, 800, 1000, 1200, 1500, 2000, 2500, 3000, 5000, 8000, 10000,
    15000, 25000, 50000, 100000, 150000, 200000, 250000, 500000, 1000000, 10000000,
  ];

  const table = getElement("results");
  table.innerHTML = ``;

  const validSizes = n_sizes.filter((size) => {
    return size <= n;
  });

  // Head
  let thead = "<tr><th>Algorithm</th>";
  validSizes.forEach((n) => {
    thead += `<th>${n}</th>`;
  });
  thead += "</tr>";

  // Body
  let tbody = "";
  selectedAlgorithms.forEach((alg) => {
    tbody += `<tr><td>${algorithmsMapping[alg]}</td>`;

    validSizes.forEach((size) => {
      tbody += `<td id=${alg}+${size}></td>`;
    });

    tbody += "</tr>";
  });

  table.innerHTML = thead + tbody;
};

lockButton.addEventListener("change", () => {
  if (lockButton.checked) {
    if (selectedAlgorithms.length == 0) {
      window.alert("Choose atleast one Algorithm");
      lockButton.checked = false;
      return;
    }

    if (n == -1) {
      window.alert("Choose Maximum Value of N to proceed");
      lockButton.checked = false;
      return;
    }

    availableAlgoDiv.hidden = true;
    nselectorDiv.querySelectorAll("input").forEach((input) => {
      input.disabled = true;
    });
    getElement("select-time").disabled = true;
    getElement("status-heading").hidden = false;
    getElement("table-heading").hidden = false;
    getElement("run").disabled = false;
    getElement('radio-div').hidden = true;
    getElement('status').innerText = 'Waiting to run algorithms'
    getElement('run').hidden = false;

    // Show time complexity info for all steps except custom (step 5)
    if (curr_step !== 5) {
      let complexityText = '<strong>Time Complexities:</strong><br>';
      selectedAlgorithms.sort().forEach((algo, idx) => {
        complexityText += `${algorithmsMapping[algo]}: <strong>${timeComplexityMapping[algo]}</strong><br>`;
      });
      getElement('complexity-info').innerHTML = complexityText;
      getElement('complexity-info').hidden = false;
    }

    console.log(selectedAlgorithms, max_simulation_time, n);

    generateTable();
  } else {
    reset();
  }
});

const binarySearch = (size) => {
  // 1. Generate random array of given size

  let arr = new Array(size);
  for (let i = 0; i < size; i++) {
    arr[i] = Math.floor(Math.random() * 1000);
  }

  // 2. Sort array (binary search requires sorted)
  arr.sort((a, b) => a - b);

  // 3. Choose a random target value from array
  const target = -1;
  // 4. Binary search function
  const search = (arr, x) => {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      let mid = Math.floor((left + right) / 2);

      if (arr[mid] === x) return mid;
      if (arr[mid] < x) left = mid + 1;
      else right = mid - 1;
    }
    return -1;
  };

  let total = 0;
  const runs = 1000;
  for (let i = 0; i < runs; i++) {
    const start = performance.now();
    search(arr, target);
    total += performance.now() - start;
  }

  return total / runs;
};

const linearSearch = (size) => {
  // 1. Generate random array of given size

  let arr = new Array(size);
  for (let i = 0; i < size; i++) {
    arr[i] = Math.floor(Math.random() * 1000); // random values 0–999
  }

  // 2. Choose a random target value from array
  const target = -1;

  // 3. Linear search function
  const search = (arr, x) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === x) return i;
    }
  };

  let total = 0;
  const runs = 1000;
  for (let i = 0; i < runs; i++) {
    const start = performance.now();
    search(arr, target);
    total += performance.now() - start;
  }

  return total / runs;
};

const quickSortTest = (size) => {
  if (size > 10000) return null;
  // 1. Generate random array of given size
  let arr = new Array(size);
  for (let i = 0; i < size; i++) {
    arr[i] = Math.floor(Math.random() * 1000); // random values 0–999
  }

  // 2. Quick sort function
  const quickSort = (arr) => {
    if (arr.length <= 1) return arr;
    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] < pivot) left.push(arr[i]);
      else right.push(arr[i]);
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
  };

  // 3. Measure execution time over multiple runs
  let total = 0;
  const runs = 1;
  for (let i = 0; i < runs; i++) {
    // Copy the array each time to avoid sorting an already sorted array
    const arrCopy = [...arr];
    const start = performance.now();
    quickSort(arrCopy);
    total += performance.now() - start;
    if (total > max_simulation_time) break;
  }

  return total / runs; // average time in milliseconds
};

const bubbleSortTest = (size) => {
  if (size > 5000) return null; // strong safety limit — to avoid browser freeze

  // 1. Generate random array of given size
  let arr = new Array(size);
  for (let i = 0; i < size; i++) {
    arr[i] = Math.floor(Math.random() * 1000); // random values 0–999
  }

  // 2. Worst-case bubble sort (unoptimized, always full n² loops)
  const bubbleSortWorst = (arr) => {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
  };

  // 3. Measure execution time
  let total = 0;
  const runs = 1;

  for (let i = 0; i < runs; i++) {
    const arrCopy = [...arr];
    const start = performance.now();
    bubbleSortWorst(arrCopy);
    total += performance.now() - start;

    // protect UI
    if (total > max_simulation_time) break;
  }

  return total / runs; // average milliseconds
};

const matrixAddition = (size) => {
  if (size > 1500) return null;

  // 1. Generate two n x n matrices row by row
  const matrixA = [];
  const matrixB = [];

  for (let i = 0; i < size; i++) {
    const rowA = new Float32Array(size);
    const rowB = new Float32Array(size);
    for (let j = 0; j < size; j++) {
      rowA[j] = Math.floor(Math.random() * 100);
      rowB[j] = Math.floor(Math.random() * 100);
    }
    matrixA.push(rowA);
    matrixB.push(rowB);
  }

  // 2. Add two matrices row by row
  const addMatrices = (A, B) => {
    const result = [];
    for (let i = 0; i < size; i++) {
      const row = new Float32Array(size);
      for (let j = 0; j < size; j++) {
        row[j] = A[i][j] + B[i][j];
      }
      result.push(row);
    }
    return result;
  };

  // 3. Measure execution time over multiple runs
  let totalTime = 0;
  const runs = 10; // reduce runs for large n
  for (let k = 0; k < runs; k++) {
    const start = performance.now();
    addMatrices(matrixA, matrixB);
    totalTime += performance.now() - start;
  }

  // 4. Clear references for GC
  matrixA.length = 0;
  matrixB.length = 0;

  return totalTime / runs; // average time in ms
};

const matrixMultiplication = (size) => {
  if (size > 300) return null;

  // 1. Generate two random matrices row by row
  const matrixA = [];
  const matrixB = [];

  for (let i = 0; i < size; i++) {
    const rowA = new Float32Array(size);
    const rowB = new Float32Array(size);
    for (let j = 0; j < size; j++) {
      rowA[j] = Math.floor(Math.random() * 10);
      rowB[j] = Math.floor(Math.random() * 10);
    }
    matrixA.push(rowA);
    matrixB.push(rowB);
  }

  // 2. Multiply matrices with early stop
  const start = performance.now();
  const multiplyMatrices = (A, B) => {
    const result = [];
    for (let i = 0; i < size; i++) {
      const row = new Float32Array(size).fill(0);
      for (let j = 0; j < size; j++) {
        for (let k = 0; k < size; k++) {
          row[j] += A[i][k] * B[k][j];
          if (performance.now() - start > max_simulation_time * 1000) {
            return null; // stop early
          }
        }
      }
      result.push(row);
    }
    return result;
  };

  multiplyMatrices(matrixA, matrixB);

  const end = performance.now();

  // 3. Clear references for garbage collection
  matrixA.length = 0;
  matrixB.length = 0;

  return end - start; // execution time in ms
};

const subsetGeneration = (size) => {
  if (size > 22) return null;
  // 1. Generate random input array of given size
  const arr = new Array(size);
  for (let i = 0; i < size; i++) {
    arr[i] = Math.floor(Math.random() * 100); // random integers 0–99
  }

  const startTime = performance.now();

  const backtrack = (index) => {
    // Stop if max time exceeded
    if (performance.now() - startTime > max_simulation_time * 1000) return true;

    if (index === size) return false; // base case

    // Include current element
    if (backtrack(index + 1)) return true;

    // Exclude current element
    if (backtrack(index + 1)) return true;

    return false;
  };

  backtrack(0);

  const endTime = performance.now();
  return endTime - startTime; // executed time in milliseconds
};

const permutationGeneration = (size) => {
  if (size > 10) return null;
  // 1. Generate random input array of given size
  const arr = new Array(size);
  for (let i = 0; i < size; i++) {
    arr[i] = Math.floor(Math.random() * 100); // random integers 0–99
  }

  const startTime = performance.now();

  const backtrack = (l) => {
    // Stop if max time exceeded
    if (performance.now() - startTime > max_simulation_time * 1000) return true;

    if (l === size - 1) {
      // reached a valid permutation
      return false;
    }

    for (let r = l; r < size; r++) {
      // Stop immediately if time exceeded
      if (performance.now() - startTime > max_simulation_time * 1000)
        return true;

      // Swap
      [arr[l], arr[r]] = [arr[r], arr[l]];

      if (backtrack(l + 1)) return true;

      // Swap back (backtrack)
      [arr[l], arr[r]] = [arr[r], arr[l]];
    }

    return false;
  };

  backtrack(0);

  const endTime = performance.now();
  return endTime - startTime; // executed time in ms
};

var functionMapping = {
  a1: binarySearch,
  a2: linearSearch,
  a3: quickSortTest,
  a4: bubbleSortTest,
  a5: matrixAddition,
  a6: matrixMultiplication,
  a7: subsetGeneration,
  a8: permutationGeneration,
};