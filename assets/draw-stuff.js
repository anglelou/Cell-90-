// Draw stuff
// Time-stamp: <2019-01-21 20:08:33 Chuck Siska>
// Time-stamp: <2019-03-02 23:00:00 Angel Soto>
// ------------------------------------------------------------

// FUN. Draw filled rect.
function draw_rect( ctx, stroke, fill ) 
{
    stroke = stroke || 'lightgrey';
    //fill = fill || 'dimgrey';----------- Remove grey fill of the obx
    ctx.save( );
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.lineWidth = 5;

    //ctx.rect(75, 50, canvas.width - 150, canvas.height - 100);
    //ctx.stroke();
    //ctx.fill();
    //ctx.restore( );
}

// =====================================================  draw_grid ====

function draw_grid( rctx, rminor, rmajor, rstroke, rfill  ) 
{
    rctx.save( );
    rctx.strokeStyle = rstroke;
    rctx.fillStyle = rfill;
    let width = rctx.canvas.width;
    let height = rctx.canvas.height;
    for ( var ix = 0; ix < width; ix += rminor )
    {
        rctx.beginPath( );
        rctx.moveTo( ix, 0 );
        rctx.lineTo( ix, height );
        rctx.lineWidth = ( ix % rmajor == 0 ) ? 0.5 : 0.25;
        rctx.stroke( );
        if ( ix % rmajor == 0 ) { rctx.fillText( ix, ix, 10 ); }
    }
    for ( var iy = 0; iy < height; iy += rminor )
    {
        rctx.beginPath( );
        rctx.moveTo( 0, iy );
        rctx.lineTo( width, iy );
        rctx.lineWidth = ( iy % rmajor == 0 ) ? 0.5 : 0.25;
        rctx.stroke( );
        if ( iy % rmajor == 0 ) {rctx.fillText( iy, 0, iy + 10 );}
    }
    rctx.restore( );
}

	var rule = 0;
	var starting = "i";
		
	var canvas, context;
		
	var currstate, nextstate;
		
	var timer;
	var currrow = 0;
		
	function init()
	{
		//create a drawing context
		canvas = document.getElementById("canvas");
		context = canvas.getContext('2d');
			
		//default rule
		rule_set(90);
	}
		
	function draw_row() 
	{
		var scroll = document.getElementById("scroll").checked;
			
		if (!scroll || currrow < canvas.height - 1)
		{
			currrow++;
			currrow %= canvas.height;
		} 
		else
		{
			var data = context.getImageData(0, 1, canvas.width, canvas.height - 1);
			context.putImageData(data, 0, 0);
		}
		
		for (var i = 0; i < canvas.width; i++) 
		{
			//draw each cell in the current state
			if (currstate[i])
			context.fillStyle = "rgb(0, 0, 0)";
			else context.fillStyle = "rgb(255, 255, 255)";
			context.fillRect(i, currrow, 1, 1);
			
			//calculate each cell in the next state of the simulation
			var l, c, r;
			if (i == 0) {
				l = false; c = currstate[0]; r = currstate[1];
			} else if (i == canvas.width - 1) {
				l = currstate[i-1]; c = currstate[i]; r = false;
			} else {
				l = currstate[i-1]; c = currstate[i]; r = currstate[i+1];
			}
	
			var n = 0;
			if (l == true) n |= 4;
			if (c == true) n |= 2;
			if (r == true) n |= 1;
				
			nextstate[i] = (rule & Math.pow(2, n)) > 0;
				
			}
			
		for (var i = 0; i < canvas.width; i++)
			currstate[i] = nextstate[i];
		
		//draw 100 rows/sec
		if (timer) setTimeout(draw_row, 10);
			
	}
