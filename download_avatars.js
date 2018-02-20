var request = require('request');
var secrets = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': secrets.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
      if (err) {
        cb (err);
        } else {
          var newBody = JSON.parse(body);
          var finalString = "";
          newBody.forEach(function(user_information) {
            finalString += user_information.avatar_url + "\n";
          });

          // for (i = 0; i < newBody.length; i++) {              // alternative to for EACH
          //   var getAvatarUrl = newBody[i].avatar_url;
          //   finalString += getAvatarUrl + "\n";
          // }
          cb (null, finalString);
        }
  });

}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});