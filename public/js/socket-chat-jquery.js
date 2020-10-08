var params = new URLSearchParams(window.location.search);

var divUsuarios = $('#divUsuarios')

function rederizarUsuarios(usuarios){
    console.log(usuarios)
    
    var html = ''

   html +=  '<li>'
   html +=  ' <a href="javascript:void(0)" class="active"> Chat de <span>' + params.get('sala') + '</span></a>'
   html +=   '</li>'
   
   for(var i = 0; i < usuarios.length ; i++  ){

    html+='<li>'
     html += '<a data-id="' +  usuarios[i].id + '"  href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>'  +  usuarios[i].nombre  +  '<small class="text-success">online</small></span></a>'
    html+=  '</li>'

   }
   

   divUsuarios.html(html)
 
}