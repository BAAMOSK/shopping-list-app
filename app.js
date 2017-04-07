//a state object
let appState = {
  items: []
};


//CRUD state modification functions
let crud = {

    state: appState,
    highestID: 0,

    addItem: function(taskTitle){
        let item = {id: this.highestID, title: taskTitle, checked: false};
        this.highestID++;
        item.title = taskTitle;
        this.state.items.push(item);
    },
    deleteItem: function(id){
        let currentItem = this.state.items.findIndex(function(item){
          return id.toString() == item.id.toString();
        });


        console.log("Current Item is " + currentItem);

        this.state.items.splice(currentItem, 1);
    },
    checkItem: function(item){
      console.log("called check for " + item);
      this.state.item.checked = !this.state.item.checked;

    }
}

function addItem(string) {
    appState.items.push
};



//Views render view -- jQuery functions
let view = {
  render: function(state){
    target = $(".shopping-list");
    target.html("");
    let htmlString = "";
    state.items.forEach(function(val){
      let htmlElement = `<li id="${val.id}">
        <span class="shopping-item">${val.title}</span>
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle">
            <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete">
            <span class="button-label">delete</span>
          </button>
        </div>
      </li>`
      htmlString += htmlElement;

    });
    target.append(htmlString);
  }

};

//Event listeners



var submit = $('button');

submit.click(function(event) {
    var input = $(`#shopping-list-entry`);
    var inputValue = input.val();
    event.preventDefault();
    crud.addItem(inputValue);
    view.render(crud.state);
});

$(".shopping-list").on("click", "button", function(val){
console.log($(this));
  if($(this).hasClass("shopping-item-toggle")){
    //crud.checkItem($(this))
  }else if($(this).hasClass("shopping-item-delete")){
    //console.log("This is what we're passing to delete:" + $(this).closest("li").attr("id"));
    crud.deleteItem($(this).closest("li").attr("id"));
    view.render(crud.state)
  }
  console.log("clicked a button");
})
    //addItem()
    //checkItem()
    //deleteItem()
