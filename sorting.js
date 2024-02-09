// function to create random numbers which would be the height of the bars 
function randomNumbers() {
    const arr = [];
    for (let i = 1; i <= 50; i++) 
    {
        arr.push(Math.floor(Math.random() * 101));
    }
    return arr;
}

const barHeight = randomNumbers();

//function to create and style div elements
function makeDiv() {
    const elemHTM = document.getElementById('bars');
    elemHTM.style.height = '750px';

    for (let i = 0; i <  barHeight.length; i++) 
    {
        const newElement = document.createElement('div');
        newElement.classList.add('style-div');
        elemHTM.appendChild(newElement);
        
        // get the current div element by its class name
        
        const styleElem = document.getElementsByClassName('style-div')[i]
        styleElem.style.height = `${800 - barHeight[i]}px` ; // height of each bar is equilvalent to the elements of barHeight array.
        styleElem.style.width = '25px';
        styleElem.style.backgroundColor = 'yellow';
        styleElem.style.margin = '2px';
        styleElem.style.display = 'inline-block';    
    }
}

makeDiv();
const newArr = document.getElementById("button_left")
newArr.addEventListener("click", makeDiv);

//global variable to access elements representing bars
const divElem = document.getElementsByClassName('style-div')

//function to perform swapping
function swap(el1, el2){

    //stores computed styles of elements
    const style1 = window.getComputedStyle(el1);
    const style2 = window.getComputedStyle(el2);

    //storing height property 
    const transform1 = style1.getPropertyValue("height");
    const transform2 = style2.getPropertyValue("height");

    // swapping heights
    el1.style.height = transform2;
    el2.style.height = transform1;
}


// function to implement bubble sort 
async function bubbleSort() {
    for (let i = 0; i < divElem.length; i++) {
        let swapped = false
        for (let j = 0; j < divElem.length - 1; j++) {            
            // await new Promise(resolve => setTimeout(() => {resolve(), delay(5)}));

            if (parseInt(divElem[j].style.height) > parseInt(divElem[j + 1].style.height)) {
                await new Promise(resolve => setTimeout(resolve, 500))

                //changing bars' color during swapping
                divElem[j].style.background = "red";
                divElem[j+1].style.background ="red";

                await new Promise(resolve => setTimeout(resolve, 500))
                swap(divElem[j], divElem[j+1]);
                swapped = true;
            }
            
            // Resetting background color after comparison
            divElem[j].style.backgroundColor = "yellow";
            divElem[j + 1].style.backgroundColor = "yellow";
        }

        //if none elements are swapped the break the loop
        if (!swapped) {
            break;
        }
    }
}

const bubbleButton = document.getElementById('bubble-sort');
bubbleButton.addEventListener('click', bubbleSort);

//function to implement selection sort
async function selectionSort() {
    let min_idx;
    for (let i = 0; i < divElem.length -1; i++) {
        min_idx = i;
        for (let j = i + 1; j < divElem.length; j++) {
            if (parseInt(divElem[j].style.height) < parseInt(divElem[min_idx].style.height)) {
                min_idx = j;                
            }
        }
        await new Promise(resolve => setTimeout(resolve, 500))

        if (min_idx !== i) {
             // change color before swapping
            divElem[min_idx].style.backgroundColor = "red";
            divElem[i].style.backgroundColor = "red";
 
             // delay before swapping
            await new Promise(resolve => setTimeout(resolve, 500));
 
            swap(divElem[min_idx], divElem[i]);

            //delay after swapping
            await new Promise(resolve => setTimeout(resolve, 500))
            
        }
        // Reset color after swapping
       divElem[min_idx].style.backgroundColor = "yellow";
       divElem[i].style.backgroundColor = "yellow";
    }
}


const selectionButton = document.getElementById('selection-sort');
selectionButton.addEventListener('click', selectionSort);


// function to implement insertion sort
async function insertionSort() {
    for (let i = 1; i < divElem.length; i++) {
        let key = parseInt(divElem[i].style.height);
        let j = i - 1;

        divElem[i].style.backgroundColor = "red";
        divElem[j].style.backgroundColor = "red";

        await new Promise(resolve => setTimeout(resolve, 500))

        while (j >= 0 && parseInt(divElem[j].style.height) > key) {
            swap(divElem[j], divElem[j + 1]);
            j = j - 1;
            await new Promise(resolve => setTimeout(resolve, 500));
        }
     // Reset color after comparison
     divElem[i].style.backgroundColor = "yellow";
     divElem[j].style.backgroundColor = "yellow";

    }
}

const insertionButton = document.getElementById('insertion-sort');
insertionButton.addEventListener('click', insertionSort);


// function to implement quick sort
async function quickSort(low, high) {
    if (low < high) {
        // partition the array
        let pivotIndex = await partition(low, high);

        // pecursively sort the two partitions
        await quickSort(low, pivotIndex - 1);
        await quickSort(pivotIndex + 1, high);
    }
}

// function to partition the array
async function partition(low, high) {
    let pivot = parseInt(divElem[high].style.height);
    let i = low - 1;

    for (let j = low; j < high; j++) {
        // change color for elements being compared
        divElem[j].style.backgroundColor = "red";
        await new Promise(resolve => setTimeout(resolve, 500));

        if (parseInt(divElem[j].style.height) < pivot) {
            i++;
            swap(divElem[i], divElem[j]); // Swap elements using the swap function
        }

        // reset color after comparison
        divElem[j].style.backgroundColor = "yellow";
    }

    swap(divElem[i + 1], divElem[high]); // Swap elements using the swap function
    return i + 1;
}

const quickButton = document.getElementById('quick-sort');
quickButton.addEventListener('click', () => {
    quickSort(0, divElem.length - 1);
});

// function to implement merge sort
async function mergeSort(low = 0, high = divElem.length - 1) {
    if (low < high) {
        // find the middle point to divide the array into two halves
        let mid = Math.floor((low + high) / 2);

        // recursively sort the first and second halves
        await mergeSort(low, mid);
        await mergeSort(mid + 1, high);

        // merge the sorted halves
        await merge(low, mid, high);
    }
}

// function to merge two subarrays of arr[]
async function merge(low, mid, high) {
    let left = [];
    let right = [];

    // copy data to temp arrays left[] and right[]
    for (let i = low; i <= mid; i++) {
        left.push(parseInt(divElem[i].style.height));
    }
    for (let i = mid + 1; i <= high; i++) {
        right.push(parseInt(divElem[i].style.height));
    }

    let i = 0, j = 0, k = low;

    while (i < left.length && j < right.length) {
        // change color for elements being compared
        divElem[k].style.backgroundColor = "red";
        await new Promise(resolve => setTimeout(resolve, 500));

        if (left[i] <= right[j]) {
            divElem[k].style.height = `${left[i]}px`;
            i++;
        } else {
            divElem[k].style.height = `${right[j]}px`;
            j++;
        }
        k++;

        // reset color after comparison
        divElem[k - 1].style.backgroundColor = "yellow";
    }

    // copy the remaining elements of left[], if any
    while (i < left.length) {
        divElem[k].style.height = `${left[i]}px`;
        i++;
        k++;
    }

    // copy the remaining elements of right[], if any
    while (j < right.length) {
        divElem[k].style.height = `${right[j]}px`;
        j++;
        k++;
    }

    // delay for visualization
    await new Promise(resolve => setTimeout(resolve, 500));
}

const mergeButton = document.getElementById('merge-sort');
mergeButton.addEventListener('click', async () => {
    await mergeSort();
});

 