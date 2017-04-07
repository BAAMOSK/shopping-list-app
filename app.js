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
    //finds index then checks to see if the id === item.id
    //use the index to select the value in items array    
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


//Views render view -- jQuery functions
let view = {
  filterHide: false,
  filterString: "",
  //render the <li>s
  render: function(state){
    //self is a pointer to render    
    let self = this;
    target = $(".shopping-list");
    //reset html to empty string
    //gets rid of all elements on screen  
    target.html("");
    //html concates the <li>s  
    let htmlString = "";
    //builds the html list
    //loops through each value in items array  
    state.items.forEach(function(val){
      //if empty string then no class is applied
      //for the strike decoration of item    
      let checked = '';
        if(val.checked === true) {
            checked = 'shopping-item__checked';
        }
        //if empty string then item will not be hidden
        let hide = "";
        if(self.filterHide){
          if(val.checked === true){
            hide = "hidden"
          }
        }
        //if filter string is not empty, perform search
        //used in search field
        //sets all elements to hidden before search
        if(self.filterString !== ""){
          hide = "hidden";
          if(crud.searchFor(self.filterString,val)){
            hide = "";
          }
        }

      //html tags that get rendered
      //val id = id of item
      //hide used with search makes elements disappear
      //if passed hidden as string
      //checked is used to assign shopping-item__checked class    
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

//prevents form resetting on form submission
//adds item to items array
//then render appState
$('button').click(function(event) {
    var input = $(`#shopping-list-entry`);
    var inputValue = input.val();
    event.preventDefault();
    crud.addItem(inputValue);
    view.render(crud.state);
});

//child buttons 'checked' and 'delete'
$(".shopping-list").on("click", "button", function(val){
  if($(this).hasClass("shopping-item-toggle")){
    crud.checkItem($(this).closest("li").attr("id"));
      view.render(crud.state);
  }else if($(this).hasClass("shopping-item-delete")){
    crud.deleteItem($(this).closest("li").attr("id"));
    view.render(crud.state);
  }
});

//hides all checked list items
$("#hiddenToggle").click(function(checkbox){
  view.filterHide = $(this)[0].checked;
  view.render(crud.state);
})

//listens for shopping list item gaining focus
//if keypress is enter
//then updates the item with new title
$('.shopping-list').on('focusin', '.shopping-item', function(event) {
    $(this).addClass('with-borders');
    $(this).keypress(function(event) {
        if(event.which === 13) {
            crud.updateItem($(this).closest('li').attr('id'), $(this).val());
            view.render(crud.state);
        }
    });
});

//if out of focus then remove the border
$('.shopping-list').on('focusout', '.shopping-item', function(event) {
   $(this).removeClass('with-borders');
});

//search function
//listens for when search field gains focus
//listens for keypress event
//on keypress enter perform search
$("#search").focusin(function(val){
  $(this).keypress(function(event) {
    self = this;
    if(event.which === 13) {
      view.filterString = $(self).val();
      view.render(crud.state);
    }
  });
});