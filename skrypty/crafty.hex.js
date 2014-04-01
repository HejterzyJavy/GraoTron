Crafty.extend({

	hexametric : {
		_tile : {
			width : 0,
			height : 0,
			r : 0
		},
		_map : {
			width : 0,
			height : 0,
			x : 0,
			y : 0
		},

		_origin : {
			x : 0,
			y : 0
		},


		init : function(tw, th, mw, mh) {
			this._tile.width = parseInt(tw, 10);
			this._tile.height = parseInt(th, 10) || parseInt(tw, 10) / 2;
			this._tile.r = this._tile.width / this._tile.height;

			this._map.width = parseInt(mw, 10);
			this._map.height = parseInt(mh, 10) || parseInt(mw, 10);

			this._origin.x = this._map.height * this._tile.width / 2;
			return this;
		},


		place : function(obj, x, y, layer) {
			var pos = this.pos2px(x, y);
			if (!layer)	layer = 1;
			var marginX = 0, marginY = 0;
			obj.x = pos.left - x;
			obj.y = pos.top + y;
			obj.z = (pos.top) * layer;
		},

		centerAt : function(x, y) {
			var pos = this.pos2px(x, y);
			Crafty.viewport.x = -pos.left + Crafty.viewport.width / 2 - this._tile.width;
			Crafty.viewport.y = -pos.top + Crafty.viewport.height / 2;
		},

		area : function(offset) {
			if (!offset)
				offset = 0;
			//calculate the corners
			var vp = Crafty.viewport.rect();
			var ow = offset * this._tile.width;
			var oh = offset * this._tile.height;
			vp._x -= (this._tile.width / 2 + ow);
			vp._y -= (this._tile.height / 2 + oh);
			vp._w += (this._tile.width / 2 + ow);
			vp._h += (this._tile.height / 2 + oh);


			var grid = [];
			for (var y = vp._y, yl = (vp._y + vp._h); y < yl; y += this._tile.height / 2) {
				for (var x = vp._x, xl = (vp._x + vp._w); x < xl; x += this._tile.width / 2) {
					var row = this.px2pos(x, y);
					grid.push([~~row.x, ~~row.y]);
				}
			}
			return grid;
		},

		pos2px : function(x, y) {
			
			var top = ((this._tile.height / 2 -5) * y );
			var left = (this._tile.width * x );
			if (x%2 ==0){
				left = left - (this._tile.width / 2-15);
				top = top - 14;
			}
			if (x>2 ){
				left = left - 36*((Math.round(x/2)-1));
			}
			

			return {
				left : left,
				top : top
			};
		},

		px2pos : function(left, top) {

			var x, y;

			x = ((left / this._tile.width ) );
			y = (top / (this._tile.height / 2 ) );

			if (y % 2)
				x += 0.5;

			return {
				x : x,
				y : y
			};
		},

		polygon : function(obj) {

			obj.requires("Collision");
			var marginX = 0, marginY = 0;
			if (obj.__margin !== undefined) {
				marginX = obj.__margin[0];
				marginY = obj.__margin[1];
			}
			var points = [[marginX - 0, obj.h - marginY - this._tile.height / 2], [marginX - this._tile.width / 2, obj.h - marginY - 0], [marginX - this._tile.width, obj.h - marginY - this._tile.height / 2], [marginX - this._tile.width / 2, obj.h - marginY - this._tile.height]];
			var poly = new Crafty.polygon(points);
			return poly;

		}
	}
}); 