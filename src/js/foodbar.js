/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function foodbar (inCanvas)
{
    this.NB_MAX_ITEM = 8;
    this.ITEM_SIZE_PX = 60;
    this.canvas = inCanvas;
    this.ctxt   = inCanvas.getContext('2d');
    this.POS_X = 0;
    this.POS_Y = 0;
    this.WIDTH = this.NB_MAX_ITEM*this.ITEM_SIZE_PX;
    this.HEIGHT = this.ITEM_SIZE_PX;
    this.TableOfItem = new Array(this.NB_MAX_ITEM);
    this.rect = this.canvas.getBoundingClientRect();
}

foodbar.prototype.paint = function()
{   
     this.ctxt.save();
       var posX = this.POS_X;
       var posY = this.POS_Y;
       var img = new Image();
       
       var ctx = this.ctxt;
       img.src = "images/all_items.png";
       img.onload = function () {
           ctx.drawImage(this, posX-3, posY );
       };
    this.ctxt.restore();

}

foodbar.prototype.whichItem = function (PosClicked)
{

   PosClicked.X -= this.rect.left;
   PosClicked.Y -= this.rect.top;
   
    if (this.POS_X < PosClicked.X && PosClicked.X < this.POS_X + this.WIDTH 
     && this.POS_Y < PosClicked.Y && PosClicked.Y < this.POS_Y + this.HEIGHT)
     {
        var Case =  Math.floor((PosClicked.X  - this.POS_X) / (this.ITEM_SIZE_PX+3));
        return Case;
     }
    else 
        return -1;
}

foodbar.prototype.loadPic = function (PicPath, IdItem, Case)
{
        var PosXImg = this.POS_X + Case * this.ITEM_SIZE_PX + Case*3;
        var PosYImg = this.POS_Y;
        this.TableOfItem[Case]={item: IdItem, image:PicPath, posX : PosXImg, posY : PosYImg};

}
