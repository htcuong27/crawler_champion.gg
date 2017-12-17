var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var url = 'http://champion.gg';

var href = [];
var seen = [];

request(url, function(err, res, body){
	if(err) console.log('Error: ' + err);
	let $ = cheerio.load(body);
	$('.champ-height').each(function(){
		var ichamp = $(this).find('a').first().attr('href');
		href.push(url + ichamp);

	
	});

	var seen = [];

	test1= Array.isArray(href);
	console.log(test1);
	console.log(href.length);

	href.forEach(function(e, i){
		request(e, function(err, res, body){
			let $ = cheerio.load(body);
			if(err) console.log('Error: ' + err);
			$('ul li a h3').each(function(){
				var pos = $(this).text().trim();
				request(e +'/'+pos, function(err, res, body){
					let $ = cheerio.load(body);
					if(err) console.log('Error: ' + err);
					var champ_name = $('.champion-profile').find('h1').text().trim();
					var win_rate = $('#statistics-win-rate-row td').eq(1).text().trim();
					var play_rate = $('#statistics-play-rate-row td').eq(1).text().trim();
					var ban_rate = $('#statistics-ban-rate-row-row td').eq(1).text().trim();
					var playerbase_avg = $('#statistics-playerbase-average-row td').eq(1).text().trim();
					var gold_earn = $('tr').eq(5).find('td').eq(1).text().trim();
					var kills = $('#statistics-kills-row td').eq(1).text().trim();
					var deaths = $('#statistics-deaths-row td').eq(1).text().trim();
					var assists = $('#statistics-assists-row td').eq(1).text().trim();
					var damage_dealt = $('#statistics-damage-dealt-row td').eq(1).text().trim();
					var damage_taken = $('#statistics-damage-taken-row td').eq(1).text().trim();
					var overall = $('tr').last().find('td strong').text().trim();
					var minion_killed = $('#statistics-minions-killed-row td').eq(1).text().trim();
					var position = $('.selected-role a h3').text().trim();
					console.log('Ten'+champ_name);

					fs.appendFile('champs.text', champ_name+','+position+','+win_rate+','+play_rate+','+ban_rate+','+playerbase_avg+','+kills+','+deaths+','+assists+','+damage_dealt+','+damage_taken+','+minion_killed+','+gold_earn+','+overall+ '\n');					
				});

			});
		});
	});

	

	// for(var i = 0; i <= href.length; i++){
	// 	if(/\/.*?\/.*?\//.test(href[i]) === /\/.*?\/.*?\//.test(href[i+1]) ){

	// 	}
	// }
})