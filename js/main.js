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
const filterTitleEql = document.getElementById('filterTitleEql');
const filteredIdEql = document.getElementById('filteredIdEql');
const allIdSum = document.getElementById('allIdSum');
const undeletedIdSum = document.getElementById('undeletedIdSum');
const deletedIdSum = document.getElementById('deletedIdSum');
const saveText = document.getElementById('saveText');
const saveHint = document.getElementById('saveHint');

const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
const tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => {
  return new bootstrap.Tooltip(tooltipTriggerEl)
});

const renderTable = () => {
    let newlist = '';
    Object.keys(idStat).forEach((id) => {
        newlist += 
        `
        <tr id="outlier-row-${id}" ${idStat[id].deleteFromData === true ? 'class="table-secondary deletedRow"' : ''}>
            <th scope="row">${id}</th>
            <td class="times text-center">
                ${idStat[id].times}
            </td>
            <td>
                <div class="form-check form-switch">
                    <input
                        class="form-check-input mx-auto"
                        type="checkbox"
                        onclick="switchStat(${id})"
                        ${idStat[id].deleteFromData === true ? 'checked' : ' '}
                    >
                </div>
            </td>
            <td>
                <button type="button" class="btn btn-sm btn-outline-secondary d-none d-md-inline" onclick="addOne(${id})">+1</button>
                <button type="button" class="btn btn-sm btn-outline-secondary d-none d-md-inline" onclick="minusOne(${id})">-1</button>
                　
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
    allIdSum.value = `一共 ${Object.keys(idStat).length} 個`;
    deletedIdSum.value = `一共 ${Object.keys(idStat).filter((id) => idStat[id].deleteFromData === true).length} 個`;
    undeletedIdSum.value = `一共 ${Object.keys(idStat).filter((id) => idStat[id].deleteFromData === false).length} 個`;
};

const importIds = () => {
    outliers.value.split('\n').forEach((id) => {
        if (isNaN(parseInt(id, 10))) return;
        if (!idStat[parseInt(id, 10)]) {
            idStat[parseInt(id, 10)] = {
                deleteFromData: false,
                times: 1,
            };
        } else {
            idStat[parseInt(id, 10)].times += 1;
        }
    });
    renderTable();
    if (isRmText.checked === true) outliers.value = '';
};

const switchStat = (id) => {
    const row = document.getElementById(`outlier-row-${id}`);
    idStat[parseInt(id, 10)].deleteFromData = !idStat[id].deleteFromData;
    if (idStat[parseInt(id, 10)].deleteFromData === true) {
        row.classList.add('table-secondary');
        row.classList.add('deletedRow');
    } else {
        row.classList.remove('table-secondary');
        row.classList.remove('deletedRow');
    }
    renderSum();
};

const removeId = (id) => {
    delete idStat[parseInt(id, 10)];
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
    filterTitle.innerHTML = `≧ ${t} 次的 Outlier`;
    filteredIdEql.value = Object.keys(idStat).filter((id) => idStat[id].times == t).join('、');
    filterTitleEql.innerHTML = `= ${t} 次的 Outlier`;
};

const saveToBrowser = () => {
    if (Object.keys(idStat).length === 0) {
        saveText.value = '目前未有紀錄可存檔';
    } else {
        localStorage.setItem('idStat', JSON.stringify(idStat));
        saveText.value = '存檔完成';
    }
};

const readFromBrowser = () => {
    try {
        const saves = JSON.parse(localStorage.getItem('idStat'));
        Object.keys(saves).forEach((s) => {
            idStat[s] = saves[s];
        });
        renderTable();
        saveText.value = '存檔匯入完成';
    } catch (e) {
        saveText.value = '無存檔或存檔異常，無法讀取';
    }
};

const removeSave = () => {
    localStorage.removeItem('idStat');
    saveText.value = '已刪除存檔';
};

const addOne = (id) => {
    idStat[parseInt(id, 10)].times += 1;
    renderTable();
};

const minusOne = (id) => {
    idStat[parseInt(id, 10)].times -= 1;
    if (idStat[parseInt(id, 10)].times <= 0) removeId(id);
    else renderTable();
};

if (localStorage.getItem('idStat')) {
    saveHint.style.display = '';
}