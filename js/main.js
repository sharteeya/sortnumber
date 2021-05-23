const idStat = {};
const outliers = document.getElementById('outliers');
const isRmText = document.getElementById('isRmText');
const result = document.getElementById('result');
const allid = document.getElementById('allid');

const renderTable = () => {
    let newlist = '';
    Object.keys(idStat).forEach((id) => {
        newlist += 
        `
        <tr>
            <td>${id}</td>
            <td>
                <div class="form-check form-switch">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        onclick="switchStat(${id})"
                        ${idStat[id] === true ? 'checked' : ' '}
                    >
                </div>
            </td>
            <td>
                <button type="button" class="btn btn-sm btn-outline-danger" onclick="removeId(${id})">刪除</button>
            </td>
        </tr>
        `
        ;
    });
    result.innerHTML = newlist;
    allid.value = Object.keys(idStat).join('、');
};

const importIds = () => {
    outliers.value.split('\n').forEach((id) => {
        if (!isNaN(parseInt(id)) && !idStat[parseInt(id)]) {
            idStat[parseInt(id)] = false;
        }
    });
    renderTable();
    if (isRmText.checked === true) outliers.value = '';
};

const switchStat = (id) => {
    idStat[parseInt(id)] = !idStat[id];
};

const removeId = (id) => {
    delete idStat[parseInt(id)];
    renderTable();
};
