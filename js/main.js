var myApp;
function App()
{
	// 3D Rendering
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
	this.GL_Directional     = new THREE.DirectionalLight(0xFFEEDD);
	
	// Database
	this.DB_Ingredients = {"ingredients": [
		{ "nom": "Laque", 	"poids": "20", 	"qualite": "1", 	"image": "images/laque.png" },
		{ "nom": "Miel", 	"poids": "100", "qualite": "1", 	"image": "images/miel.png" },
		{ "nom": "Figue", 	"poids": "100", "qualite": "1", 	"image": "images/figue.png" },
		{ "nom": "Pomme", 	"poids": "50", 	"qualite": "1", 	"image": "images/pomme.png" },
		{ "nom": "Mangue", 	"poids": "70", 	"qualite": "1", 	"image": "images/mangue.png" },
		{ "nom": "Oignon", 	"poids": "10", 	"qualite": "1", 	"image": "images/oignon.png" },
		{ "nom": "Olive", 	"poids": "20", 	"qualite": "1", 	"image": "images/olive.png" },
		{ "nom": "Orange", 	"poids": "30", 	"qualite": "1", 	"image": "images/orange.png" }
	]
	};
	
	this.DB_Recettes = {"recettes": [
		{ "Nom": "Canard à la mangue",				"I1": {"Nom": "Mangue", 	"Qualite": "0" },
													"I2": {"Nom": "Pomme", 		"Qualite": "0" },
													"I3": {"Nom": "Miel", 		"Qualite": "0" } },

		{ "Nom": "Canard aux figues",				"I1": {"Nom": "Figue", 		"Qualite": "0" },
													"I2": {"Nom": "Miel", 		"Qualite": "0" },
													"I3": {"Nom": "Pomme", 		"Qualite": "0" } },

		{ "Nom": "Magret de canard aux pommes",		"I1": {"Nom": "Mangue", 	"Qualite": "0" },
													"I2": {"Nom": "Pomme", 		"Qualite": "0" },
													"I3": {"Nom": "Miel", 		"Qualite": "0" } },
													
		{ "Nom": "Canard dégueu",					"I1": {"Nom": "Oignon", 	"Qualite": "0" },
													"I2": {"Nom": "Olive", 		"Qualite": "0" },
													"I3": {"Nom": "Orange", 	"Qualite": "0" } },

		{ "Nom": "Confit de canard aux oignons",	"I1": {"Nom": "Miel", 		"Qualite": "0" },
													"I2": {"Nom": "Oignon", 	"Qualite": "0" },
													"I3": {"Nom": "Pomme", 		"Qualite": "0" } },

		{ "Nom": "Canard laqué à la mangue",		"I1": {"Nom": "Laque", 		"Qualite": "0" },
													"I2": {"Nom": "Miel", 		"Qualite": "0" },
													"I3": {"Nom": "Mangue", 	"Qualite": "0" } },

		{ "Nom": "Canne à sucre",		"I1": {"Nom": "Laque", 		"Qualite": "0" },
													"I2": {"Nom": "Miel", 		"Qualite": "0" },
													"I3": {"Nom": "Pomme", 		"Qualite": "0" } },
	
		{ "Nom": "Canard laqué aux figues",			"I1": {"Nom": "Laque", 		"Qualite": "0" },
													"I2": {"Nom": "Miel", 		"Qualite": "0" },
													"I3": {"Nom": "Figues", 	"Qualite": "0" } },
	
		{ "Nom": "Confit de canard aux olives",		"I1": {"Nom": "Laque", 		"Qualite": "0" },
													"I2": {"Nom": "Miel", 		"Qualite": "0" },
													"I3": {"Nom": "Olive", 		"Qualite": "0" } },
		]
	};
}

App.prototype.renderLoop = function ()
{
    //console.debug ("render loop");
	if (myApp.GL_Canard != undefined)
	{
		myApp.GL_Canard.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.005);
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
	this.GL_Renderer.setClearColor("brown", 1);
	this.GL_Renderer.setSize(this.GL_Container.width(), this.GL_Container.height());

	// Add content to Div
	this.GL_Container.append(this.GL_Renderer.domElement);
}

App.prototype.getRecipeFromIngredients = function (i1, i2, i3)
{
	for (i = 0; i < this.DB_Recettes.recettes.length; ++i)
		if (	(i1 == this.DB_Recettes.recettes[i].I1.Nom || i1 == this.DB_Recettes.recettes[i].I2.Nom || i1 == this.DB_Recettes.recettes[i].I3.Nom)
			&& 	(i2 == this.DB_Recettes.recettes[i].I1.Nom || i2 == this.DB_Recettes.recettes[i].I2.Nom || i2 == this.DB_Recettes.recettes[i].I3.Nom)
			&& 	(i3 == this.DB_Recettes.recettes[i].I1.Nom || i3 == this.DB_Recettes.recettes[i].I2.Nom || i3 == this.DB_Recettes.recettes[i].I3.Nom))
				return this.DB_Recettes.recettes[i].Nom;

	for (i = 0; i < this.DB_Recettes.recettes.length; ++i)
		if (	((i1 == this.DB_Recettes.recettes[i].I1.Nom || i1 == this.DB_Recettes.recettes[i].I2.Nom || i1 == this.DB_Recettes.recettes[i].I3.Nom)
			&&	 (i2 == this.DB_Recettes.recettes[i].I1.Nom || i2 == this.DB_Recettes.recettes[i].I2.Nom || i2 == this.DB_Recettes.recettes[i].I3.Nom))
			||	((i1 == this.DB_Recettes.recettes[i].I1.Nom || i1 == this.DB_Recettes.recettes[i].I2.Nom || i1 == this.DB_Recettes.recettes[i].I3.Nom)
			&&	 (i3 == this.DB_Recettes.recettes[i].I1.Nom || i3 == this.DB_Recettes.recettes[i].I2.Nom || i3 == this.DB_Recettes.recettes[i].I3.Nom))
			||	((i2 == this.DB_Recettes.recettes[i].I1.Nom || i1 == this.DB_Recettes.recettes[i].I2.Nom || i1 == this.DB_Recettes.recettes[i].I3.Nom)
			&&	 (i3 == this.DB_Recettes.recettes[i].I1.Nom || i3 == this.DB_Recettes.recettes[i].I2.Nom || i3 == this.DB_Recettes.recettes[i].I3.Nom)))
				return this.DB_Recettes.recettes[i].Nom;
	
	for (i = 0; i < this.DB_Recettes.recettes.length; ++i)
		if (	(i1 == this.DB_Recettes.recettes[i].I1.Nom || i1 == this.DB_Recettes.recettes[i].I2.Nom || i1 == this.DB_Recettes.recettes[i].I3.Nom)
			|| 	(i2 == this.DB_Recettes.recettes[i].I1.Nom || i2 == this.DB_Recettes.recettes[i].I2.Nom || i2 == this.DB_Recettes.recettes[i].I3.Nom)
			|| 	(i3 == this.DB_Recettes.recettes[i].I1.Nom || i3 == this.DB_Recettes.recettes[i].I2.Nom || i3 == this.DB_Recettes.recettes[i].I3.Nom))
				return this.DB_Recettes.recettes[i].Nom;
	
	return "Canard boiteux";
}

App.prototype.main = function ()
{
	this.renderCanard();
}

App.prototype.feed = function (weight) {
    this.GL_Canard.scale.x +=  weight / 350 ;
    this.GL_Canard.scale.y +=  weight / 350 ;
    this.GL_Canard.scale.z +=  weight / 350 ;
}
