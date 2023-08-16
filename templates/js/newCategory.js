/**
 * Open the field which allow to adding new Category
 *  
 */
function showAddBox() {
    let value = document.getElementById('category').value;
    if (value == 'new') {
        document.getElementById('new-category-box').classList.remove('d-none');
    } else {
        document.getElementById('new-category-box').classList.add('d-none');
    }
    //check if a new category is choosen
    if (newCategorys.includes(value)) {
        document.getElementById('delete-category-btn').classList.remove('d-none');
    } else {
        document.getElementById('delete-category-btn').classList.add('d-none');
    }
}

/**
 * adding new Category
 *  
 */
function addNewCategory() {
    let categoryInput = document.getElementById('new-category-input').value;
    let search = categoryInput.toLowerCase();
    let included = false;

    if (categoryInput.length > 2) {
        if (!newCategorys) {
            setNewCategory(categoryInput);
        } else {
            for (let i = 0; i < newCategorys.length; i++) {
                const category = newCategorys[i].toLowerCase();
                if (category.includes(search)) {
                    included = true;
                }
            }
            if (!included) {
                setNewCategory(categoryInput);
            } else {
                alert('Category already exist');
            }
        }
    } else {
        alert('Pleasse enter a plausible new category');
    }
    document.getElementById('new-category-input').value = '';
}

/**
 * Save the new Category
 * 
 */
function setNewCategory(categoryInput) {
    let selection = document.getElementById('category');
    selection.innerHTML += `
    <option class="delete-category" value="${categoryInput}">${categoryInput}

    </option>`;
    newCategorys.push(categoryInput);
    localStorage.setItem('newCategorys', JSON.stringify(newCategorys));
    selection.value = categoryInput;
    document.getElementById('new-category-box').classList.add('d-none');
    document.getElementById('delete-category-btn').classList.remove('d-none');
}

/**
 * render the new Category
 * 
 */
function renderNewCategorys() {
    let selection = document.getElementById('category');
    let parsedCategorys = JSON.parse(localStorage.getItem('newCategorys'));
    selection.innerHTML = '';
    renderStandardOptions(selection);
    if (parsedCategorys) {
        newCategorys = parsedCategorys;
        for (let i = 0; i < newCategorys.length; i++) {
            const category = newCategorys[i];
            selection.innerHTML += `<option value="${category}">${category}</option>`;
        }
    }
}

/**
 * render the standard options in the selection field
 * 
 * @param {html element} selection selection field getting by id
 */
function renderStandardOptions(selection) {
    selection.innerHTML += `
    <option value="" disabled selected>Select task category</option>
    <option value="new">Create new category</option>
    <option value="design">Design</option>
    <option value="sales">Sales</option>
    <option value="backoffice">Backoffice</option>
    <option value="media">Media</option>
    <option value="marketing">Marketing</option>
    `;
}

/**
 * delete the new created categorys
 * 
 */
function deleteCategory() {
    let currentCategory = document.getElementById('category').value;
    let position = -1;
    //check which position in array the category is 
    for (let i = 0; i < newCategorys.length; i++) {
        const place = newCategorys[i];
        if (currentCategory == place) {
            position = place;
            newCategorys.splice(position, 1);
            localStorage.setItem('newCategorys', JSON.stringify(newCategorys));
            renderNewCategorys();
        }
    }
    document.getElementById('delete-category-btn').classList.add('d-none');

}