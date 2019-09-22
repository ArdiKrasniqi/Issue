var i;
$('document').ready(() => {
    $.ajax({
        url: 'issue/',
        method: 'get',
        success: (response) => {
            console.log(response);
            i = response;
            for (let i = 0; i < response.length; i++) {
                $('table').prepend(`
                <tr ${response[i].resolved ? 'class= "bg-success"' : 'class= "bg-danger"'}>
                <th scope="row">${i + 1}</th>
                <td>${response[i].title}</td>
                <td>${ new Date(response[i].created_at).getDay() + '-' + new Date(response[i].created_at).getMonth() + '-' + new Date(response[i].created_at).getFullYear()}</td>
                <td>${response[i].resolved ? 'Yes' : 'No'}</td>
                <td>${response[i].resolved_at ? new Date(response[i].resolved_at).getDay() + '-' + new Date(response[i].resolved_at).getMonth() + '-' + new Date(response[i].resolved_at).getFullYear() : ''} </td>
                <td><button id="${response[i]._id}" class="btn btn-secondary">Resolve</button></td>
                <td><button data-id="${response._id}" class="btn btn-danger">Delete</button></td>

          </tr>
                `)
            }
        }, error: (err) => {
            console.log(err);
        }
    })
})


$('#buttonIssue').click(() => {
    let t = $('#issueTitle').val();
    if (t == '' || t == null) {
        alert('Plase fill title')
        return;
    }
    let obj = {
        title: t,
    }
    $.ajax({
        url: 'issue',
        method: 'POST',
        data: obj,
        success: (response) => {
            i.push(response);
            $('#issueTitle').val('')
            $('table').prepend(`
            <tr ${response.resolved ? 'class= "bg-success"' : 'class= "bg-danger"'}>
            <th scope="row">${i.length}</th>
            <td>${response.title}</td>
            <td>${ new Date(response.created_at).getDay() + '-' + new Date(response.created_at).getMonth() + '-' + new Date(response.created_at).getFullYear()}</td>
            <td>${response.resolved ? 'Yes' : 'No'}</td>
            <td>${response.resolved_at ? new Date(response.resolved_at).getDay() + '-' + new Date(response.resolved_at).getMonth() + '-' + new Date(response.resolved_at).getFullYear() : ''} </td>
            <td><button id="${response._id}" class="btn btn-secondary">Resolve</button></td>
            <td><button data-id="${response._id}" class="btn btn-danger">Resolve</button></td>
             </tr>`)
        },
        error: (err) => {
            console.log(err);
        }
    })
})

$(document).on('click', '.btn-secondary', (event) => {
    const id = event.target.id;
    let obj = {
        title: true,
    }
    $.ajax({
        url: 'issue/' + id,
        method: 'PUT',
        data: obj,
        success: (response) => {
            console.log(response);
            // document.location.reload();
        }, error: (err) => {
            console.log(err);
        }
    })
})
$(document).on('click', '.btn-danger', (event) => {
    const id = event.target.attributes[0].nodeValue;
    console.log(id);
    $.ajax({
        url: 'issue/' + id,
        method: 'DELETE',
        success: (response) => {
            console.log(response);
            // document.location.reload();
        }, error: (err) => {
            console.log(err);
        }
    })
})