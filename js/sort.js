var  arr=[1,2,3,5,4];
var  arrN=[];
arrN=insertionSort(arr);
arrN=binaryInsertionSort(arr);
arrN=selectionSort(arr);
arrN=bubbleSort(arr);
arrN=quickSort(arr,0,arr.length-1);
arrN=heapSort(arr);
arrN=mergeSort(arr);
arrN=bucketSort(arr,arr.length);
arrN=countingSort(arr);
console.log(arrN);

function insertionSort(array) {
    if(Object.prototype.toString.call(array).slice(8, -1) ==='Array') {
        for(var  i = 1; i < array.length; i++) {
            var  key = array[i];
            var  j = i - 1;
            while(j >= 0 && array[j] > key) {
                array[j + 1] = array[j];
                j--;
            }
            array[j + 1] = key;
        }
        return  array;
    }else{
        return 'array is not an Array!';
    }
}

function binaryInsertionSort(array) {
    if(Object.prototype.toString.call(array).slice(8, -1) ==='Array') {
        for(var  i = 1; i < array.length; i++) {
        	//寻找插入位置
            var  key = array[i], left = 0, right = i - 1;
            while(left <= right) {
                var  middle = parseInt((left + right) / 2);
                if(key < array[middle]) {
                    right = middle - 1;
                }else{
                    left = middle + 1;
                } 
            }
            for(var j = i - 1; j >= left; j--) {
                array[j + 1] = array[j];
            }
            array[left] = key;
        }
        return  array;
    }else{
        return  'array is not an Array!';
    }
}

function selectionSort(array) {
    if(Object.prototype.toString.call(array).slice(8, -1) ==='Array') {
        var  len = array.length, temp;
        for(var  i = 0; i < len - 1; i++) {
            var  min = array[i];
            for(var  j = i + 1; j < len; j++) {
                if(array[j] < min) {
                    temp = min;
                    min = array[j];
                    array[j] = temp;
                }
            }
            array[i] = min;
        }
        return  array;
    }else{
        return 'array is not an Array!';
    }
}

function bubbleSort(array) {
    if(Object.prototype.toString.call(array).slice(8, -1) ==='Array') {
        var len = array.length, temp;
        for(var i = 0; i < len - 1; i++) {
            for(var j = len - 1; j >= i; j--) {
                if(array[j] < array[j - 1]) {
                    temp = array[j];
                    array[j] = array[j - 1];
                    array[j - 1] = temp;
                }
            }
        }
        return array;
    }else{
        return 'array is not an Array!';
    }
}

function quickSort(array, left, right) {
    if(Object.prototype.toString.call(array).slice(8, -1) ==='Array'&&typeof left ==='number'&&typeof right ==='number') {
        if(left < right) {
            var x = array[right], i = left - 1, temp;
            for(var j = left; j <= right; j++) {
                if(array[j] <= x) {
                    i++;
                    temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
            }
            quickSort(array, left, i - 1);
            quickSort(array, i + 1, right);
        };
    }else{
        return 'array is not an Array or left or right is not a number!';
    }
}

/*方法说明：堆排序
@param  array 待排序数组*/          
function heapSort(array) {
    if(Object.prototype.toString.call(array).slice(8, -1) ==='Array') {
        //建堆
        var heapSize = array.length, temp;
        for(var i = Math.floor(heapSize / 2); i >= 0; i--) {
            heapify(array, i, heapSize);
        }
  
        //堆排序
        for(var j = heapSize - 1; j >= 1; j--) {
            temp = array[0];
            array[0] = array[j];
            array[j] = temp;
            heapify(array, 0, --heapSize);
        }
    }else{
        return 'array is not an Array!';
    }
}
/*方法说明：维护堆的性质
@param  arr 数组
@param  x   数组下标
@param  len 堆大小*/
function heapify(arr, x, len) {
    if(Object.prototype.toString.call(arr).slice(8, -1) ==='Array'&&typeof x ==='number') {
        var l = 2 * x, r = 2 * x + 1, largest = x, temp;
        if(l < len && arr[l] > arr[largest]) {
            largest = l;
        }
        if(r < len && arr[r] > arr[largest]) {
            largest = r;
        }
        if(largest != x) {
            temp = arr[x];
            arr[x] = arr[largest];
            arr[largest] = temp;
            heapify(arr, largest, len);
        }
    }else{
        return 'arr is not an Array or x is not a number!';
    }
}

function mergeSort(array, p, r) {
    if(p < r) {
        var q = Math.floor((p + r) / 2);
        mergeSort(array, p, q);
        mergeSort(array, q + 1, r);
        merge(array, p, q, r);
    }
}
function merge(array, p, q, r) {
    var n1 = q - p + 1, n2 = r - q, left = [], right = [], m = n = 0;
    for(var i = 0; i < n1; i++) {
        left[i] = array[p + i];
    }
    for(var j = 0; j < n2; j++) {
        right[j] = array[q + 1 + j];
    }
    left[n1] = right[n2] = Number.MAX_VALUE;
    for(var k = p; k <= r; k++) {
        if(left[m] <= right[n]) {
            array[k] = left[m];
            m++;
        }else{
            array[k] = right[n];
            n++;
        }
    }
}

/*方法说明：桶排序
@param  array 数组
@param  num   桶的数量*/
function bucketSort(array, num) {
    if(array.length <= 1) {
        return array;
    }
    var len = array.length, buckets = [], result = [], min = max = array[0], regex ='/^[1-9]+[0-9]*$/', space, n = 0;
    num = num || ((num > 1 && regex.test(num)) ? num : 10);
    for(var i = 1; i < len; i++) {
        min = min <= array[i] ? min : array[i];
        max = max >= array[i] ? max : array[i];
    }
    space = (max - min + 1) / num;
    for(var j = 0; j < len; j++) {
        var index = Math.floor((array[j] - min) / space);
        if(buckets[index]) {  //  非空桶，插入排序
            var k = buckets[index].length - 1;
            while(k >= 0 && buckets[index][k] > array[j]) {
                buckets[index][k + 1] = buckets[index][k];
                k--;
            }
            buckets[index][k + 1] = array[j];
        }else{   //空桶，初始化
            buckets[index] = [];
            buckets[index].push(array[j]);
        }
    }
    while(n < num) {
        result = result.concat(buckets[n]);
        n++;
    }
    return result;
}

function countingSort(array) {
    var len = array.length, B = [], C = [], min = max = array[0];
    for(var i = 0; i < len; i++) {
        min = min <= array[i] ? min : array[i];
        max = max >= array[i] ? max : array[i];
        C[array[i]] = C[array[i]] ? C[array[i]] + 1 : 1;
    }
    for(var j = min; j < max; j++) {
        C[j + 1] = (C[j + 1] || 0) + (C[j] || 0);
    }
    for(var k = len - 1; k >=0; k--) {
        B[C[array[k]] - 1] = array[k];
        C[array[k]]--;
    }
    return B;
}