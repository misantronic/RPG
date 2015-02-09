/**
 * Created by Karim Khairalla on 09.02.2015.
 */
function Desert_Eagle_357() {
    Weapon.call(this, Weapon.PISTOL, {
        name: 'Desert Eagle .357',
        thumb: './img/weapons/Desert_Eagle_357.jpg',
        damage: 26,
        caliber: $357_Magnum,
        magazine: 9,
        range: 14,
        ap: [ 8 ],
        weight: 1.7,
        size: Item.SMALL,
        hands: 1
    });
}

Desert_Eagle_357.prototype = new Weapon();
Desert_Eagle_357.constructor = Desert_Eagle_357;