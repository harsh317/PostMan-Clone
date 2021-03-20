// console.log('harshi')

// countadd_+
let addedpparamsCount = 1
    // Function to get element from string 
function getElementfromstring(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}
// Hide The Json iniatially
document.getElementById('Jsondiv').style.display = 'none';

// Display json and costompara div accordingly
jsonparams.addEventListener('click', () => {
    document.getElementById('Customparadiv').style.display = 'none';
    document.getElementById('Jsondiv').style.display = 'block';
})

cusparams.addEventListener('click', () => {
    document.getElementById('Customparadiv').style.display = 'block';
    document.getElementById('Jsondiv').style.display = 'none';
})

// If + Add more custom parameters
const addbutn = document.getElementById('plusbtn');
addbutn.addEventListener('click', () => {
    const extraparams = document.getElementById('extraparams');
    const string = `
            <div class="form-row my-3">
                <div class="col-md-4">
                    <input type="text" class="form-control" id="Paramerterkey${addedpparamsCount + 1}" placeholder="Enter Key Value${addedpparamsCount + 1}">
                </div>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="ParameterValue${addedpparamsCount + 1}" placeholder="Enter Pair Value${addedpparamsCount + 1}">
                </div>
                <button id="plusbtn" class="btn btn-primary deletepara">-</button>
            </div>`
    addedpparamsCount++;
    let createelement = getElementfromstring(string);
    extraparams.appendChild(createelement)
    const deletepara = document.getElementsByClassName('deletepara')
    for (item of deletepara) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove()
        })
    }
})

const submits = document.getElementById('Submit');
submits.addEventListener('click', () => {
    document.getElementById('responseTextbox').value = 'Please Wait........'
    const UrlEntered = document.getElementById('urlentered').value
    const requesttype = $("input:radio[name=flexRadioDefault]:checked").val()
    const contenttype = $("input:radio[name=flexRadioDefault1]:checked").val()

    if (contenttype == 'Custom') {
        data = {};
        for (i = 0; i < addedpparamsCount; i++) {
            if (document.getElementById('Paramerterkey' + (i + 1)) != undefined) {
                let key = document.getElementById('Paramerterkey' + (i + 1)).value;
                let value = document.getElementById('ParameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    } else {
        data = document.getElementById('requestJsonTextbox').value;
    }
    // All Values For Debuggings
    console.log('Url Entered:' + UrlEntered)
    console.log('request Type:' + requesttype)
    console.log('Content Type:' + contenttype)
    console.log('Data is:' + data)

    if (requesttype == 'GET') {
        fetch(UrlEntered, {
                method: requesttype,
            })
            .then(response => {
                return response.text()
            })
            .then((text) => {
                document.getElementById('responseTextbox').value = text;
            });
    } else {
        fetch(UrlEntered, {
                method: requesttype,
                body: data,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            })
            .then(response => {
                return response.text()
            })
            .then((text) => {
                document.getElementById('responseTextbox').value = text;
            });
    }

})

const copyText = document.querySelector('#responseTextbox');
const copytextbtn = document.querySelector('#copytextbtn');
copytextbtn.addEventListener('click', () => {
    copyText.select();
    document.execCommand("copy")

})