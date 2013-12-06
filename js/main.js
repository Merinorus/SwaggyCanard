var myApp;
function App()
{
	this.GL_Canard;
	this.GL_Container 	= $('#container');
	this.GL_Camera 		= new THREE.PerspectiveCamera(45, $('#container').width() / $('#container').height(), 1, 2000);
	this.GL_Scene 		= new THREE.Scene();
	this.GL_Renderer	= new THREE.WebGLRenderer();
	this.GL_Manager		= new THREE.LoadingManager();
	this.GL_OBJLoader	= new THREE.OBJLoader(this.GL_Manager);
	this.GL_ImageLoader	= new THREE.ImageLoader(this.GL_Manager);
	this.GL_Texture 	= new THREE.Texture();
	this.GL_Ambient		= new THREE.AmbientLight(0x404040);
	this.GL_Directional = new THREE.DirectionalLight(0xFFEEDD);
}

App.prototype.renderLoop = function ()
{
	if (myApp.GL_Canard != undefined)
	{
		myApp.GL_Canard.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.005);
		if (myApp.GL_Canard.scale.y * 180 < $('#container').height() * 0.35) 
			myApp.GL_Canard.scale.set(myApp.GL_Canard.scale.x * 1.001, myApp.GL_Canard.scale.y * 1.001, myApp.GL_Canard.scale.z * 1.001);
	}

	myApp.GL_Camera.lookAt(myApp.GL_Scene.position);
	myApp.GL_Renderer.render(myApp.GL_Scene, myApp.GL_Camera);
	requestAnimationFrame(myApp.renderLoop);
}

App.prototype.renderCanard = function ()
{
	myApp = this;
	// Load resources
	this.GL_ImageLoader.load('res/texture.jpg', function (image)
									{
										myApp.GL_Texture.image 		= image;
										myApp.GL_Texture.needsUpdate = true;
									});

	this.GL_OBJLoader.load('res/ducky.obj', function (model)
									{
										model.traverse(function (child)
														{
															if (child instanceof THREE.Mesh)
																child.material.map = myApp.GL_Texture;
														});

										myApp.GL_Canard = model;
										myApp.GL_Scene.add(model);
	
										// Hook rendering
										requestAnimationFrame(myApp.renderLoop);

										myApp.GL_Camera.lookAt(myApp.GL_Scene.position);
										myApp.GL_Renderer.render(myApp.GL_Scene, myApp.GL_Camera);
									});

	// Setup directional lightning
	this.GL_Directional.position.set(0, 0, 1);
	
	// Position this.GL_Camera
	this.GL_Camera.position.z = 1000;
	this.GL_Camera.position.y = 200;

	// Build this.GL_Scene
	this.GL_Scene.add(this.GL_Ambient);
	this.GL_Scene.add(this.GL_Directional);
	
	// Renderering parameters
	this.GL_Renderer.setClearColorHex(0xFFFFFF, 1);
	this.GL_Renderer.setSize(this.GL_Container.width(), this.GL_Container.height());

	// Add content to Div
	this.GL_Container.append(this.GL_Renderer.domElement);
}

App.prototype.main = function ()
{
	this.renderCanard();
}

$(document).ready(function() {
	new App().main();
});