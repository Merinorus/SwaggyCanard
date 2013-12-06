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
    
    var Current_X = this.ITEM_SIZE_PX;
    this.ctxt.save();
    
      this.ctxt.beginPath();
      this.ctxt.rect(this.POS_Y, this.POS_X, this.WIDTH, this.HEIGHT);
      this.ctxt.fillStyle ="white";
      for (var i = 0; i < this.NB_MAX_ITEM; ++i){
      this.ctxt.rect(0, 0, Current_X, this.ITEM_SIZE_PX);
      Current_X+=this.ITEM_SIZE_PX;
      }
      this.ctxt.fill();
      this.ctxt.stroke();
    
    this.ctxt.restore();
}

foodbar.prototype.whichItem = function (PosClicked)
{

   PosClicked.X -= this.rect.left;
   PosClicked.Y -= this.rect.top;
   
    if (this.POS_X < PosClicked.X && PosClicked.X < this.POS_X + this.WIDTH 
     && this.POS_Y < PosClicked.Y && PosClicked.Y < this.POS_Y + this.HEIGHT)
     {
        var Case =  Math.floor((PosClicked.X  - this.POS_X) / this.ITEM_SIZE_PX);
        return Case;
     }
    else 
        return -1;
}

foodbar.prototype.loadPic = function (PicPath, IdItem, Case)
{
    this.ctxt.save();
    var img = new Image();
    img.src=PicPath;
    var PosXImg = this.POS_X + Case * this.ITEM_SIZE_PX;
    var PosYImg = this.POS_Y;
    console.debug(PosXImg);
    var ctx = this.ctxt;
    var size = this.ITEM_SIZE_PX;
    img.onload = function () {
    ctx.drawImage(img, PosXImg+1, PosYImg+1, size-2, size-2);
    };
    this.TableOfItem[Case]=IdItem;
    this.ctxt.restore();
}
