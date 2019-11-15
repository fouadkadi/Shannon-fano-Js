var textfield;
var button;
var main_container;
var result_div;


function setup() {

    //Create the container
    main_container=createDiv();
    main_container.center('horizontal');
    main_container.style('width', '40%');
    main_container.style('display','inline-block');
    
    
    // Create the text field 
  textfield=createElement('textarea', '');
  textfield.elt.placeholder = 'Votre text va ici!';
  textfield.style('width', '100%');
  textfield.style('height', '150px');
  textfield.style('padding','16px 20px');
  textfield.style('border-radius','4px');
  textfield.style('font-family','"Arial", Times, sans-serif');

  





  // create the button 
  button=createButton('Coder');
  button.style('background-color','white');
  button.style('width','100%');
  button.style('border', '2px solid #008CBA');
  button.style('color','black');
  button.style('padding','16px 32px');
  button.style('text-align','center');
  button.style('text-decoration', 'none');
  button.style('border-radius','4px');
  button.style('font-size','20px');
  button.style('margin',' 10px auto 20px auto');
  button.style('-webkit-transition-duration', '0.4s'); /* Safari */
  button.style('transition-duration','0.4s');


  button.mousePressed(coder);
  button.mouseOver(hover);
  button.mouseOut(unhover);
  main_container.child(textfield);
  main_container.child(button);
  main_container.child(button);

}

function hover()
{
  button.style('background-color','#008CBA');
  button.style('color','white');

}

function unhover()
{
  button.style('background-color','white'); 
  button.style('color','black'); 
}

function create_tabulation(tab)
{
  var up ;
  var down;
  var main;
  var childs ;

  childs=main_container.child();
  if(childs.length==3) (main_container.child())[2].remove();
  
  var principal;
  principal=createDiv();
  principal.style('width','100%');


  tab.forEach(element => {
    
  
 
  main=createDiv();
  main.style('display','inline-block');
  main.style('width','19%');
  main.style('margin','4px 3%');


  up=createDiv(element[0]);
  up.style('border-radius','4px 4px 0px 0px');
  up.style('font-size','20px');
  up.style('border', '2px solid #008CBA');
  up.style('font-family','"Arial", Times, sans-serif');
  up.style('text-align','center');
  up.style('background-color','#008CBA');
  up.style('color','white');


  down=createDiv(element[1]);
  down.style('border-radius','0px 0px 4px 4px ');
  down.style('font-size','10px');
  down.style('background-color','#ffffff');
  down.style('font-family','"Arial", Times, sans-serif');
  down.style('text-align','center');
  down.style('color','black');
  down.style('border', '2px solid #008CBA');

  
  main.child(up);
  main.child(down);

  principal.child(main);

});
  

main_container.child(principal)
  
}

function draw() {



}

// Renvoie la liste de tous les char
function all_char(str)
{
  return [...new Set(str.match(/[A-z]/g))];
}

// Calcule les occurances
function nb_apr(sub,str) {
  var regExp = new RegExp(sub, "gi");
  return (str.match(regExp) || []).length;
}
// Associe une occurence à un char

function Maping(str)
{
  return sort_map(all_char(str).map(x=>[x,nb_apr(x,str)]));
}

// trier une map
function sort_map(Tab){

 Tab.sort(tricol);

function tricol(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? -1 : 1;
    }
}
return Tab;
}

//     Codage shannon fano
function coder(chaine) {
  var str = Maping(textfield.value());
  var result =tableau_code(shannon_fano(str));

  main_container.child(create_tabulation(result));
  console.log(result);
  

} 


// Algo rec de shannon fano 

function shannon_fano(chaine)
{
   var P1=[] ;
   var P2 =[];
   if(chaine.length>1){
   while((some_elem(P1) < some_elem(sub_array(chaine,P1.length,chaine.length)))  && (P1.length<chaine.length -1))
   {
     P1.push(chaine[P1.length]);
   }

   P2=sub_array(chaine,P1.length,chaine.length);


   P1=affect_code(P1,"0");  
   P2=affect_code(P2,"1");
   

   return shannon_fano(P1).concat(shannon_fano(P2));
  }else
  {
    return chaine;
  }
   
   

    
 

}

// Sous-tableau

function sub_array(arr,i,j){
var subarray=[];
for(var k = i ; k<j; k++) {
   subarray.push(arr[k]); //1 for 2nd element
}
return subarray; }

// la some
function some_elem(chaine)
{ var s=0 ;
  chaine.forEach(element => {
    
     s+=element[1];
  });
 return s;
}

function affect_code(chaine,s)
{
  chaine.forEach(element => {
    
    element[0]=element[0].concat(s);
 });
 return chaine;
}

function tableau_code(chaine)
{
  var tab=[]
  chaine.forEach(element => {
    
    tab.push([element[0][0],element[0].substring(1,element[0].length)]);
 });
 return tab;

}
