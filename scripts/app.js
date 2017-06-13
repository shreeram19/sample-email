$(document).ready(function(){

  
    function sortbasedOnALpha(a,b) {
  if (a.subject < b.subject)
    return -1;
  if (a.subject > b.subject)
    return 1;
  return 0;
}
    function populateEmail(searchtext,sorting) {
 $.ajax({url: "scripts/mail.json", success: function(result){
           var mails;
           if(result){
               mails= result.mails;
           }

           if(sorting == 'alpha'){
               
                mails.sort(sortbasedOnALpha);
                

           } else if(searchtext && !sorting){
               var newEmail =[];
               var searchReg = new RegExp(searchtext, 'gi');
               $.each(mails, function( index, value ) {
                   //
                   if(value.subject.match(searchReg)){
                     //  
                       newEmail.push(value);
                   }
               });
              mails = newEmail;
           }
           var ulEle = document.getElementById("mails");
           ulEle.innerHTML = "";
           $.each(mails, function( index, value ) {
              var t = document.querySelector('#mail-temp');
               t.content.querySelector('img').src = '../images/email.png';
              var spanele = t.content.querySelectorAll("span");

            spanele[0].textContent = value.name;
              spanele[1].textContent = value.subject;
            spanele[2].textContent = value.time;
           
            var clone = document.importNode(t.content, true);

           
  ulEle.append(clone);
       
            
          
            });
        }});
    }

    populateEmail();
    var timer;
   function customdebounce(){
     //  
        clearTimeout(timer);
        timer = setTimeout(function(){
    console.log("called");
 var searchtext = $("#email-search").val();
      populateEmail(searchtext);
}, 500);
   }
$( "#email-search" ).keyup(customdebounce);



$(".alpha").on("click",function(){
    $(".recent").removeClass("selected");
   populateEmail("","alpha");
   $(".alpha").addClass("selected");
});
 $(".recent").on("click",function(){
     $(".alpha").removeClass("selected");
     populateEmail("","recent");
     $(".recent").addClass("selected");
});
 
    
});