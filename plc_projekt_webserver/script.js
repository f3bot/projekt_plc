function createEditForm(userIndex){
    // Remove any existing overlay
    const existingOverlay = document.querySelector('.overlay');
    if (existingOverlay) existingOverlay.remove();

    const container = document.createElement('div');
    container.classList.add('overlay', 'visible');

    container.innerHTML = `
        <form id="edit-user-form-${userIndex}" method="post">
            <label for='"HMI".User_Struct_${userIndex}.login'>Login</label>
            <input type="number" name='"HMI".User_Struct_${userIndex}.login'>
            
            <label for='"HMI".User_Struct_${userIndex}.password'>Password</label>
            <input type="number" name='"HMI".User_Struct_${userIndex}.password'>
            
            <label for='"HMI".User_Struct_${userIndex}.fuel_amount'>Fuel Amount</label>
            <input type="number" name='"HMI".User_Struct_${userIndex}.fuel_amount'>
            

            <button class = "generate-btn-${userIndex}">generate</button>
            <input type="submit" value="Save">
            <button type="button" onclick="this.closest('.overlay').remove()">Cancel</button>
        </form>
    `;

    document.body.appendChild(container);
    
    document.querySelector(`.generate-btn-${userIndex}`).addEventListener('click', (e) =>{
        e.preventDefault();
        const form = container.querySelector(`#edit-user-form-${userIndex}`);
        const getPositiveInt16 = () => Math.floor(Math.random() * 32768); // 0 to 32767
        form.querySelector(`[name='"HMI".User_Struct_${userIndex}.login']`).value = getPositiveInt16();
        form.querySelector(`[name='"HMI".User_Struct_${userIndex}.password']`).value = getPositiveInt16();
    })
};


// Add event listeners to all edit buttons
document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const userIndex = e.target.getAttribute('data-value');
        createEditForm(userIndex);
    });
});

document.querySelectorAll('.clear-btn').forEach(button =>{
    button.addEventListener('click', (e) =>{
        const userIndex = e.target.getAttribute('data-value');
        createClear(userIndex)
    })
})
function createClear(userIndex){
    const formA = document.createElement('form');
    formA.method = 'post';
    formA.action = ""
    formA.innerHTML = `
        <input type="submit" value = "Clear"> 
        <input type="hidden" name='"HMI".User_Struct_${userIndex}.login' value="0">
        <input type="hidden" name='"HMI".User_Struct_${userIndex}.password' value="0">
        <input type="hidden" name='"HMI".User_Struct_${userIndex}.fuel_amount' value="0">
        <input type="hidden" name='"HMI".User_Struct_${userIndex}.start_time' value="00:00:00">
        <input type="hidden" name='"HMI".User_Struct_${userIndex}.end_time' value="00:00:00">
    `

    document.body.appendChild(formA);
    formA.submit()
}

