/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function food_item(chemin_image, nom, gain_poids, qualite) {
    this.chemin_image = chemin_image;
    this.nom = nom;
    this.gain_poids = gain_poids;
    this.qualite = qualite;
}

function food_item_list() {
    this.food_tab = [];
}

food_item_list.prototype.addItem = function (Item)
{
    this.food_tab.push(Item);
}
food_item_list.prototype.load = function () {
    var liste=document.getElementById("food_list");
    liste.innerHTML = "";
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