const links = [
    {
      label: "Week1 notes",
      url: "../portfolios/week1/index.html"  
    },
    {
      label: "Week2 notes",
      url: "../portfolios/week2/index.html"
    }, 
    {
      label: "Week3 notes",
      url: "../portfolios/week3/index.html"
    },
    {
      label: "Week4 notes",
      url: "../portfolios/week4/index.html"
    },
    {
      label: "Week5 notes",
      url: "../portfolios/week5/index.html"
    },  
    {
      label: "To Do App",
      url: "../portfolios/week6/index.html"
    },
    {
      label: "Week7 notes",
      url: "../portfolios/week7/index.html"
    },
    {
      label: "Week8 notes",
      url: "../portfolios/week8/index.html"
    },
    {
      label: "Week9 notes",
      url: "../portfolios/week9/index.html"
    },
    {
      label: "Week10 notes",
      url: "../portfolios/week10/index.html"
    },
    {
      label: "Project",
      url: "../portfolios/project/index.html"
    }            
  ]

var olist = document.getElementById("list");

for (let i=0; i < links.length; i++){
    let a = document.createElement("a");
    let li = document.createElement("li");
    a.textContent = links[i].label;
    a.setAttribute('href', links[i].url);
    li.appendChild(a);
    olist.appendChild(li); 
}






 