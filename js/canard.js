var myFoodbar;
var myFoodList;
var myRandomBar;
var myCannard;
var myIntervalRandomBarID = -1;
var myCurrentItem;
var myAudio = document.getElementById("duck_audio");
var myAudioCuisson = document.getElementById("duck_cuisson_audio");
var needCuisson = 0;

function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';

    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        }
        else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
}

function OnClick(event) {
    if (myFoodList.food_tab.length < 3) {
        Coor_X = event.pageX;
        Coor_Y = event.pageY;
        var item = myFoodbar.whichItem({ X: Coor_X, Y: Coor_Y });
        if (item !== -1) {
            if (myIntervalRandomBarID === -1) {
                startRandomBar();
                myCurrentItem = myCannard.DB_Ingredients.ingredients[item];

            }
            else {
                stopRandomBar();
                myCurrentItem.qualite = myRandomBar.quality();
                myFoodList.addItem(myCurrentItem);
                myFoodList.load();
                myCannard.feed(myCurrentItem.poids);
                myAudio.play();


                if (myFoodList.food_tab.length === 3) {
                    needCuisson = 1;

                    myRandomBar.ctx.save();
                    myRandomBar.ctx.font = 'italic 30pt Calibri';
                    wrapText(myRandomBar.ctx, "Cuisson en cours ...", 0, 150, 500, 20);
                    myRandomBar.ctx.restore();

                    startRandomBar();
                    myAudio.pause();
                    myAudioCuisson.play();
                }
            }
        }
    } else if (needCuisson === 1) {
        stopRandomBar();
        myAudioCuisson.pause();

        var qualite = myRandomBar.quality();

        myRandomBar.ctx.save();
        myRandomBar.ctx.fillStyle = "white";
        myRandomBar.ctx.rect(0, 0, 500, 200);
        myRandomBar.ctx.fill();
        myRandomBar.ctx.restore();

        var recipe =
            myCannard.getRecipeFromIngredients(myFoodList.food_tab[0].nom,
                myFoodList.food_tab[1].nom,
                myFoodList.food_tab[2].nom);
        if (qualite === 0)
            recipe = "sushi de " + recipe;
        else if (qualite === 1)
            recipe += " cramé";
        else if (qualite === 2)
            recipe += " parfait";

        myRandomBar.ctx.save();
        myRandomBar.ctx.font = 'italic 30pt Calibri';
        wrapText(myRandomBar.ctx, recipe, 10, 50, 500, 40);
        myRandomBar.ctx.restore();

        needCuisson = 0;
    }
    else {
        history.go(0);
    }



};

main = function () {

    myCannard = new App();
    myCannard.main();

    var canvas = document.getElementById("main");
    canvas.addEventListener("mousedown", OnClick, false);

    ctxt = canvas.getContext('2d');
    myFoodbar = new foodbar(canvas);
    myFoodList = new food_item_list;
    myRandomBar = new RandomBar(canvas);
    myRandomBar.paint();

    ctxt.save();
    ctxt.fillStyle = "white";
    ctxt.fillRect(0, 0, 800, 800);
    ctxt.restore();

    for (i = 0; i < myCannard.DB_Ingredients.ingredients.length; ++i)
        myFoodbar.loadPic(myCannard.DB_Ingredients.ingredients[i].image,
            myCannard.DB_Ingredients.ingredients[i].nom, i);

    myFoodbar.paint();

};

function startRandomBar() {
    myRandomBar.cursorPosX = 0;
    myIntervalRandomBarID = setInterval("myRandomBar.next()", 15);
}
function stopRandomBar() {
    clearInterval(myIntervalRandomBarID);
    myIntervalRandomBarID = -1;
}


