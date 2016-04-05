  var w = 800;
  var h = 400;
  
  function getDate(date) {
    var month = date.getUTCMonth()+1;
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();
    return year + "-" + month + "-" + day;
  }


  var svg = d3.selectAll(".svg")
  
  .append("svg")
  .attr("width", w)
  .attr("height", h)
  .attr("class", "svg");


    var leaseData = [
  {
    rent: "1200",
    unitName: "A101",
    beginTimestamp: getDate(new Date(1328256000000)),
    endTimestamp: getDate(new Date(1359978400000)),
   
},

{
    rent: "1300",
    unitName: "B201",
    beginTimestamp: getDate(new Date(1298966400000)),
    endTimestamp: getDate(new Date(1398966400000)),
    
},

{
    rent: "1500",
    unitName: "A301",
    beginTimestamp: getDate(new Date(1275721200000)),
    endTimestamp: getDate(new Date(1298966400000)),
},

{
    rent: "1100",
    unitName: "A101",
    beginTimestamp: getDate(new Date(1298966400000)),
    endTimestamp: getDate(new Date(1310664000000)),
    
},

{
    rent: "2000",
    unitName: "A301",
    beginTimestamp: getDate(new Date(1357878400000)),
    endTimestamp: getDate(new Date(1369878400000)),
},

];

var dateFormat = d3.time.format("%Y-%m-%d");

var timeScale = d3.time.scale()
        .domain([d3.min(leaseData, function(d) {return dateFormat.parse(d.beginTimestamp);}),
                 d3.max(leaseData, function(d) {return dateFormat.parse(d.endTimestamp);})])
        .range([0,w-150]);

var categories = new Array();

for (var i = 0; i < leaseData.length; i++){
    categories.push(leaseData[i].unitName);
}

var catsUnfiltered = categories; //for vert labels

categories = checkUnique(categories);


makeGant(leaseData, w, h);

function makeGant(tasks, pageWidth, pageHeight){

var barHeight = 20;
var gap = barHeight + 4;
var topPadding = 75;
var sidePadding = 75;

var colorScale = d3.scale.linear()
    .domain([0, categories.length])
    .range(["#00B9FA", "#F95002"])
    .interpolate(d3.interpolateHcl);

makeGrid(sidePadding, topPadding, pageWidth, pageHeight);
drawRects(tasks, gap, topPadding, sidePadding, barHeight, colorScale, pageWidth, pageHeight);
vertLabels(gap, topPadding, sidePadding, barHeight, colorScale);

}


function drawRects(theArray, theGap, theTopPad, theSidePad, theBarHeight, theColorScale, w, h){

     var rectangles = svg.append('g')
     .selectAll("rect")
     .data(theArray)
     .enter();

    
   var units = [];

   function isInArray(value, array) {
    return array.indexOf(value) > -1;
   }

   var innerRects = rectangles.append("rect")
             .attr("rx", 3)
             .attr("ry", 3)
             .attr("x", function(d){
              return timeScale(dateFormat.parse(d.beginTimestamp)) + theSidePad;
              })
             .attr("y", function(d){
                if(isInArray(d.unitName, units)) {
                  return units.indexOf(d.unitName)*40 + 80;
                } else {
                  units.push(d.unitName); 
                  return units.indexOf(d.unitName)*40 + 80;
              }
            })
             .attr("width", function(d){
                return (timeScale(dateFormat.parse(d.endTimestamp))-timeScale(dateFormat.parse(d.beginTimestamp)));
             })
             .attr("height", theBarHeight)
             .attr("stroke", "none")
             .attr("fill", function(d){
              for (var i = 0; i < categories.length; i++){
                  if (d.unitName == categories[i]){
                    return d3.rgb(theColorScale(i));
                  }
              }
             })
   

         var rectText = rectangles.append("text")
               .text(function(d){
                return d.rent;
               })
               .attr("x", function(d){
                return (timeScale(dateFormat.parse(d.endTimestamp))-timeScale(dateFormat.parse(d.beginTimestamp)))/2 + timeScale(dateFormat.parse(d.beginTimestamp)) + theSidePad;
                })
               .attr("y", function(d, i){
                  return units.indexOf(d.unitName)*40 + 94;
              })
               .attr("font-size", 11)
               .attr("text-anchor", "middle")
               .attr("text-height", theBarHeight)
               .attr("fill", "#fff");


rectText.on('mouseover', function(e) {
 // console.log(this.x.animVal.getItem(this));
               var tag = "";

         if (d3.select(this).data()[0].details != undefined){
          tag = "Rent: " + d3.select(this).data()[0].rent + "<br/>" + 
                "unitName: " + d3.select(this).data()[0].unitName + "<br/>" + 
                "Starts: " + d3.select(this).data()[0].beginTimestamp + "<br/>" + 
                "Ends: " + d3.select(this).data()[0].endTimestamp;
         } else {
          tag = "Rent: " + d3.select(this).data()[0].rent + "<br/>" + 
                "unitName: " + d3.select(this).data()[0].unitName + "<br/>" + 
                "Starts: " + d3.select(this).data()[0].beginTimestamp + "<br/>" + 
                "Ends: " + d3.select(this).data()[0].endTimestamp;
         }
         var output = document.getElementById("tag");

          var x = this.x.animVal.getItem(this) + "px";
          var y = this.y.animVal.getItem(this) + 25 + "px";

         output.innerHTML = tag;
         output.style.top = y;
         output.style.left = x;
         output.style.display = "block";
       }).on('mouseout', function() {
         var output = document.getElementById("tag");
         output.style.display = "none";
             });


innerRects.on('mouseover', function(e) {
 //console.log(this);
         var tag = "";

         if (d3.select(this).data()[0].details != undefined){
          tag = "Rent: " + d3.select(this).data()[0].rent + "<br/>" + 
                "unitName: " + d3.select(this).data()[0].unitName + "<br/>" + 
                "Starts: " + d3.select(this).data()[0].beginTimestamp + "<br/>" + 
                "Ends: " + d3.select(this).data()[0].endTimestamp + "<br/>" + 
                "Details: " + d3.select(this).data()[0].details;
         } else {
          tag = "Rent: " + d3.select(this).data()[0].rent + "<br/>" + 
                "unitName: " + d3.select(this).data()[0].unitName + "<br/>" + 
                "Starts: " + d3.select(this).data()[0].beginTimestamp + "<br/>" + 
                "Ends: " + d3.select(this).data()[0].endTimestamp;
         }
         var output = document.getElementById("tag");

         var x = (this.x.animVal.value + this.width.animVal.value/2) + "px";
         var y = this.y.animVal.value + 25 + "px";

         output.innerHTML = tag;
         output.style.top = y;
         output.style.left = x;
         output.style.display = "block";
       }).on('mouseout', function() {
         var output = document.getElementById("tag");
         output.style.display = "none";

 });
}

function makeGrid(theSidePad, theTopPad, w, h){

var xAxis = d3.svg.axis()
    .scale(timeScale)
    .orient('bottom')
    .ticks(d3.time.years, 1)
    .tickSize(-h+theTopPad+20, 0, 0)
    .tickFormat(d3.time.format('%Y'));

var grid = svg.append('g')
    .attr('class', 'grid')
    .attr('transform', 'translate(' +theSidePad + ', ' + (h - 50) + ')')
    .call(xAxis)
    .selectAll("text")  
            .style("text-anchor", "middle")
            .attr("fill", "#000")
            .attr("stroke", "none")
            .attr("font-size", 10)
            .attr("dy", "1em");
}

function vertLabels(theGap, theTopPad, theSidePad, theBarHeight, theColorScale){
  var numOccurances = new Array();
  var prevGap = 0;

  for (var i = 0; i < categories.length; i++){
    numOccurances[i] = [categories[i], getCount(categories[i], catsUnfiltered)];
  }

  var axisText = svg.append("g") //without doing this, impossible to put grid lines behind text
   .selectAll("text")
   .data(numOccurances)
   .enter()
   .append("text")
   .text(function(d){
    return d[0];
   })
   .attr("x", 10)
   .attr("y", function(d, i){
    if (i > 0){
        for (var j = 0; j < i; j++){
          prevGap += numOccurances[i-1][1];
         // console.log(prevGap);
          return d[1]*theGap/2 + prevGap*theGap + theTopPad;
        }
    } else{
    return d[1]*theGap/2 + theTopPad;
    }
   });
  
}

function checkUnique(arr) {
    var hash = {}, result = [];
    for ( var i = 0, l = arr.length; i < l; ++i ) {
        if ( !hash.hasOwnProperty(arr[i]) ) { //it works with objects! in FF, at least
            hash[ arr[i] ] = true;
            result.push(arr[i]);
        }
    }
    return result;
}

//from this stackexchange question: http://stackoverflow.com/questions/14227981/count-how-many-strings-in-an-array-have-duplicates-in-the-same-array
function getCounts(arr) {
    var i = arr.length, // var to loop over
        obj = {}; // obj to store results
    while (i) obj[arr[--i]] = (obj[arr[i]] || 0) + 1; // count occurrences
    return obj;
}

// get specific from everything
function getCount(word, arr) {
    return getCounts(arr)[word] || 0;
}