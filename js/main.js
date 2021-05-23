const idStat = {};
const outliers = document.getElementById('outliers');
const isRmText = document.getElementById('isRmText');
const isDisplayTimes = document.getElementById('isDisplayTimes');
const result = document.getElementById('result');
const allid = document.getElementById('allid');

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
    allid.value = Object.keys(idStat).join('、');
    switchDisplayTimes();
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