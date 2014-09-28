var arrays = [[2, 4, 6], [8], [10, 12]];
arrays = arrays.reduce(function( parts, first){
	return parts.concat(first);
});
console.log(arrays);

var aniRay= ['aardvark', 'abbreviate', 'abacuses', 'abandoners', 'abalones'];
var numbs = [9, 48, 204, 528942];
var every = function( ray){
	ray.forEach(function(part){
		if ( part % 3 !== 0){
			return false;
		}
	})
	return true;
}

var some= function(animals){
	animals.forEach(function(part){
		if (part.length === 9){
			return true;
		}
	});
		return false;
}
console.log("Running every... " + every(numbs));
console.log ("Running some... " + some(aniRay));
