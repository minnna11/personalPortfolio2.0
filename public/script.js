let btn = document.getElementById("test1");
let content = document.getElementById("test");
let lightbtn = document.getElementById("light");
let darkbtn = document.getElementById("dark");
const currentTheme = localStorage.getItem("theme"); //save user preference

if(currentTheme == "dark"){
    document.body.classList.add("darkTheme");
}else{
    document.body.classList.add("lightTheme");
}

lightbtn.onclick = function(){
    let theme="light";
    if(document.body.classList.contains("darkTheme")){
        document.body.classList.replace("darkTheme","lightTheme");
    }
    localStorage.setItem("theme", theme);
}
darkbtn.onclick = function(){
    let theme = "dark";
    localStorage.setItem("theme", theme);
    if(document.body.classList.contains("lightTheme")){
        document.body.classList.replace("lightTheme","darkTheme");
    }else{
        document.body.classList.add("darkTheme");
    }
}