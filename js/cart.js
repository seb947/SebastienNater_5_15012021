function getItem(teddy){
    let item = localStorage.getItem("id", 4);
    console.log(item);
}


fetch("http://localhost:3000/api/teddies")
    .then(function(res){
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(teddy){
        getItem(teddy);
    })
    .catch(function(err){
        console.log("erreur de chargement des images")
    });