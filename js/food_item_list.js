/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

function food_item_list() {
    this.food_tab = [];
}

food_item_list.prototype.addItem = function (Item)
{
    this.food_tab.push(clone(Item));
}

food_item_list.prototype.load = function () {
    
    var liste=document.getElementById("food_list");
    liste.innerHTML = "";
    
    var poids = 2000;
    for(var i = 0; i < this.food_tab.length; i++) {
    {
        var item = this.food_tab[i];
    }
        poids += item.poids * (1+item.qualite);
    }
    
    var p=document.createElement('p');
    p.innerHTML = "Poids du canard : "+poids+" g" ;
    liste.appendChild(p);
    
    var ul=document.createElement('ul');
    liste.appendChild(ul);
    for(var i = 0; i < this.food_tab.length; i++) {
        var li=document.createElement('li');
        ul.appendChild(li);
        li.style.textDecoration="none";

        li.innerHTML=this.food_tab[i].nom;
        if(this.food_tab[i].qualite === 0) li.innerHTML = li.innerHTML + " de merde";
        else if (this.food_tab[i].qualite === 2) li.innerHTML = li.innerHTML + " qui déchire sa race";
    }
    
    
}