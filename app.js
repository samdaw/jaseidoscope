var doc = document,
	win = window,
	body = doc.body;
var ww = win.innerWidth,
	wh = win.innerHeight;
var c = doc.createElement('canvas'),
	ctx = c.getContext('2d');
var half_PI = Math.PI / 2,
	two_PI = Math.PI * 2,
	ease = 0.01;
var k = {
	offsetRotation: 0,
	offsetScale: .8,
	offsetX: 0,
	offsetY: 0,
	radius: 1000,
	slices: 12,
	zoom: .7
};
body.appendChild(c);
c.width = k.radius * 2;
c.height = k.radius * 2;
var img = new Image();
img.src = 'jase2.jpg'; 
var fill = ctx.createPattern(img, 'repeat'); 
var scale, step, cx;
scale = k.zoom * (k.radius / Math.min(img.width, img.height));
step = two_PI / k.slices;
cx = img.width / 2;
function draw(){
	ctx.fillStyle = fill;
	for (var i = 0; i <= k.slices; i++) {
		ctx.save();
		ctx.translate(k.radius, k.radius);
		ctx.rotate(i * step);
		ctx.beginPath();
		ctx.moveTo(-0.5, -0.5);
		ctx.arc(0, 0, k.radius, step * -0.51, step * 0.51);
		ctx.rotate(half_PI);
		ctx.scale(scale, scale);
		ctx.scale([ -1,1 ][i % 2], 1);
		ctx.translate(k.offsetX - cx, k.offsetY);
		ctx.rotate(k.offsetRotation);
		ctx.scale(k.offsetScale, k.offsetScale); 
		ctx.fill();
		ctx.restore();
	}
} 
var tx = k.offsetX;
var ty = k.offsetY;
var tr = k.offsetRotation;
win.addEventListener('mousemove', mousemove, false);
function mousemove(e){
    var cx, cy, dx, dy, hx, hy;
    cx = ww / 2;
    cy = wh / 2;
    dx = e.pageX / ww;
    dy = e.pageY / wh;
    hx = dx - 0.1;
    hy = dy - 0.1;
    tx = hx * k.radius * -.8;
    ty = hy * k.radius * .8;
}
c.style.position = 'fixed';
c.style.marginLeft = -k.radius + 'px';
c.style.marginTop = -k.radius + 'px'; 
c.style.left = '50%';
c.style.top = '50%';
function update() {
    tr -= 0.002; 
    k.offsetX += (tx - k.offsetX) * ease;
    k.offsetY += (ty - k.offsetY) * ease;
    k.offsetRotation += (tr - k.offsetRotation) * ease; 
	draw(); 
    requestAnimationFrame(update);
};
update();
