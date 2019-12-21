/* Config */
const eggChance = 1400; // Same odds as rare egg in eggbot.
const spinSpeed = 2;
const feathersSpawned = 20;
const featherRotations = 5; // Times a feather rotates before despawning, set to 60 to disable rotation.
const featherLifetime = 60; // Ticks before a feather despawns.

/* Textures */
const coopRegion = Core.atlas.find("vbucks-chicken-coop");
const rotatorRegion = Core.atlas.find("vbucks-chicken-coop-rotator");

/* Stuff used by Chicken Coop */
const egg = Vars.content.getByName(ContentType.item, "egg");

const featherEffect = newEffect(featherLifetime, e => {
	Draw.rect(featherRegion, e.x, e.y, e.fin() * (360 / (featherLifetime / featherRotations)));
});

/* The big boy himself */
const coop = extendContent(Block, "chicken-coop", {
	update: function(tile){
		if(Math.random(1, eggChance) == 1){
			print("egg");
			for(var i = 0; i < feathersSpawned; i++){
				Effects.effect(featherEffect, tile);
			}
			var entity = tile.entity;
			if(entity != null){
				entity.items.add(egg, 1);
				this.tryDump(tile, egg);
			}else{
				print("entity is null :(");
			}
		}
	},
	draw: function(tile){
		Draw.rect(coopRegion, tile.x, tile.y);
		Draw.rect(rotatorRegion, tile.x, tile.y, Time.time() * spinSpeed);
	}
});

// "chicken-coop.description" acts as a warning for players without scripting support.
coop.description = Core.bundle.format("block.vbucks-chicken-coop.real-description", eggChance);