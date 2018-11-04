
//Declarations And Assignment
var steem = require('steem'); //Only For Node.Js
const username = 'username'; 
var tag = 'tutorials';
var tagFetchLimit = 10;
const wif = 'posting_key'; // Use environment variables instead of hardcoding to be safer

steem.api.getDiscussionsByCreated({"tag": tag, "limit": tagFetchLimit}, function(err, result) {
          var textResult = JSON.stringify(result);
          var arrayResult = JSON.parse(textResult);
          
          arrayResult.forEach( 
           function (value,key){
                  setTimeout(function(){
                        console.log(3000*key+'seconds');
                        steem.api.getContentReplies(value['author'], value['permlink'] , function (commentCheckErr,commentCheckResult) {
                              var CCtextResult = JSON.stringify(commentCheckResult);
                              var CCarrayResult = JSON.parse(CCtextResult);
                   
                              var CC = CCarrayResult.filter(function(person) {
                                  return person.author == username;
                                });
              
                              if (CC == ''){
                                
                                    jsonMetadata = {
                                        community: 'commn',
                                        purpose: 'testrun',
                                        app: 'NAPP/0.1'
                                    };

                                    var comment_permlink = new Date().toISOString().replace(/[^a-zA-Z0-9]+/g, '').toLowerCase();

                                    content = '@'+value['author']+', thanks';

                                    steem.broadcast.comment(wif, value['author'], value['permlink'], username, comment_permlink , '', content, jsonMetadata, function(err, result) {
                                      console.log(err, result);
                                    });
                              }
                         });                  
                }, 3000*key);

            }    
            );
      });
