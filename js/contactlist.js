var save = document.getElementById("save");
save.addEventListener("click", () => {
    // var alreadyExists = document.getElementById()

    var firstname = document.getElementById("first-name").value;
    var lastname = document.getElementById("last-name").value;
    var contact = document.getElementById("contact-number").value;
    var email = document.getElementById("email-address").value;
    // console.log(firstname, lastname, contact, email)
    var node = document.createElement("a");
    node.setAttribute("class", "list-group-item list-group-item-action");
    node.setAttribute("id", "list-" + firstname + "-list");
    node.setAttribute("data-toggle", "list");
    node.setAttribute("href", "#list-" + firstname)
    node.setAttribute("role", "tab");
    node.setAttribute("aria-controls", firstname);

    var textnode = document.createTextNode(firstname + " " + lastname);
    node.appendChild(textnode);
    document.getElementById("list-tab").appendChild(node);


    var divNode = document.createElement("div")
    divNode.setAttribute("class", "tab-pane fade show");
    divNode.setAttribute("id", "list-" + firstname);
    divNode.setAttribute("role", "tabpanel");
    divNode.setAttribute("aria-labelledby", "list-" + firstname + "-list");
    var divTextNode = document.createTextNode(`FirstName:${firstname}
    LastName:${lastname}
    Contact-Number:${contact}
    Email-ID:${email}`);
    divNode.appendChild(divTextNode);
    document.getElementById("nav-tabContent").appendChild(divNode);

})