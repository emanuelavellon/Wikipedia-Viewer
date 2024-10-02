const searchBar=document.getElementById('search-bar');
const form=document.getElementById('form');
const error = document.getElementById('error');
const randomArticle = document.getElementById('randomArticle');
const content = document.getElementById('content');

form.addEventListener('submit', function(event) {
  event.preventDefault(); 
  
  error.style.display = 'none';
  searchBar.classList.remove('input-error');
  
  const searchCriteria=searchBar.value;
  
  if (searchCriteria.trim() === '') {
        error.style.display = 'inline'; 
        searchBar.classList.add('input-error');
    return;
  }
  
   getArticles(searchBar.value);
   return;  
});

randomArticle.addEventListener('click', function(event) {
  event.preventDefault(); 
  
  error.style.display = 'none';
  searchBar.classList.remove('input-error');
  const url="https://en.wikipedia.org/wiki/Special:Random";
  content.innerHTML = "";
  window.open(url, '_blank'); 
});

async function getArticles(searchCriteria){
  if(!searchCriteria) return;
  
  const page=10;
  
  const response= await fetch(`https://api.wikimedia.org/core/v1/wikipedia/en/search/page?q=${searchCriteria}&limit=${page}`);
  const data= await response.json();
  const articles=data.pages;
  content.innerHTML = "";

  articles.forEach(article=>{
    const title = document.createElement("h2");
    const excerpt = document.createElement("p");
    const container = document.createElement("article");
    const link = document.createElement("a");
    
    document.body.style.justifyContent = 'flex-start';
    title.textContent = article.title;
    excerpt.innerHTML=article.excerpt;
    
    container.appendChild(title);
    container.appendChild(excerpt);
    link.appendChild(container);
    link.href=`https://en.wikipedia.org/wiki/${article.key}`;
    link.target = "_blank";
    
    content.appendChild(link);
  }) 
}