const idStat = {};
const outliers = document.getElementById('outliers');
const isRmText = document.getElementById('isRmText');
const isDisplayTimes = document.getElementById('isDisplayTimes');
const filterTimes = document.getElementById('filterTimes');
const result = document.getElementById('result');
const allId = document.getElementById('allId');
const deletedId = document.getElementById('deletedId');
const undeletedId = document.getElementById('undeletedId');
const filterTitle = document.getElementById('filterTitle');
const filteredId = document.getElementById('filteredId');

const renderTable = () => {
    let newlist = '';
    Object.keys(idStat).forEach((id) => {
        newlist += 
        `
        <tr>
            <td>${id}</td>
            <td class="times">${idStat[id].times}</td>
            <td>
                <div class="form-check form-switch">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        onclick="switchStat(${id})"
                        ${idStat[id].deleteFromData === true ? 'checked' : ' '}
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
    renderSum();
    calFilter();
    switchDisplayTimes();
};

const renderSum = () => {
    allId.value = Object.keys(idStat).join('、');
    deletedId.value = Object.keys(idStat).filter((id) => idStat[id].deleteFromData === true).join('、');
    undeletedId.value = Object.keys(idStat).filter((id) => idStat[id].deleteFromData === false).join('、');
};

const importIds = () => {
    outliers.value.split('\n').forEach((id) => {
        if (isNaN(parseInt(id))) return;
        if (!idStat[parseInt(id)]) {
            idStat[parseInt(id)] = {
                deleteFromData: false,
                times: 1,
            };
        } else {
            idStat[parseInt(id)].times += 1;
        }
    });
    renderTable();
    if (isRmText.checked === true) outliers.value = '';
};

const switchStat = (id) => {
    idStat[parseInt(id)].deleteFromData = !idStat[id].deleteFromData;
    renderSum();
};

const removeId = (id) => {
    delete idStat[parseInt(id)];
    renderTable();
};

const switchDisplayTimes = () => {
    const tds = document.getElementsByClassName('times');
    if (isDisplayTimes.checked) {
        Array.from(tds).forEach((td) => td.style.display = '');
    } else {
        Array.from(tds).forEach((td) => td.style.display = 'none');
    }
};

const calFilter = () => {
    const t = filterTimes.value ? filterTimes.value : 0;
    filteredId.value = Object.keys(idStat).filter((id) => idStat[id].times >= t).join('、');
    filterTitle.innerHTML = `≧ ${t} 次的Outlier`;
};