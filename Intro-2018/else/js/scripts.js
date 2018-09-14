$('#form').on('submit', function(){
	let date = $('#form-date').val();
	$.getJSON('https://api.nasa.gov/planetary/apod?api_key=WmBMhWaWxah92XV9zpZjqnWk6unLqawq7BlIGger&date='+date)
	.done(function(data){
			console.log(data);
      $('#image-titre').text(data.title);
      $('#image-description').text(data.explanation);
      $('time').text(data.date);
      
      if(data.media_type=='image'){
          $('#video-nasa').css("display", "none");
			    $('#image-nasa')
            .attr('src',data.url)
            .css("display", "block");
      }else{
          $('#image-nasa').css("display", "none");
          $('#video-nasa')
            .attr('src',data.url)
            .css("display", "block");
      }
		});
    return false;
});
