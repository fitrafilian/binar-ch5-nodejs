document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// const cookieNow = document.cookie;
// console.log(cookieNow);

// function getCookie(name) {
//   // Split cookie string and get all individual name=value pairs in an array
//   var cookieArr = document.cookie.split(";");

//   // Loop through the array elements
//   for (var i = 0; i < cookieArr.length; i++) {
//     var cookiePair = cookieArr[i].split("=");

//     /* Removing whitespace at the beginning of the cookie name
//       and compare it with the given string */
//     if (name == cookiePair[0].trim()) {
//       // Decode the cookie value and return
//       return decodeURIComponent(cookiePair[1]);
//     }
//   }

//   // Return null if not found
//   return null;
// }

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
