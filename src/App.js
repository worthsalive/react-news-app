import React, {Component,useState,useEffect} from 'react';


const App = () => {
  //Defining our state
  const [news,setNews] = useState([]);//initialize the news  state to empty array
  const [searchQuery,setSearchQuery] = useState('react');//initialize the searchQuery  state to a default value 'react'
  const [url,setUrl] = useState('https://hn.algolia.com/api/v1/search?query=react');//initialize the url  state to a default value 'https://hn.algolia.com/api/v1/search?query=react'
  const [loading,setLoading] = useState(false);//initialize the loading  state to a default value false
  //create a function to fetch news
  const fetchNews = () =>{
    setLoading(true);
    //use the fetch api to fetch news from a url
    fetch(url)
        .then(result => result.json())/*convert the result to json*/
        .then(data => (setNews(data.hits), setLoading(false))) /*update the news state with the converted data*/
        .catch(error => console.log(error)) /*catch and console log any error that might occur*/

  }
  //useEffect to execute fetchNews any time compnonent (news) state mounts and anytime theres is a change in its state
  useEffect(() =>{
    fetchNews();
  },[url]);

  //creating  function to handle changes to user input
  const handleChange = (e) =>{
    setSearchQuery(e.target.value);
  }
  const handleSubmit = e => {
    e.preventDefault();
    setUrl(`https://hn.algolia.com/api/v1/search?query=${searchQuery}`)
  }

  const submitForm = () => (
      //we did not use return because the code is within a parenthesis
      <form onSubmit={handleSubmit}>
        <input type={'search'} value={searchQuery} onChange={handleChange}/>
        <button className={'btn-primary'} onClick={fetchNews}>Search</button>
      </form>
  )

  const showLoading = () => loading ? <h2 className={'alert alert-info'}>Loading...</h2> : ''

  const showNews = () => {
    //we can use return because the code is within a curly bracket.
   return news.map((n,i) => (
       <div key={i}
          style={{margin:'5px'}}
          className={'card col-md-10'}>
          <h4><a href={n.url} title={n.title} target={'_blank'}> {n.title}</a></h4>
          <p><b>Created on:</b> {n.created_at}  - <b>Author:</b> {n.author}</p>
        </div> ))
  }
      //loop through the news data using map to get the news (n) and its index (i)
  return (
      <div className={'container'}>
        <div className={''}>
        <h2 style={{padding:'10px !important;',background:'teal',color:'#fff'}}> Welcome to my React News App</h2>
          {submitForm()}
          {showLoading()}
          {showNews()}
        </div>
      </div>

  );
}

export default App;
