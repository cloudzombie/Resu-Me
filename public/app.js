console.log('hello dave');
$(function() {
   // create a new  resume.
   $('#create-new-resume').on('click', function() {
      console.log('making new resume');
      $.get('/resumeform'); // render ejs
   });

   // create a wordcloud when the button is hit
   $('button#cloudQuery').click(function() {
      getCloudData();
   });
});



var getCloudData = function() {
   var query = '/cloud/' + $("input#job_title").val();
   console.log(query);
   $.get(query).done(showCloud);
}

// append a wordcloud with the class 'wordcloud'
var showCloud = function(data) {
   console.log("got to the d3 display function ");
$('.wordcloud').remove();
   //have to save as a variable in order to access.
   // data[0] is arbitrary
   var frequency_list = data[2].data;
   var color = d3.scale.linear()
      .domain([0, 1, 2, 3, 4, 5, 6, 10, 15, 20, 100])
      .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);

//create a function for scaling the size values

   d3.layout.cloud().size([600, 600])
      .words(frequency_list)
      .padding(5)
      .rotate(0)
      .font("Impact")
      .fontSize(function(d) {
         return d.size * 3;
      })
      .on("end", draw)
      .start();

   function draw(words) {
      d3.select("#cloudy").append("svg")
         .attr("width", "100%")
         .attr("height", 605)
         .attr("class", "wordcloud")
         .append("g")
         .attr("transform", "translate(300,300)")
         .selectAll("text")
         .data(words)
         .enter().append("text")
         .style("font-size", function(d) {
            return d.size + "px";
         })
         .style("fill", function(d, i) {
            return color(i);
         })
         .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
         })
         .text(function(d) {
            return d.text;
         });
   }
}
