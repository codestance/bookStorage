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
                    console.log(req.response)
                    console.log(totalItems)
                    console.log(items);                    
                }

            }
        }
        req.send();
    }
}
document.getElementById('input').addEventListener('change',bookSearch);