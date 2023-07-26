function getDataAction() {
    let data = []
    let actionPlayers = 0
    const actionText = document.getElementById('eventName');
    const itemGainedPlayer = document.getElementById('itemGainedPlayer');
    const itemLostPlayer = document.getElementById('itemLostPlayer');
    const itemNeededPlayer = document.getElementById('itemRequiredPlayer');    
    data = 'new Action(\"' + actionText.value.replace(/\[([^\[\]]+)/g, (match) => {
        actionPlayers++
        console.log(match)
        console.log(match.match(/[0-9]*/g))
        return 'this.players' + match[0] + ((match.match(/[0-9]+/g)[0] * 1) -1).toString()
    }) +  "\", " + actionPlayers + ", '" + `[${itemGained}, ${(itemGainedPlayer.value * 1)}]` + "', '" + `[${itemLost}, ${(itemLostPlayer.value * 1)}]` + "', '" + `[${itemNeeded}, ${(itemNeededPlayer.value * 1)}]` + "'"
    actions.push(data)
}

let actions = []

function download() {
    var file = new Blob([`[${actions}]`], {type: "text"});
    var a = document.createElement("a"),
            url = URL.createObjectURL(file);
    a.href = url;
    a.download = 'data.txt';
    a.click();
    setTimeout(function() {
        window.URL.revokeObjectURL(url);  
    }, 0); 
}


let clipboard;
let itemGained = 'Presets.Items.null';
let itemLost =  'Presets.Items.null';
let itemNeeded =  'Presets.Items.null';
const itemType = document.getElementById('itemType');

function copyItem () {
    const itemName = document.getElementById('itemName');
    const itemCount = document.getElementById('itemCount');
    if (itemType.value == "weapon") {
        const itemDamage = document.getElementById('itemDamage');
        const itemDurability = document.getElementById('itemDurability');
        clipboard = 'new Weapon(' + itemName.value + ", " + itemCount.value + ", " + itemDurability.value + ", " + itemDamage.value + ')'
    }
    if (itemType.value == "food") {
        const itemHunger = document.getElementById('itemHunger');
        clipboard = 'new Food(' + itemName.value + ", " + itemCount.value + ", " + itemHunger.value + ')'
    }
}

itemType.addEventListener('input', (ev) => {
    console.log(typeof itemType.value)
    const copyBtn = document.createElement('button')
    copyBtn.setAttribute('onclick', 'copyItem()')
    copyBtn.id = 'copyBtn'
    copyBtn.innerHTML = 'Copy Item'
    if (itemType.value == "weapon") {
        const itemHungerLabel = document.getElementById('itemHungerLabel')
        const itemHunger = document.getElementById('itemHunger')
        itemHungerLabel ? document.body.removeChild(itemHungerLabel) : null
        itemHunger ? document.body.removeChild(itemHunger) : null
        const itemDamageLabel = document.createElement('label')
        const itemDamage = document.createElement('input')
        const itemDurabilityLabel = document.createElement('label')
        const itemDurability = document.createElement('input')
        itemDamageLabel.innerHTML = "Item Damage (player health is 80-130):"
        itemDamageLabel.for = "itemDamage"
        itemDamageLabel.id = "itemDamageLabel"
        itemDurabilityLabel.innerHTML = " Item Durability (amount of uses before it breaks, try to limit it to 5 at the most):"
        itemDurabilityLabel.for = "itemDurability"
        itemDurabilityLabel.id = "itemDurabilityLabel"
        itemDamage.id = "itemDamage"
        itemDamage.type = "number"
        itemDurability.id = "itemDurability"
        itemDurability.type = "number"
        document.body.appendChild(itemDamageLabel);
        document.body.appendChild(itemDamage);
        document.body.appendChild(itemDurabilityLabel);
        document.body.appendChild(itemDurability);
        document.body.appendChild(document.createElement('div').appendChild(copyBtn))
    }
    if (itemType.value == "food") {
        const itemDamageLabel = document.getElementById('itemDamageLabel')
        const itemDamage = document.getElementById('itemDamage')
        itemDamageLabel ? document.body.removeChild(itemDamageLabel) : null
        itemDamage ? document.body.removeChild(itemDamage) : null
        const itemDurabilityLabel = document.getElementById('itemDurabilityLabel')
        const itemDurability = document.getElementById('itemDurability')
        itemDurabilityLabel ? document.body.removeChild(itemDurabilityLabel) : null
        itemDurability ? document.body.removeChild(itemDurability) : null
        const itemHungerLabel = document.createElement('label')
        const itemHunger = document.createElement('input')
        itemHungerLabel.innerHTML = "Hunger Restored (anywhere from 1-3 bc max hunger is 3):"
        itemHungerLabel.for = "itemHunger"
        itemHungerLabel.id = "itemHungerLabel"
        itemHunger.id = "itemHunger"
        itemHunger.type = "number"
        document.body.appendChild(itemHungerLabel);
        document.body.appendChild(itemHunger);
        document.body.appendChild(document.createElement('div').appendChild(copyBtn))
    }
})

itemType.dispatchEvent(new Event('input', { bubbles: true }));

'this.players$& - 1'.match