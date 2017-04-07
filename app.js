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
        this.state.items.splice(currentItem, 1);
    },
    checkItem: function(id){
        let currentItem = this.state.items.findIndex(function(item){
          return id.toString() == item.id.toString();
        });
        this.state.items[currentItem].checked = !this.state.items[currentItem].checked;
    },
    updateItem: function(id, string) {
        let indexOfItem = this.state.items.findIndex(function(item) {
          return id.toString() === item.id.toString();
        })
        this.state.items[indexOfItem].title = string;
    },
    //returns true if string found, else false;
    searchFor: function(searchStr, val){
      if(val.title.search(searchStr) != -1){
        return true;
      }else{
        return false;
      }
    }
}

function addItem(string) {
    appState.items.push
};



//Views render view -- jQuery functions
let view = {
  filterHide: false,
  filterString: "",
  render: function(state){
    let self = this;
    target = $(".shopping-list");
    target.html("");
    let htmlString = "";
    //builds the html list
    state.items.forEach(function(val){
      let checked = '';
        if(val.checked === true) {
            checked = 'shopping-item__checked';
        }

        let hide = "";
        if(self.filterHide){
          if(val.checked === true){
            hide = "hidden"
          }
        }

        if(self.filterString !== ""){
          hide = "hidden";
          if(crud.searchFor(self.filterString,val)){
            hide = "";
          }
        }


      let htmlElement = `<li id="${val.id}" class="${hide}">
        <input type="text" class="shopping-item ${checked}" value="${val.title}"></input>
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
  if($(this).hasClass("shopping-item-toggle")){
    crud.checkItem($(this).closest("li").attr("id"));
      view.render(crud.state);
  }else if($(this).hasClass("shopping-item-delete")){
    crud.deleteItem($(this).closest("li").attr("id"));
    view.render(crud.state);
  }
});

$("#hiddenToggle").click(function(checkbox){
  view.filterHide = $(this)[0].checked;
  view.render(crud.state);

})

$('.shopping-list').on('focusin', '.shopping-item', function(event) {
    $(this).addClass('with-borders');
    $(this).keypress(function(event) {
        if(event.which === 13) {
            crud.updateItem($(this).closest('li').attr('id'), $(this).val());
            view.render(crud.state);
        }
    });
});

$('.shopping-list').on('focusout', '.shopping-item', function(event) {
   $(this).removeClass('with-borders');
    console.log('this works!');
});

$("#search").focusin(function(val){

  $(this).keypress(function(event) {
    self = this;
    if(event.which === 13) {
      view.filterString = $(self).val();
      view.render(crud.state);
    }
  });
});
