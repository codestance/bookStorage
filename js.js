var title,authors,description,img,items,totalItems = "";
function searchBook(){
    let bookTitle = document.getElementById('input').value;
    if(bookTitle==""){
        alert('please write down the title you are looking for');
    }else{
        function getBook(index) {
            let viewer = document.getElementById('viewer');
            let req = new XMLHttpRequest();
            req.open('GET','https://www.googleapis.com/books/v1/volumes?q='+bookTitle+'&startIndex='+index);
            req.onreadystatechange = function(){
                if (req.readyState == 4) {
                    if(req.status == 200) {
                        let ans = JSON.parse(req.response);
                        console.log(ans)
                        totalItems = ans.totalItems;
                        items = ans.items;
                        for(i=0;i<items.length; i++){
                            title = items[i].volumeInfo.title;
                            authors = items[i].volumeInfo.authors;
                            description = items[i].volumeInfo.description;
                            img = items[i].volumeInfo.imageLinks.thumbnail;
                            let div = document.createElement('div');
                            div.className = 'item';
                            let titleHeader = document.createElement('h4');
                            let authorsHeader = document.createElement('h5');
                            let imgDisp = document.createElement('img');
                            let descParagraph = document.createElement('p');
                            titleHeader.innerHTML=title;
                            authorsHeader.innerHTML = authors;
                            imgDisp.src =img;
                            imgDisp.alt = title;
                            descParagraph.innerHTML = description;
                            div.append(titleHeader,authorsHeader,imgDisp, descParagraph);
                            viewer.appendChild(div);
                        }
                        if(totalItems>items.length){
                            window.addEventListener('scroll',getNext,false);
                        }               
                    }
                }
            }
            req.send();
            window.removeEventListener('scroll',getNext,false);
        }
        getBook(0)
        function getNext(){
            if(viewer.scrollHeight - viewer.offsetTop - window.scrollY<= 500){
                totalItems = totalItems-items.length;
                getBook(items.length);
            }
        }
    }
}
document.getElementById('input').addEventListener('change',searchBook);