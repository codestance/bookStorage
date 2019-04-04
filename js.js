function bookSearch(){
    let bookTitle = document.getElementById('input').value
    if(bookTitle==""){
        alert('please write down the title you are looking for')
    }else{
        let title,authors,description,img,items,totalItems = "";
        let viewer = document.getElementById('viewer');
        let req = new XMLHttpRequest();
        req.open('GET','https://www.googleapis.com/books/v1/volumes?q='+bookTitle);
        req.onreadystatechange = function (aEvt) {
            if (req.readyState == 4) {
                if(req.status == 200) {
                    let ans = JSON.parse(req.response);
                    totalItems = ans.totalItems;
                    items = ans.items;
                    for(i=0;i<items.length; i++){
                        title = items[i].volumeInfo.title;
                        authors = items[i].volumeInfo.authors;
                        description = items[i].volumeInfo.description;
                        img = items[i].volumeInfo.imageLinks.thumbnail;
                        let div = document.createElement('div');
                        div.className = 'item'
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
                }
            }
        }
        req.send();
    }
}
document.getElementById('input').addEventListener('change',bookSearch);