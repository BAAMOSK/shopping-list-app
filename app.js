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
function renderView(app){
    console.dir(app);
}

//Event listeners
function mainFunction() {
    addItem()
    checkItem()
    deleteItem()
}