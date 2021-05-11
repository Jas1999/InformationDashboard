import React from 'react';
import { useState, useEffect  } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import WordCloud from "react-d3-cloud";
import _ from 'lodash';

function App() {
    const [Resp,SetResponseJson] = useState();// still not sure on how to use
    var redditTemp = ["uwaterloo", "UBC", "UofT","mcgill"];
    //useEffect(fetchresponse={() => fetchresponse("mcgill")})
    //useEffect(fetchresponse("mcgill"), []);
    useEffect(fetchSubreddits, []);
    useEffect(() => {
        console.log('here1');
        console.log(fetchresponse("uwaterloo"));

    });
    /*
    useEffect(() => {
        console.log('here');
        fetchSubreddits()
    });
    */


    async function fetchSubreddits() {
      const response = await fetch('/Subreddit');
      if (response.ok) {
        const json = await response.json();
        console.log(json);
        SetResponseJson(json);
        //return json
      }
    }
  async function fetchresponse(subredditId) {
      const response = await fetch('/Subreddit/' + subredditId);
      if (response.ok) {
        const RJson = await response.json();
        console.log(RJson)
        //SetResponseJson(RJson);
        //return RJson

      }
  }

  const dummysubs = [
    // Subreddit 1
    {
      SubRedditname: 'uwaterloo',
      NumSubs: 44444,
      RedditImg:'https://a.thumbs.redditmedia.com/c1iqtotu4lNlCxkJBex6SEtlikJBqt6WmKBNgMQKjS0.png',
      wordCounts: [
          { text: 'day', value: 42 },
          { text: 'busan', value: 23 },
          { text: 'waterloo', value: 20 },
          { text: 'uw', value: 19 },
          { text: 'uwaterloo', value: 18 },
          { text: 'week', value: 18 },
          { text: 'like', value: 17 },
          { text: 'goose', value: 15 },
          { text: 'people', value: 15 },
          { text: 'students', value: 13 },
          { text: 'today', value: 12 },
          { text: 'year', value: 11 }
        ]
    },
    // Subreddit 2
    {
      SubRedditname: 'UofT',
      NumSubs: 3,
      RedditImg:'https://a.thumbs.redditmedia.com/SsZbo9uA8c68Lhc68dk59PuZkjm_gnxNBx2e14haVY8.png',
      wordCounts: [
        { text: 'uoft', value: 38 },
        { text: 'exam', value: 17 },
        { text: 'like', value: 15 },
        { text: 'people', value: 15 },
        { text: 'test', value: 15 },
        { text: 'today', value: 13 },
        { text: 'course', value: 12 },
        { text: 'campus', value: 11 },
        { text: 'year', value: 11 },
        { text: 'students', value: 10 },
        { text: 'bad', value: 10 }
      ]
    }
  ];

  return (
    <div className="App">
      <h1>"Test"</h1>


      <p1>"here"</p1>
      <p1>{redditTemp['SubRedditname']}</p1>

      {dummysubs.map((subreddit, i) => (
        <SubRed
          key={i}
          name={subreddit.SubRedditname}
          subs={subreddit.NumSubs}
          redditIcon={subreddit.RedditImg}


        />
      ))}

      <p1>"new"</p1>
      {_.map(Resp, (subreddit, subreddit_id) => (
       <SubRed
         key={subreddit.SubRedditID}
         displayName={subreddit.SubRedditname}
         subscribers={subreddit.NumSubs}
         icon={subreddit.RedditImg}


       />
     ))}

     {
         //wordCounts={subreddit.wordCounts}
     }
      <p1>"done"</p1>

    </div>
  //var RedImg = "https://a.thumbs.redditmedia.com/c1iqtotu4lNlCxkJBex6SEtlikJBqt6WmKBNgMQKjS0.png"
  //<img src= {RedImg} />

  );
}

/*
{_.map(Resp, (subreddit,i) => (
  <SubRed
    key={i}
    name={subreddit.SubRedditname}
    subs={subreddit.NumSubs}
    redditIcon={subreddit.RedditImg}
    wordCounts={subreddit.wordCounts}
  />
))}

*/
function SubRed(props) {

  const fontSizeMap = word => word.value*2
  const [isFav,setFav] = useState(false);

  return(
    <div className = "SubRed" onClick={() => setFav(true)} >

      <img  className = "SubRed-icon" src= {props.redditIcon} />

      <div className="SubRed-summary">
             <h1>{props.name}</h1>
             <p>{props.subs}</p>
             {isFav ? <p>Favourited!</p> : null}
      </div>

     {
         /*
          <WordCloud
                  data={props.wordCounts}
                  fontSizeMapper={fontSizeMap}
                  width={300}
                  height={300}
                />
                */
     }
    </div>
  );
}

export default App;
