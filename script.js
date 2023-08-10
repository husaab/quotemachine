
$(document).ready(function(){

    var apikey ="1PM86ivvoKYdiurkdcQQwlqzG6a6gSD8qWV7s9W0tTuavtINk7l1knqL"
    var backgroundcount=0;
    var authorcount=0;

    $("#newquote").click(function (event){
        event.preventDefault();

        imagesearch();
        quotechange();

        
    });

    function imagesearch(){
        $.ajax({
            method: 'GET',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", apikey);
            },

            url: "https://api.pexels.com/v1/search?query=nature&per_page=80",

            success: function(data) {
                console.log(data)
                console.log(data.photos[backgroundcount].src.original)
                console.log(data.photos[backgroundcount].avg_color)

                

                /*$('body').animate({ opacity: 0 }, 500, function () {
                    $(this).animate({ opacity: 1 }, 500);
                    $(":root").get(0).style.setProperty("--coloruse", data.photos[backgroundcount].avg_color)
                    $("body").css("background-image", "url(" + data.photos[backgroundcount].src.original + ")");
                });*/
            
                $("body").css("background-image", "url(" + data.photos[backgroundcount].src.original + ")");
                $(":root").get(0).style.setProperty("--coloruse", data.photos[backgroundcount].avg_color)
                
                backgroundcount+=1
            },

            error: function (error){
                console.log(error)
            }
        })
    }

    function quotechange(){
        $.ajax({
            method: 'GET',

            url: "https://philosophy-quotes-api.glitch.me/quotes",

            success: function(data) {
                console.log(data)
                console.log(data[authorcount].quote)
                $('.textbox').animate({ opacity: 0 }, 500, function () {
                    $(this).animate({ opacity: 1 }, 500);
                    $('#text').html(data[authorcount].quote);
                  });
                //$("#text").text(data[authorcount].quote)
                $('.author').animate({ opacity: 0 }, 500, function () {
                    $(this).animate({ opacity: 1 }, 500);
                    $('#author').html("- " + data[authorcount].source);
                  });
                
                authorcount+=1
            },

            error: function (error){
                console.log(error)
            }
        })
    }

    

});
