/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
init = function (){
    laque = new food_item("images/laque.png", "laque", "10", "1");
    miel = new food_item("images/miel.png", "miel", "100", "1");
    figues = new food_item("images/figue.png", "figues", "70", "1");
    pommes = new food_item("images/pomme.png", "pommes", "40", "1");
    mangue = new food_item("images/mangue.png", "mangue", "50", "1");
    oignon = new food_item("images/oignon.png", "oignon", "30", "1");
    olive = new food_item("images/olive.png", "olive", "30", "1");
    orange = new food_item("images/orange.png", "orange", "40", "1");
    this.food_tab = [];
    this.food_tab.push(laque);
    this.food_tab.push(miel);
    this.food_tab.push(figues);
    this.food_tab.push(pommes);
    this.food_tab.push(mangue);
    this.food_tab.push(oignon);
    this.food_tab.push(olive);
    this.food_tab.push(orange);

}

