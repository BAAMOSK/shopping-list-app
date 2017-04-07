//a state object
let appState = {
  items: []
};


//CRUD state modification functions
let crud = {

    state: appState,

    addItem: function(taskTitle){
        let item = {title: taskTitle, checked: false};
        item.title = taskTitle;
        this.state.items.push(item);
    },
    deleteItem: function(item){
        let currentItem = this.state.items;
        currentItem.splice(currentItem.indexOf(item), 1);
    },
    checkItem: function(item){
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
      let htmlElement = `<li>
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
    //addItem()
    //checkItem()
    //deleteItem()

