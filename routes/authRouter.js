const router = require('express').Router()
const axios = require('axios')
const FWAPI = require('../api/fwapi')

router.get('/reddit/callback', (req, res) => {
    if (req.query.error) {
        console.error(req.query.error)
    }
    else {
        let RedditState = req.query.state
        let UserID = Buffer.from(RedditState, 'base64').toString('ascii')
        let RedditAccessCode = req.query.code
  
        const RedditAuthHeaders = {
            headers: {
                'Authorization': "Basic " + Buffer.from(`${process.env.REDDIT_CLIENTID}:${process.env.REDDIT_CLIENTSECRET}`).toString('base64')
            }
        }

        const Callbackuri = 'http://localhost:5000'
  
        axios.post('https://www.reddit.com/api/v1/access_token', `grant_type=authorization_code&code=${RedditAccessCode}&redirect_uri=${Callbackuri}/auth/reddit/callback`, RedditAuthHeaders).then( LoginResponse => {
        const RedditApiBaseUrl = 'https://oauth.reddit.com'
        const AuthenticationHeader = {
            headers: {
            'Authorization': 'bearer ' + LoginResponse.data.access_token
            }
        }
  
            axios.get(RedditApiBaseUrl + '/api/v1/me', AuthenticationHeader).then( ApiResponse => {
                const RedditInfo = {
                    username: ApiResponse.data.subreddit.display_name_prefixed,
                    totalKarma: ApiResponse.data.total_karma,
                    accountCreatedAt: ApiResponse.data.created_utc
                }
    
                FWAPI.UpdateUserRedditName(UserID, RedditInfo.username.split('u/')[1])
                .then( fwapiRes => {
                    console.log(fwapiRes.data)
                })
                .catch( fwapiErr => {
                    console.error(fwapiErr.data)
                })
    
                const r = require('../reddit/init')

                r.getSubreddit('flairwars').getUserFlair(RedditInfo.username.split('u/')[1]).then( flair => {
                    console.log(flair)
                })

            }).catch(redditGetErr => {
                console.error(redditGetErr)
            })
        }).catch(redditAccessErr => {
            console.error(redditAccessErr)
        })
    }
})

module.exports = router