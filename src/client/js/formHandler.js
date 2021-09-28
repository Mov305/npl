function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value

    Client.checkForName(formText)

    const getData = async (data={})=>{
        const res =await fetch(
            'http://localhost:8081/test',
            {
                method:'POST',
                credentials:'same-origin',
                mode:'cors',
                headers:{
                    "Content-type":'application/json'
                },
                body:JSON.stringify(data)
            }
        );
        try{
            const Data = await res.json()
            return Data
        }
        catch(err) {
            console.log('error',err)
            alert('the URL You entered might be wornge')
        }
    }

    console.log("::: Form Submitted :::")
    
    const list=[]

    getData({text:formText})
    .then(res=>{
        console.log('from client',res)
        document.getElementById('a').innerHTML = `Agreement: ${res.agreement}`;
        document.getElementById('s').innerHTML = `Subjectivity: ${res.subjectivity}`;
        document.getElementById('c').innerHTML = `Confidence: ${res.confidence}`;
        document.getElementById('i').innerHTML = `Irony: ${res.irony}`;      
        document.getElementById('p').innerHTML = `Polarity:${res.score_tag}`;
        document.getElementById('concepts').innerHTML=''
        res.sentimented_concept_list.forEach((i)=>{        
        const span = document.createElement('span');
        const con = document.createTextNode(i.form);
        span.appendChild(con);
        const concepts = document.getElementById('concepts');  
        concepts.appendChild(span)

        })
    }).catch(err=>{console.log('error',err);
      alert('the Url you have entered might be worng')})
}

export { handleSubmit }