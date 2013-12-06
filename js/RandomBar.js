/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function RandomBar (inCanvas) 
{
    this.HEIGHT = 30;
    this.WIDTH  = 500;
    this.canvas = inCanvas;
    this.ctx    = inCanvas.getContext('2d');
    this.PosX   = 0;
    this.PosY   = 70;
    this.cursorPosX = 30; 
}

RandomBar.prototype.paint = function ()
{
    this.ctx.save();
        this.ctx.rect(this.PosX, this.PosY, this.WIDTH, this.HEIGHT);
        var grd=this.ctx.createLinearGradient(this.PosX,this.PosY,this.PosX+this.WIDTH,this.PosY);
        grd.addColorStop(0,"red");
        grd.addColorStop(0.25,"red");
        grd.addColorStop(0.50, "green");
        grd.addColorStop(0.75,"red");
        grd.addColorStop(1,"red");
        this.ctx.fillStyle = grd;
        this.ctx.fill();
        this.ctx.stroke();
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.PosX+this.cursorPosX, this.PosY);
        this.ctx.lineTo(this.PosX+this.cursorPosX, this.PosY+this.HEIGHT);
        this.ctx.lineWidth = 15;
        this.ctx.stroke();
        
    this.ctx.restore();
}

RandomBar.prototype.next = function ()
{
    this.cursorPosX+=10;
    this.cursorPosX%=this.WIDTH;
    this.paint();
    myFoodbar.paint();
}
