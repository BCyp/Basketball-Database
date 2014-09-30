//* Brandon Cypel bac369@nyu.edu *//
var request = require('request');
var xData;
var yData; 

var setFirstTeamName = function(ray){
	return ray[0].team;
};
var setSecondTeamName = function(ray, firstTeam){
	var found = false;
	var secondName;
	var i = 1;
	while (found === false){
		if( ray[i].team !== firstTeam){
			secondName = ray[i].team;
			found = true
		};
		i++; 
	};
	return secondName;
};

var createTeamArray = function(name, iData){  
	var newTeam = iData.filter(function(player){
        	return player.team === name;
	});
	return newTeam;
};


var calcTeamScore = function(team){
	var sum = 0;
	var playerPointsArray = [];
	  team.forEach(function(player){
      	        sum = player.threesMade * 3 + (player.fieldGoalsMade - player.threesMade) * 2 + player.freeThrowsMade;
		playerPointsArray.push(sum);
        });
	var teamScore = playerPointsArray.reduce(function( score, total){
		return score + total;
	});
	return teamScore;
};

var pointsPercent = function(team){
	var pointArray= [];
	var highest = {};
	team.forEach(function(player){
		var points = player.threesMade * 3 + (player.fieldGoalsMade - player.threesMade) * 2 + player.freeThrowsMade;
		if(points >= 10){
		var person ={ name: player.name, pointsMade: points, threesMade: player.threesMade, percentage: (player.threesMade * 3)/points};
		person.name = player.name;
		person.threesMade = player.threesMade;
		person.pointsMade = points;
		
		pointArray.push(person);
		};
	});
	highest = pointArray[0];
	pointArray.forEach(function(player){
	 	if(player.percentage > highest.percentage){
			highest = player;
		};
	});
	return highest.name;
};

var calcRebounds = function(player){
	return player.offensiveRebounds + player.defensiveRebounds;
};
var compareRebounds = function( xTeam, yTeam){
	var xRebounds= 0;
	var yRebounds = 0;
	xTeam.forEach(function(player){
		xRebounds = xRebounds + calcRebounds(player);
	});
	yTeam.forEach(function(player){
                yRebounds = yRebounds + calcRebounds(player);
        });
	if (yRebounds > xRebounds){
		console.log(" *  Team with Most Rebounds: " + yTeam[0].team + " with " + yRebounds);
	};
	if(yRebounds < xRebounds){
                console.log(" * Team with Most Rebounds: " + xTeam[0].team + " with " + xRebounds);
        };

};
var nonGuardMost = function(team){
	var playerMost = {assists: 0};
	team.forEach(function(player){
		if(player.position !== 'G'){
			if( player.assists > playerMost.assists){
				playerMost = player;
			};
		};
	});
	console.log(" * Non-Guard Player with Most Assists: " + playerMost.name + " " + playerMost.assists);
};

var moreTThanA = function(team){
	var moreArray = [];
	team.forEach(function (player){
		if (player.turnovers > player.assists){
			moreArray.push(player);
		};	
	});
	console.log(" * Players with More Turnovers than Assists");
	moreArray.forEach(function(player){
		console.log(" " + player.name);
	});
};

var processing = function(playArray){
	
	var teamOne = [];
	var nameOne;
	var teamTwo = [];
	var nameTwo;

	nameOne = setFirstTeamName(playArray);
	nameTwo = setSecondTeamName(playArray, nameOne);

	teamOne = createTeamArray(nameOne, playArray);
	teamTwo = createTeamArray(nameTwo, playArray);

	console.log(" ");
	console.log("Final Score: " + nameOne + " " + calcTeamScore(teamOne) + " " + nameTwo + " " + calcTeamScore(teamTwo));
	console.log("=====");
	console.log(" * Player with highest percentage of points from three pointers: " + pointsPercent(playArray));
	compareRebounds(teamOne, teamTwo);
	nonGuardMost(playArray);
	moreTThanA(playArray);
}

request('http://foureyes.github.io/csci-ua.0480-fall2014-002/homework/02/2014-06-15-heat-spurs.json', function (error, response, body) {
        xData = JSON.parse(body);
	processing(xData);
});

request('http://foureyes.github.io/csci-ua.0480-fall2014-002/homework/02/2014-04-09-thunder-clippers.json', function (error, response, body) {
        yData = JSON.parse(body);
        processing(yData);
});


