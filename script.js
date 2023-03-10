$(function() {
    $('#search-form').submit(function(e) {
      e.preventDefault();
      var username = $('#username').val();
      getUserData(username);
    });
  });
  
  var bootstrapCSS = document.createElement("link");
bootstrapCSS.rel = "stylesheet";
bootstrapCSS.href = "https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css";
bootstrapCSS.integrity = "sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO";
bootstrapCSS.crossorigin = "anonymous";

  function getUserData(username) {
    $('#search-btn').prop('disabled', true);
    $('#results').html('<div class="text-center"><i class="fa fa-spinner fa-spin fa-3x"></i></div>');
    $.get('https://api.github.com/users/' + username, function(data) {
      $('#search-form').hide();
      $('#search-btn').prop('disabled', false);
      var userData = `
        <div class="row">
          <div class="col-sm-12">
            <img src="${data.avatar_url}" alt="${data.login}" class="img-circle center-block" width="100" height="100">
            <h2>${data.name}</h2>
            <p>${data.bio}</p>
            <ul class="list-unstyled">
            <li><strong>Followers:</strong> ${data.followers}</li>
            <li><strong>Following:</strong> ${data.following}</li>
            <li><strong>Public Repositories:</strong> ${data.public_repos}</li>
            <li><strong>Email:</strong> ${data.email}</li>
            <li><strong>Location:</strong> ${data.location}</li>
          </ul>
          <a href="${data.html_url}" target="_blank" class="btn btn-primary">View Profile on GitHub</a>
        </div>
      </div>
    
      `;
      localStorage.setItem('userData', userData);
      $.get('https://api.github.com/users/' + username + '/repos', function(repos) {
        // Create repository table HTML
        var repoTable = `
          
        `;
        
        // Loop through repositories and add table rows
        for (var i = 0; i < repos.length; i++) {
          var repo = repos[i];
          repoTable += `
            <tr>
              <td>${repo.name}</td>
              <td>${repo.description}</td>
              <td>${repo.language}</td>
              <td>${repo.updated_at}</td>
              <td><img src="${repo.owner.avatar_url}" alt="${repo.owner.login}" class="img-circle center-block" width="50" height="50"></td>
            </tr>
          `;
        }
        
        // Close repository table HTML
        repoTable += `
                </tbody>
              </table>
            </div>
          </div>
        `;
        
        // Store repository data in local storage
        localStorage.setItem('repoData', repoTable);
      window.location.href = 'user.html';
    }).fail(function() {
      $('#search-btn').prop('disabled', false);
      $('#results').html('<div class="text-center">User not found.</div>');
    });
  

})
  }
  