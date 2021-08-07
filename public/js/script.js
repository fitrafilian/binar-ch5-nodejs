

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

const data = document.cookie

console.log(data)

// function read_cookies(my_data){
//   document.write(document.cookie);
//   document.write("<br><br>");
//   var my_array=document.cookie.split(";");
//   for (let i=0;i<my_array.length;i++) {
//     //document.write(my_array[i] + "<br >");
//     var name=my_array[i].substr(0,my_array[i].indexOf("="),my_array[i]);
//     var value=my_array[i].substr(my_array[i].indexOf("=")+1);
//     //document.write( name + " : " + value + "<br>");
//     if(name==my_data){
//       return value;
//     }
//   }
  
// }
  
//   document.write("Welcome " + read_cookies("name"));