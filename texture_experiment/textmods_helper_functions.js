// ---------------- 1. HELPER FUNCTIONS ------------------
// This .js file has al the alphanumeric functions
// necessary to generate random instances of the experiment.

// random function
function random(a,b) {
    if (typeof b == "undefined") {
	a = a || 2;
	return Math.floor(Math.random()*a);
    } else {
	return Math.floor(Math.random()*(b-a+1)) + a;
    }
}


function choose_from(arrayName) {
    var randomIndex = Math.floor(Math.random() * arrayName.length);
    var randomElement = arrayName[randomIndex];
    return randomElement
}

// range function
function range(a,b) {
    var rangeArray = new Array();

    for (var i=a; i<=b; i++) {
	rangeArray.push(i);
    }
    
    return rangeArray;
}

// unique function
function unique(arrayName)
{
    var newArray=new Array();
    label:for(var i=0; i<arrayName.length;i++ )
    {  
	for(var j=0; j<newArray.length;j++ )
	{
	    if(newArray[j]==arrayName[i]) 
		continue label;
	}
	newArray[newArray.length] = arrayName[i];
    }
    return newArray;
}

// shuffle function    -- What the hell is the comna for???!!!??!?!?!?! om() * i), 
function shuffle (a) 
{ 
    var o = [];
    for (var i=0; i < a.length; i++) { o[i] = a[i]; }
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), 
	 x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

// show slide function
function showSlide(id) {
    $(".slide").hide(); //jquery - all elements with class of slide - hide
    $("#"+id).show(); //jquery - element with given id - show
}



function bling_picture(id){
    var img = document.getElementById(id);
    var interval = window.setInterval(function(){
        if(img.display == 'hidden'){
            img.style.visibility = 'visible';
        }else{
            img.style.visibility = 'hidden';
        }
        }, 1000);
}

function showThisImage(id) {
    var img = document.getElementById(id);
    img.style.visibility = 'visible';
}

function showAndHide(id, ms) {
    var img = document.getElementById(id);
    img.style.visibility = 'visible';
    var interval = window.setTimeout(function(){
        img.style.visibility = 'hidden';
    }, ms);
}



// For button hideouts

function justHide(id) {
    var butt = document.getElementById(id);
    butt.style.visibility = 'hidden';
}

function justShow(id) {
    var butt = document.getElementById(id);
    butt.style.visibility = 'visible';
}




// For preloading
function preload(images, onLoadedOne, onLoadedAll) {
  var remainingImages = images.slice();
  var finished = false;

  // set delayInterval to 800 for testing to see that everything actually loads
  // for real use, set to 0 
  var loadDelayInterval = 0;

  var worker = function() {
    if (remainingImages.length == 0) {
      if (!finished) {
        finished = true;
        setTimeout(onLoadedAll, loadDelayInterval);
      }
    } else {

      var src = remainingImages.shift(); 
      
      var image = new Image();
      image.onload = function() {
        onLoadedOne();
        setTimeout(worker, loadDelayInterval);
      };
      image.src = src;
    }
  };

  // load images 6 at a time
  var concurrent = 5;
  for(var i = 0; i < concurrent; i++) {
    setTimeout(worker, 20 - i);
  };
}


var numLoadedImages = 0;
function onLoadedOne() {
  numLoadedImages++;
  $("#num-loaded").text(numLoadedImages); 
}

// define a function that will get called once
// all images have been successfully loaded
function onLoadedAll() {
  experiment.calibration_trial();
}








// The following function provides a way to "click" buttons with key presses

function searchKeyPress(e)
{
    // look for window.event in case event isn't passed in
    if (typeof e == 'undefined' && window.event) { e = window.event; }
    if (e.keyCode == 13)
    {
        document.getElementById('showImagesButton').click();
    }
}


// create HTML for property matrix and base image
// base = the kind of stimuli
function stimHTML(base, n, prop_mat, props, id, file_number) {
    var html = "";

    html += '<img src="images' + file_number +  '/' + base + '-base' + String(n+1) +
    '.png" width=200px height=200px alt="' + base + '" id="' + id + 'Image"/>';

    var c = 0;
    for (var p = 0; p < prop_mat.length; p++) {
	   if (prop_mat[p] == 1) {
    	    html += '<img  src="images3/' + base + '-' + props[p] + 
    		'.png" width=200px height=200px alt="' + props[p] + '" ' +
    		'id="' + id + 'Property' + String(c+1) + '"/>';
    	    c = c + 1; // keep count of how many properties we've stacked
	   }
    }

    return html;
}


// the patch of color by color? 

// Select color at first!
// Patch of cloth referent matcher. file_number = the image folder 
// disposition: where in the experiment the image will be put on
function colorPatchHTML(base, n, prop_mat, props, id, position, file_number, color_ordering) {
    var html = "";
    //html += '<img src="images3/square' + '-'  + base + '-' + stims_single_words  +'.png" width=200px height=200px id="objImage" />';
    html += '' //'<img src="images3/square-face-' + props[] +  '.png" width=200px height=200px id="objImage" />';


    html += '<img src="images3/square-' + base + '-' + props[n] +  
        '.png" width=80px height=80px id="objPatch" />';

    var c = 0;
    return html;
}



function hand_HTML(base, n, prop_mat, props, id, position) {
    var html = "";

    html += '<img  src="images3/hand.png" width=50px height=50px'  + 
     'alt="it is the hand!" id="objHandProperty"/>';
    //'alt="' + props[n] + '" ' + 'id="' + id + 'Property' + String(c+10) + '"/>';
    return html;
}



// The way to get the value of the selected radio button
// I don't use this one because it made IE not work
function getRadioVal(radioName) {
  var rads = document.getElementsByName(radioName);
  for(var rad in rads) {
    if(rads[rad].checked) {
      return rads[rad].value;
    }
  }
  return null;
}


// This was made for IE to work
function getNameRadioValue(idNameList) {
    var valueReturned = 0;
    for(var j=0; j<idNameList.length;j++ ) {
        if (document.getElementById(idNameList[j]).checked) {
            valueReturned = j + 1;
        }
    }
    return valueReturned;
}



function sumElements(arr) {
    var total_value = 0;
    for (var i =0; i < arr.length; i++) {
        total_value += arr[i];
    }
    return total_value
}




if (!('bind' in Function.prototype)) {
    Function.prototype.bind= function(owner) {
        var that= this;
        if (arguments.length<=1) {
            return function() {
                return that.apply(owner, arguments);
            };
        } else {
            var args= Array.prototype.slice.call(arguments, 1);
            return function() {
                return that.apply(owner, arguments.length===0? args : args.concat(Array.prototype.slice.call(arguments)));
            };
        }
    };
}

// Add ECMA262-5 string trim if not supported natively
//
if (!('trim' in String.prototype)) {
    String.prototype.trim= function() {
        return this.replace(/^\s+/, '').replace(/\s+$/, '');
    };
}

// Add ECMA262-5 Array methods if not supported natively
//
if (!('indexOf' in Array.prototype)) {
    Array.prototype.indexOf= function(find, i /*opt*/) {
        if (i===undefined) i= 0;
        if (i<0) i+= this.length;
        if (i<0) i= 0;
        for (var n= this.length; i<n; i++)
            if (i in this && this[i]===find)
                return i;
        return -1;
    };
}
if (!('lastIndexOf' in Array.prototype)) {
    Array.prototype.lastIndexOf= function(find, i /*opt*/) {
        if (i===undefined) i= this.length-1;
        if (i<0) i+= this.length;
        if (i>this.length-1) i= this.length-1;
        for (i++; i-->0;) /* i++ because from-argument is sadly inclusive */
            if (i in this && this[i]===find)
                return i;
        return -1;
    };
}
if (!('forEach' in Array.prototype)) {
    Array.prototype.forEach= function(action, that /*opt*/) {
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this)
                action.call(that, this[i], i, this);
    };
}
if (!('map' in Array.prototype)) {
    Array.prototype.map= function(mapper, that /*opt*/) {
        var other= new Array(this.length);
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this)
                other[i]= mapper.call(that, this[i], i, this);
        return other;
    };
}
if (!('filter' in Array.prototype)) {
    Array.prototype.filter= function(filter, that /*opt*/) {
        var other= [], v;
        for (var i=0, n= this.length; i<n; i++)
            if (i in this && filter.call(that, v= this[i], i, this))
                other.push(v);
        return other;
    };
}
if (!('every' in Array.prototype)) {
    Array.prototype.every= function(tester, that /*opt*/) {
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this && !tester.call(that, this[i], i, this))
                return false;
        return true;
    };
}
if (!('some' in Array.prototype)) {
    Array.prototype.some= function(tester, that /*opt*/) {
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this && tester.call(that, this[i], i, this))
                return true;
        return false;
    };
}